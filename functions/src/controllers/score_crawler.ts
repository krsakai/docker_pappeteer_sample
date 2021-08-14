import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { ScoreRepository } from '../repositories/score_repository';
import { BaseCrawler } from "./base_crawler";

const url = "https://baseball.yahoo.co.jp/mlb/teams/player/pitcher/727378";
const scoreTitleTarget = '.yjSMTseasonsscore > table > tbody > tr[class="ttl"] > th';
const scoreTarget = ".yjSMTseasonsscore > table > tbody > tr:not([class]) > td";

export class ScoreCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    const pitcherScoreList = await ScoreRepository.pitcherScoreList(page, scoreTarget);
    const hitterScoreList = await ScoreRepository.hitterScoreList(page, scoreTarget);
    return await [hitterScoreList, pitcherScoreList]
  }
}
// (async () => {
//   const crawler = new ScoreCrawler();
//   await crawler.run();
// })();