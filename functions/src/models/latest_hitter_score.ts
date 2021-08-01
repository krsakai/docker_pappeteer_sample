export class LatestHitterScore {
  /// 日付
  date: string;

  /// 試合リンク
  gameLink: string;

  /// 対戦相手
  vsTeam: string;

  /// 打数
  atBat: string;

  /// 安打
  hit: string;

  /// 打点
  runBattedIn: string;

  /// 三振
  strikeouts: string;

  /// 本塁打
  homeRuns: string;

  /// 盗塁
  stolenBases: string;

  constructor(list: (string | null)[], date: string, gameLink: string) {
    const _list: string[] = list.removeNull();
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
