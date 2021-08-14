import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Crawler from "./controllers/crawler"
import * as ScoreRepository from './repositories/score_repository';
import * as NewsRepository from "./repositories/news_repository";
import { VALID_MEMORY_OPTIONS } from "firebase-functions";
admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: VALID_MEMORY_OPTIONS[5]
}
// const configuedFunction = functions.region('asia-northeast1').runWith(runtimeOpts)
// export const helloWorld = configuedFunction.https.onRequest(async (request, response) => {
const configuedFunction = functions.region('asia-northeast1').runWith(runtimeOpts).pubsub
exports.fetchLatestScoreScheduleTask = configuedFunction.schedule('every 1 hours').onRun(async (context) => {
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
});

exports.fetchNewsScheduleTask = configuedFunction.schedule('every 1 hours').onRun(async (context) => {
  const newsList = await new Crawler.NewsCrawler().run<[NewsRepository.News]>()
  await Promise.all(newsList.map((async news => {
    await admin.firestore()
            .collection("news")
            .doc(news.newsId)
            .set(news.toJson())
  })))
});