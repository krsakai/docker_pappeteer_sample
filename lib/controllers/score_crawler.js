"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const score_1 = require("../models/score");
const base_crawler_1 = require("./base_crawler");
const url = "https://baseball.yahoo.co.jp/mlb/teams/player/pitcher/727378";
const scoreTitleTarget = '.yjSMTseasonsscore > table > tbody > tr[class="ttl"] > th';
const scoreTarget = ".yjSMTseasonsscore > table > tbody > tr:not([class]) > td";
class ScoreCrawler extends base_crawler_1.BaseCrawler {
    async crawl(_, page) {
        await page.goto(url);
        const pitcherScoreList = await score_1.Score.pitcherScoreList(page, scoreTarget);
        const hitterScoreList = await score_1.Score.hitterScoreList(page, scoreTarget);
        await console.log(hitterScoreList);
    }
}
exports.default = ScoreCrawler;
(async () => {
    const crawler = new ScoreCrawler();
    await crawler.run();
})();
//# sourceMappingURL=score_crawler.js.map