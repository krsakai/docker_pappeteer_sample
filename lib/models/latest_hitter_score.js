"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestHitterScore = void 0;
class LatestHitterScore {
    constructor(list, date, gameLink) {
        const _list = list.removeNull();
        this.date = date;
        this.gameLink = gameLink;
        this.vsTeam = _list[0];
        this.atBat = _list[1];
        this.hit = _list[2];
        this.runBattedIn = _list[3];
        this.strikeouts = _list[4];
        this.homeRuns = _list[5];
        this.stolenBases = _list[6];
    }
}
exports.LatestHitterScore = LatestHitterScore;
//# sourceMappingURL=latest_hitter_score.js.map