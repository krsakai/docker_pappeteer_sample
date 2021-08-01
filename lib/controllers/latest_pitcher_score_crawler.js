"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const score_1 = require("../models/score");
const base_crawler_1 = require("./base_crawler");
const url = "https://www.nikkansports.com/baseball/mlb/score/?sdc_page_code=PlayerProf&sdc_subpage_code=MLB_PITCHER&player_global_id=727378&sports_code=sbmlb";
const latestScoreTarget = 'table[summary="最新成績"] > tbody > tr > td';
const latestDateTarget = 'table[summary="最新成績"] > tbody > tr > td > a';
class LatestPitcherScoreCrawler extends base_crawler_1.BaseCrawler {
    async crawl(_, page) {
        await page.goto(url);
        const latestPitcherStore = await score_1.Score.latestPitcherScore(page, latestScoreTarget, latestDateTarget);
        await console.log(latestPitcherStore);
    }
}
exports.default = LatestPitcherScoreCrawler;
(async () => {
    const crawler = new LatestPitcherScoreCrawler();
    await crawler.run();
})();
//# sourceMappingURL=latest_pitcher_score_crawler.js.map