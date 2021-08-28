import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BatReport } from "../models/bad_report";
import { PostalReportRepository } from "../repositories/postal_report_repository";
import { BaseCrawler } from "./base_crawler";

const url = "https://www.nikkansports.com/baseball/mlb/score/?sdc_page_code=PlayerProf&sdc_subpage_code=MLB_BATTER&player_global_id=727378&sports_code=sbmlb&operation_mode=";

export class BatPostalReportCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url, {timeout: 60000});
    return await PostalReportRepository.fetchBatReportListTask(page);
  }
}
// (async () => {
//   const crawler = new BatPostalReportCrawler();
//   const bbbb =  await crawler.run<BatReport[]>();
//   console.log(bbbb);
// })();
