"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PitcherScore = void 0;
class PitcherScore {
    constructor(list, year) {
        const _list = list.removeNull();
        this.year = year;
        this.era = _list[0];
        this.games = _list[1];
        this.completeGames = _list[2];
        this.shutouts = _list[3];
        this.win = _list[4];
        this.losses = _list[5];
        this.saves = _list[6];
        this.inningsPitched = _list[7];
        this.hits = _list[8];
        this.homeRuns = _list[9];
        this.strikeouts = _list[10];
        this.basesOnBalles = _list[11];
        this.hitsBatsmen = _list[12];
        this.ring = _list[13];
        this.bok = _list[14];
        this.runs = _list[15];
        this.earnedRuns = _list[16];
    }
}
exports.PitcherScore = PitcherScore;
//# sourceMappingURL=pitcher_score.js.map