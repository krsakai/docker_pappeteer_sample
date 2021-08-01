"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Score = void 0;
const pitcher_score_1 = require("./pitcher_score");
const hitter_score_1 = require("./hitter_score");
const latest_pitcher_score_1 = require("./latest_pitcher_score");
const latest_hitter_score_1 = require("./latest_hitter_score");
__exportStar(require("./pitcher_score"), exports);
__exportStar(require("./hitter_score"), exports);
const textContent = (elm) => elm.textContent;
const textListContent = (elmList) => elmList.map((elm) => elm.textContent);
const titleElementFilter = (value) => value != "年" && value != "チーム";
const scoreElementFilter = (value) => value != "エンゼルス";
class Score {
}
exports.Score = Score;
Score.pitcherTitleList = async (page, target) => {
    const textList = await page.$$eval(target, textListContent);
    const titleList = textList.filter(titleElementFilter);
    return titleList.slice(0, 17);
};
Score.hitterTitleList = async (page, target) => {
    const textList = await page.$$eval(target, textListContent);
    const titleList = textList.filter(titleElementFilter);
    return titleList.slice(17, 35);
};
Score.pitcherScoreList = async (page, target) => {
    const textList = await page.$$eval(target, textListContent);
    const scoreList = textList.filter(scoreElementFilter);
    return [
        new pitcher_score_1.PitcherScore(scoreList.slice(0, 17), "2021"),
        new pitcher_score_1.PitcherScore(scoreList.slice(17, 34), "2020"),
        new pitcher_score_1.PitcherScore(scoreList.slice(34, 51), "2018")
    ];
};
Score.hitterScoreList = async (page, target) => {
    const textList = await page.$$eval(target, textListContent);
    const scoreList = textList.filter(scoreElementFilter);
    return [
        new hitter_score_1.HitterScore(scoreList.slice(51, 69), "2021"),
        new hitter_score_1.HitterScore(scoreList.slice(69, 87), "2020"),
        new hitter_score_1.HitterScore(scoreList.slice(87, 105), "2019"),
        new hitter_score_1.HitterScore(scoreList.slice(105, 123), "2018")
    ];
};
Score.latestPitcherScore = async (page, scoreTarget, dateTarget) => {
    const scoreList = await page.$$eval(scoreTarget, textListContent);
    const date = await page.$eval(dateTarget, textContent);
    const aTag = await page.$(dateTarget);
    const href = await (aTag === null || aTag === void 0 ? void 0 : aTag.getProperty('href'));
    const url = await (href === null || href === void 0 ? void 0 : href.jsonValue());
    scoreList.splice(0, 1);
    return new latest_pitcher_score_1.LatestPitcherScore(scoreList, date !== null && date !== void 0 ? date : "", typeof url === 'string' ? url : "");
};
Score.latestHitterScore = async (page, scoreTarget, dateTarget) => {
    const scoreList = await page.$$eval(scoreTarget, textListContent);
    const date = await page.$eval(dateTarget, textContent);
    const aTag = await page.$(dateTarget);
    const href = await (aTag === null || aTag === void 0 ? void 0 : aTag.getProperty('href'));
    const url = await (href === null || href === void 0 ? void 0 : href.jsonValue());
    scoreList.splice(0, 1);
    return new latest_hitter_score_1.LatestHitterScore(scoreList, date !== null && date !== void 0 ? date : "", typeof url === 'string' ? url : "");
};
//# sourceMappingURL=score.js.map