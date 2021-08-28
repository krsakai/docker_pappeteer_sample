import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { ScoreRepository } from '../repositories/score_repository';
import { BaseCrawler } from "./base_crawler";

const url = "https://www.nikkansports.com/baseball/mlb/score/?sdc_page_code=PlayerProf&sdc_subpage_code=MLB_BATTER&player_global_id=727378&sports_code=sbmlb";

export class LatestHitterScoreCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    return await ScoreRepository.latestHitterScore(page);
  }
}
// (async () => {
//   const crawler = new LatestHitterScoreCrawler();
//   await crawler.run();
// })();

// https://www.nikkansports.com/baseball/mlb/score/laa.html