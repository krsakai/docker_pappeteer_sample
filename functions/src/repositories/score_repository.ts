import { Page } from "puppeteer";
import { PitcherScore } from '../models/pitcher_score';
import { HitterScore } from '../models/hitter_score';
import { LatestPitcherScore } from '../models/latest_pitcher_score';
import { LatestHitterScore } from '../models/latest_hitter_score';

export * from '../models/pitcher_score';
export * from '../models/hitter_score';
export * from '../models/latest_pitcher_score';
export * from '../models/latest_hitter_score';

const textContent = (elm: Element) => elm.textContent
const textListContent = (elmList: Element[]) => elmList.map((elm) => elm.textContent)
const scoreElementFilter = (value: (string | null)) => value != "エンゼルス"

export class ScoreRepository {
  static pitcherScoreList = async (page: Page, target: string) => {
    const textList = await page.$$eval(target, textListContent);
    const scoreList = textList.filter(scoreElementFilter);
    return [
      new PitcherScore(scoreList.slice(0, 17), "2021"),
      new PitcherScore(scoreList.slice(17, 34), "2020"),
      new PitcherScore(scoreList.slice(34, 51), "2018")
    ]
  }

  static hitterScoreList = async (page: Page, target: string) => {
    const textList = await page.$$eval(target, textListContent);
    const scoreList = textList.filter(scoreElementFilter);
    return [
      new HitterScore(scoreList.slice(51, 69), "2021"),
      new HitterScore(scoreList.slice(69, 87), "2020"),
      new HitterScore(scoreList.slice(87, 105), "2019"),
      new HitterScore(scoreList.slice(105, 123), "2018")
    ]
  }

  static latestPitcherScore = async (page: Page, scoreTarget: string, dateTarget: string) => {
    const scoreList = await page.$$eval(scoreTarget, textListContent);
    const date = await page.$eval(dateTarget, textContent)
    const aTag = await page.$(dateTarget)
    const href = await aTag?.getProperty('href')
    const url = await href?.jsonValue()
    scoreList.splice(0, 1);
    return new LatestPitcherScore(scoreList, date ?? "", typeof url === 'string' ? url: "")
  }

  static latestHitterScore = async (page: Page, scoreTarget: string, dateTarget: string) => {
    const scoreList = await page.$$eval(scoreTarget, textListContent);
    const date = await page.$eval(dateTarget, textContent)
    const aTag = await page.$(dateTarget)
    const href = await aTag?.getProperty('href')
    const url = await href?.jsonValue()
    scoreList.splice(0, 1);
    return new LatestHitterScore(scoreList, date ?? "", typeof url === 'string' ? url: "")
  }
}

