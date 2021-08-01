"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const score_1 = require("../models/score");
const base_crawler_1 = require("./base_crawler");
const url = "https://www.nikkansports.com/baseball/mlb/score/?sdc_page_code=PlayerProf&sdc_subpage_code=MLB_BATTER&player_global_id=727378&sports_code=sbmlb";
const latestScoreTarget = 'table[summary="最新成績"] > tbody > tr > td';
const latestDateTarget = 'table[summary="最新成績"] > tbody > tr > td > a';
class LatestHitterScoreCrawler extends base_crawler_1.BaseCrawler {
    async crawl(_, page) {
        await page.goto(url);
        const latestHitterStore = await score_1.Score.latestHitterScore(page, latestScoreTarget, latestDateTarget);
        await console.log(latestHitterStore);
    }
}
exports.default = LatestHitterScoreCrawler;
(async () => {
    const crawler = new LatestHitterScoreCrawler();
    await crawler.run();
})();
//# sourceMappingURL=latest_hitter_score_crawler.js.map