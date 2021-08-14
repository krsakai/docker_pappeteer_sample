import { Page } from "puppeteer";
import { News } from "../models/news";

export * from '../models/news';

const newsTarget = '.l-main__content-primary > .c-article-col > a';

export class NewsRepository {
  static newsList = async (page: Page) => {
    const elementList = await page.$$(newsTarget)
    return await Promise.all(elementList.map(async (elm) => await News.factory(elm)))
  }
}
