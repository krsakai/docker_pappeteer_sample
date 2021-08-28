import { Page } from "puppeteer";

const target = '.nScore-bb > #topTableSch';

export class CalendarRepository {
  static fetchScheduleTable = async (page: Page) => {
    const element = await page.$(target)
    return await element!.evaluate(element => element.outerHTML)
  }
}
