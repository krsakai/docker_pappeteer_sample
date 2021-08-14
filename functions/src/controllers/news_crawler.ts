import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { NewsRepository } from "../repositories/news_repository";
import { BaseCrawler } from "./base_crawler";

const url = "https://full-count.jp/category/mlb/shohei-ohtani/";

export class NewsCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    return await NewsRepository.newsList(page);
  }
}
// (async () => {
//   const crawler = new NewsCrawler();
//   await crawler.run();
// })();