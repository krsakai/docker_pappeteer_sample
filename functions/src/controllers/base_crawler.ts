import puppeteer from 'puppeteer'
import { Browser } from "puppeteer"; 
import { Page } from "puppeteer";

export interface Crawler {
  run<T>(): Promise<T>;
}

export abstract class BaseCrawler implements Crawler {
  async run<T>(): Promise<T> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
    const _page = await browser.newPage();
    const _results = await this.crawl(browser, _page);
    await browser.close();
    return _results as T;
  }

  protected abstract crawl(browser: Browser, page: Page): any;
}
