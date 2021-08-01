"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPitcherScore = void 0;
require("../extensions/array.extension");
class LatestPitcherScore {
    constructor(list, date, gameLink) {
        const _list = list.removeNull();
        this.date = date;
        this.gameLink = gameLink;
        this.vsTeam = _list[0];
        this.outcome = _list[1];
        this.inningsPitched = _list[2];
        this.numberPitched = _list[3];
        this.hits = _list[4];
        this.basesOnBalles = _list[5];
        this.earnedRuns = _list[6];
        this.numberHitters = _list[7];
        this.strikeouts = _list[8];
        this.runs = _list[9];
    }
}
exports.LatestPitcherScore = LatestPitcherScore;
//# sourceMappingURL=latest_pitcher_score.js.map