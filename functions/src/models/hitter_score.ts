export class HitterScore {
  /// 年
  year: string;

  /// 打率
  avg: string;

  /// 試合数
  games: string;

  /// 打数
  atBat: string;

  /// 得点
  score: string;

  /// 安打
  hit: string;

  /// 2塁打
  twoBaseHit: string;

  /// 3塁打
  threeBaseHit: string;

  /// 本塁打
  homeRuns: string;

  /// 塁打数
  totalBases: string;

  /// 打点
  runBattedIn: string;

  /// 三振
  strikeouts: string;

  /// 四球
  basesOnBalles: string;

  /// 死球
  hitByPitch: string;

  /// 犠打
  dacrificeHit: string;

  /// 犠飛
  sacrificeFly: string;

  /// 盗塁
  stolenBases: string;

  /// 出塁率
  onbasePercentage: string;

  /// 長打率
  sluggingPercentage: string;

  constructor(list: (string | null)[], year: string) {
    const _list: string[] = list.removeNull();
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
