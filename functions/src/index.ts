import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Crawler from "./controllers/crawler"
import * as ScoreRepository from './repositories/score_repository';
import * as NewsRepository from "./repositories/news_repository";
import { VALID_MEMORY_OPTIONS } from "firebase-functions";
import dayjs from "dayjs";
import { LatestScore } from "./models/latest_score";
import { BatReport } from "./models/bad_report";
import { PostalReportRepository } from "./repositories/postal_report_repository";
admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: VALID_MEMORY_OPTIONS[5]
}

// const configuedFunction = functions.region('asia-northeast1').runWith(runtimeOpts)
// export const helloWorld = configuedFunction.https.onRequest(async (request, response) => {

const configuedFunction = functions.region('asia-northeast1').runWith(runtimeOpts).pubsub

exports.fetchInformationScheduleTask = configuedFunction.schedule('every 12 hours').onRun(async (context) => {
  await fetchCalendarTask()
  const latestScoreList= await fetchScoreTask()
  await postGameStartNotification(latestScoreList)
});

exports.postBatReportedScheduleTask = configuedFunction.schedule('every 20 minutes').onRun(async (context) => {
  let latestBatReportList: BatReport[] = []
  let batReportedList: BatReport[] = []
  try {
    latestBatReportList = await new Crawler.BatPostalReportCrawler().run<BatReport[]>()
    batReportedList = await PostalReportRepository.fetchLatestBatReportedList()
  } catch (exception) {
    return console.log(exception)
  }

  if (latestBatReportList.length > batReportedList.length) {
    const report = latestBatReportList[latestBatReportList.length - 1]
    try {
      await PostalReportRepository.postBatStart(report)
    } catch (exception) {
      console.log(exception)
    } finally {
      await PostalReportRepository.deleteLatestBatReportedList()
      await PostalReportRepository.updateLatestBatReportedList(latestBatReportList)
      await fetchScoreTask()
    }
  }
});

async function fetchCalendarTask() {
  try {
    const scheduleTable = await new Crawler.CalendarCrawler().run<string>()
    await admin.firestore().collection("schedule").doc('master').set({'oneWeekSchedule': scheduleTable})
  } catch(exception) {
    console.log(exception)
  }
}

async function fetchScoreTask() {
  const latestHitterScore = await new Crawler.LatestHitterScoreCrawler().run<ScoreRepository.LatestHitterScore>()
  await admin.firestore().collection("latestHitterScore").doc(latestHitterScore.date).set(latestHitterScore.toJson())

  const latestPitcherScore = await new Crawler.LatestPitcherScoreCrawler().run<ScoreRepository.LatestPitcherScore>()
  await admin.firestore().collection("latestPitcherScore").doc(latestPitcherScore.date).set(latestPitcherScore.toJson())

  const score = await new Crawler.ScoreCrawler().run<[[ScoreRepository.HitterScore],[ScoreRepository.PitcherScore]]>()
  await Promise.all(score[0].map((async hitterScore => {
    await admin.firestore().collection("hitterScore").doc(hitterScore.year).set(hitterScore.toJson())
  })))

  await Promise.all(score[1].map((async pitcherScore => {
    await admin.firestore().collection("pitcherScore").doc(pitcherScore.year).set(pitcherScore.toJson())
  })))

  const newsList = await new Crawler.NewsCrawler().run<[NewsRepository.News]>()
  await Promise.all(newsList.map((async news => {
    await admin.firestore().collection("news").doc(news.newsId).set(news.toJson())
  })))

  return [latestHitterScore as LatestScore, latestPitcherScore as LatestScore]
}

async function postGameStartNotification(latestScoreList: LatestScore[]) {
  const lastUpdateDate = await PostalReportRepository.fetchLatestGameDate()
  const newScoreInformationList = [
    dayjs(lastUpdateDate).isBefore(dayjs(latestScoreList[0].date)) ? latestScoreList[0] as LatestScore : null,
    dayjs(lastUpdateDate).isBefore(dayjs(latestScoreList[1].date)) ? latestScoreList[1] as LatestScore : null
  ].removeNull<LatestScore>()
  if (newScoreInformationList.length > 0) {
    const latestScore = newScoreInformationList[0]
    try {
      PostalReportRepository.postGameStart(`${dayjs(latestScore.date).format('YYYY年MM月DD日の試合情報')}`, `まもなく${latestScore.vsTeam}戦の試合の開始時刻です`)
    } catch(exception) {
      console.log(exception)
    } finally {
      PostalReportRepository.updateLatestGameDate(dayjs(latestScore.date).format('YYYY-MM-DD'))
      PostalReportRepository.deleteLatestBatReportedList()
    }
  }
}
