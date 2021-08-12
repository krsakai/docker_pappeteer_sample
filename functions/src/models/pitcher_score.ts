import { JSON, JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export class PitcherScore {
  /// 年
  @JsonProperty('year')
  year: string;

  /// 防御率
  @JsonProperty('era')
  era: string;

  /// 試合数
  @JsonProperty('games')
  games: string;

  /// 完封
  @JsonProperty('completeGames')
  completeGames: string;

  /// 完封
  @JsonProperty('shutouts')
  shutouts: string;

  /// 勝利
  @JsonProperty('win')
  win: string;

  /// 敗北
  @JsonProperty('losses')
  losses: string;

  /// セーブ
  @JsonProperty('saves')
  saves: string;

  /// 投球回数
  @JsonProperty('inningsPitched')
  inningsPitched: string;

  /// 被安打
  @JsonProperty('hits')
  hits: string;

  /// 被本塁打
  @JsonProperty('homeRuns')
  homeRuns: string;

  /// 奪三振
  @JsonProperty('strikeouts')
  strikeouts: string;

  /// 与四球
  @JsonProperty('basesOnBalles')
  basesOnBalles: string;

  /// 与死球
  @JsonProperty('hitsBatsmen')
  hitsBatsmen: string;

  /// 暴投
  @JsonProperty('ring')
  ring: string;

  /// ボーク
  @JsonProperty('bok')
  bok: string;

  /// 失点
  @JsonProperty('runs')
  runs: string;

  /// 自責点
  @JsonProperty('earnedRuns')
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

  toJson(): Object {
    return JSON.parse(JSON.stringify(this))
  }
}
