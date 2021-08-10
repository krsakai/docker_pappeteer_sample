import { JSON, JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export class HitterScore {
  /// 年
  @JsonProperty('year')
  year: string;

  /// 打率
  @JsonProperty('avg')
  avg: string;

  /// 試合数
  @JsonProperty('games')
  games: string;

  /// 打数
  @JsonProperty('atBat')
  atBat: string;

  /// 得点
  @JsonProperty('score')
  score: string;

  /// 安打
  @JsonProperty('hit')
  hit: string;

  /// 2塁打
  @JsonProperty('twoBaseHit')
  twoBaseHit: string;

  /// 3塁打
  @JsonProperty('threeBaseHit')
  threeBaseHit: string;

  /// 本塁打
  @JsonProperty('homeRuns')
  homeRuns: string;

  /// 塁打数
  @JsonProperty('totalBases')
  totalBases: string;

  /// 打点
  @JsonProperty('runBattedIn')
  runBattedIn: string;

  /// 三振
  @JsonProperty('strikeouts')
  strikeouts: string;

  /// 四球
  @JsonProperty('basesOnBalles')
  basesOnBalles: string;

  /// 死球
  @JsonProperty('hitByPitch')
  hitByPitch: string;

  /// 犠打
  @JsonProperty('dacrificeHit')
  dacrificeHit: string;

  /// 犠飛
  @JsonProperty('sacrificeFly')
  sacrificeFly: string;

  /// 盗塁
  @JsonProperty('stolenBases')
  stolenBases: string;

  /// 出塁率
  @JsonProperty('onbasePercentage')
  onbasePercentage: string;

  /// 長打率
  @JsonProperty('sluggingPercentage')
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

  toJson(): Object {
    return JSON.parse(JSON.stringify(this))
  }
}
