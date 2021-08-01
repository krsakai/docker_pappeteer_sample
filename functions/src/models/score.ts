import { Page } from "puppeteer";
import { PitcherScore } from './pitcher_score';
import { HitterScore } from './hitter_score';
import { LatestPitcherScore } from './latest_pitcher_score';
import { LatestHitterScore } from './latest_hitter_score';

export * from './pitcher_score';
export * from './hitter_score';

const textContent = (elm: Element) => elm.textContent
const textListContent = (elmList: Element[]) => elmList.map((elm) => elm.textContent)
// const dateContent = (elmList: Element[]) => elmList .map((elm) => elm.href)

const titleElementFilter = (value: (string | null)) => value != "年" && value != "チーム"
const scoreElementFilter = (value: (string | null)) => value != "エンゼルス"

export class Score {
  static pitcherTitleList = async (page: Page, target: string) => {
    const textList = await page.$$eval(target, textListContent);
    const titleList = textList.filter(titleElementFilter);
    return titleList.slice(0, 17);
  }

  static hitterTitleList = async (page: Page, target: string) => {
    const textList = await page.$$eval(target, textListContent);
    const titleList = textList.filter(titleElementFilter);
    return titleList.slice(17, 35);
  }

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

