export class PitcherScore {
  /// 年
  year: string;

  /// 防御率
  era: string;

  /// 試合数
  games: string;

  /// 完投
  completeGames: string;

  /// 完封
  shutouts: string;

  /// 勝利
  win: string;

  /// 敗北
  losses: string;

  /// セーブ
  saves: string;

  /// 投球回数
  inningsPitched: string;

  /// 被安打
  hits: string;

  /// 被本塁打
  homeRuns: string;

  /// 奪三振
  strikeouts: string;

  /// 与四球
  basesOnBalles: string;

  /// 与死球
  hitsBatsmen: string;

  /// 暴投
  ring: string;

  /// ボーク
  bok: string;

  /// 失点
  runs: string;

  /// 自責点
  earnedRuns: string;

  constructor(list: (string | null)[], year: string) {
    const _list: string[] = list.removeNull();
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
