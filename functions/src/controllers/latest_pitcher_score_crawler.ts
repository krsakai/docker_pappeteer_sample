import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { ScoreRepository } from '../repositories/score_repository';
import { BaseCrawler } from "./base_crawler";

const url = "https://www.nikkansports.com/baseball/mlb/score/?sdc_page_code=PlayerProf&sdc_subpage_code=MLB_PITCHER&player_global_id=727378&sports_code=sbmlb";
const latestScoreTarget = 'table[summary="最新成績"] > tbody > tr > td';
const latestDateTarget = 'table[summary="最新成績"] > tbody > tr > td > a';

export class LatestPitcherScoreCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    return await ScoreRepository.latestPitcherScore(page, latestScoreTarget, latestDateTarget);
  }
}
// (async () => {
//   const crawler = new LatestPitcherScoreCrawler();
//   await crawler.run();
// })();