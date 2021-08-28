import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { ScoreRepository } from '../repositories/score_repository';
import { BaseCrawler } from "./base_crawler";
export { ScoreCrawler}

const url = "https://baseball.yahoo.co.jp/mlb/teams/player/pitcher/727378";

class ScoreCrawler extends BaseCrawler {
  protected async crawl(_: Browser, page: Page) {
    await page.goto(url);
    const pitcherScoreList = await ScoreRepository.pitcherScoreList(page);
    const hitterScoreList = await ScoreRepository.hitterScoreList(page);
    return await [hitterScoreList, pitcherScoreList]
  }
}
// (async () => {
//   const crawler = new ScoreCrawler();
//   await crawler.run();
// })();