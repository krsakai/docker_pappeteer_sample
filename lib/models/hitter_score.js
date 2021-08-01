"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitterScore = void 0;
class HitterScore {
    constructor(list, year) {
        const _list = list.removeNull();
        this.year = year;
        this.avg = _list[0];
        this.games = _list[1];
        this.atBat = _list[2];
        this.score = _list[3];
        this.hit = _list[4];
        this.twoBaseHit = _list[5];
        this.threeBaseHit = _list[6];
        this.homeRuns = _list[7];
        this.totalBases = _list[8];
        this.runBattedIn = _list[9];
        this.strikeouts = _list[10];
        this.basesOnBalles = _list[11];
        this.hitByPitch = _list[12];
        this.dacrificeHit = _list[13];
        this.sacrificeFly = _list[14];
        this.stolenBases = _list[15];
        this.onbasePercentage = _list[16];
        this.sluggingPercentage = _list[17];
    }
}
exports.HitterScore = HitterScore;
//# sourceMappingURL=hitter_score.js.map