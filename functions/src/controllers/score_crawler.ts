import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { Score } from '../models/score';
import { BaseCrawler } from "./base_crawler";

const url = "https://baseball.yahoo.co.jp/mlb/teams/player/pitcher/727378";
const scoreTitleTarget = '.yjSMTseasonsscore > table > tbody > tr[class="ttl"] > th';
const scoreTarget = ".yjSMTseasonsscore > table > tbody > tr:not([class]) > td";

export default class ScoreCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    const pitcherScoreList = await Score.pitcherScoreList(page, scoreTarget);
    const hitterScoreList = await Score.hitterScoreList(page, scoreTarget);
    await console.log(hitterScoreList);
  }
}

(async () => {
  const crawler = new ScoreCrawler();
  await crawler.run();
})();