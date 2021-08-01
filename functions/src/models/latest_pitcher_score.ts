import '../extensions/array.extension'
export class LatestPitcherScore {
  /// 日付
  date: string;

  /// 試合リンク
  gameLink: string;

  /// 対戦相手
  vsTeam: string;

  /// 勝敗
  outcome: string;

  /// 投球回数
  inningsPitched: string;

  /// 投球数
  numberPitched: string;

  /// 被安打
  hits: string;

  /// 与四球
  basesOnBalles: string;

  /// 自責点
  earnedRuns: string;

  /// 打者数
  numberHitters: string;

  /// 奪三振
  strikeouts: string;

  /// 失点
  runs: string;

  constructor(list: (string | null)[], date: string, gameLink: string) {
    const _list: string[] = list.removeNull();
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
