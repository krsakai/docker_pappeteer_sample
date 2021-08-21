import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Crawler from "./controllers/crawler"
import * as ScoreRepository from './repositories/score_repository';
import * as NewsRepository from "./repositories/news_repository";
import { VALID_MEMORY_OPTIONS } from "firebase-functions";
import { PushNotification } from "./controllers/push_notification";
import dayjs from "dayjs";
import { LatestScore } from "./models/latest_score";
admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: VALID_MEMORY_OPTIONS[5]
}
// const configuedFunction = functions.region('asia-northeast1').runWith(runtimeOpts)
// export const helloWorld = configuedFunction.https.onRequest(async (request, response) => {
const configuedFunction = functions.region('asia-northeast1').runWith(runtimeOpts).pubsub
exports.fetchInformationScheduleTask = configuedFunction.schedule('every 1 hours').onRun(async (context) => {
  const latestHitterScore = await new Crawler.LatestHitterScoreCrawler().run<ScoreRepository.LatestHitterScore>()
  await admin.firestore()
          .collection("latestHitterScore")
          .doc(latestHitterScore.date)
          .set(latestHitterScore.toJson())

  const latestPitcherScore = await new Crawler.LatestPitcherScoreCrawler().run<ScoreRepository.LatestPitcherScore>()
  await admin.firestore()
          .collection("latestPitcherScore")
          .doc(latestPitcherScore.date)
          .set(latestPitcherScore.toJson())

  const score = await new Crawler.ScoreCrawler().run<[[ScoreRepository.HitterScore],[ScoreRepository.PitcherScore]]>()
  await Promise.all(score[0].map((async hitterScore => {
    await admin.firestore()
            .collection("hitterScore")
            .doc(hitterScore.year)
            .set(hitterScore.toJson())
  })))

  await Promise.all(score[1].map((async pitcherScore => {
    await admin.firestore()
            .collection("pitcherScore")
            .doc(pitcherScore.year)
            .set(pitcherScore.toJson())
  })))

  const newsList = await new Crawler.NewsCrawler().run<[NewsRepository.News]>()
  await Promise.all(newsList.map((async news => {
    await admin.firestore()
            .collection("news")
            .doc(news.newsId)
            .set(news.toJson())
  })))

  const lastUpdateDate = await PushNotification.fetchLastUpdateDate()
  const newScoreInformationList = [
    dayjs(lastUpdateDate).isBefore(dayjs(latestHitterScore.date)) ? latestHitterScore as LatestScore : null,
    dayjs(lastUpdateDate).isBefore(dayjs(latestPitcherScore.date)) ? latestPitcherScore as LatestScore : null
  ].removeNull<LatestScore>()
  if (newScoreInformationList.length > 0) {
    const latestScore = newScoreInformationList[0]
    PushNotification.post(`${dayjs(latestScore.date).format('YYYY年MM月DD日の試合情報')}`, `まもなく${latestScore.vsTeam}戦の試合の開始時刻です`)
    PushNotification.updateSendDate(dayjs(latestScore.date).format('YYYY-MM-DD'))
  }
});
