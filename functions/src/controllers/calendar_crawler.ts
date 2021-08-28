import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { CalendarRepository } from "../repositories/calendar_repository";
import { BaseCrawler } from "./base_crawler";

const url = "https://www.nikkansports.com/baseball/mlb/score/laa.html";

export class CalendarCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    return await CalendarRepository.fetchScheduleTable(page);
  }
}
// (async () => {
//   const crawler = new CalendarCrawler();
//   return await crawler.run<string>();
// })();