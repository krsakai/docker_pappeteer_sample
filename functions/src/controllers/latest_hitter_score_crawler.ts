import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { Score } from '../models/score';
import { BaseCrawler } from "./base_crawler";

const url = "https://www.nikkansports.com/baseball/mlb/score/?sdc_page_code=PlayerProf&sdc_subpage_code=MLB_BATTER&player_global_id=727378&sports_code=sbmlb";
const latestScoreTarget = 'table[summary="最新成績"] > tbody > tr > td';
const latestDateTarget = 'table[summary="最新成績"] > tbody > tr > td > a';

export class LatestHitterScoreCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    return await Score.latestHitterScore(page, latestScoreTarget, latestDateTarget);
  }
}
// (async () => {
//   const crawler = new LatestHitterScoreCrawler();
//   await crawler.run();
// })();