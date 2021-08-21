import dayjs from 'dayjs';
import { JSON, JsonObject, JsonProperty } from "ta-json";
import '../extensions/array.extension'
import '../extensions/string.extension'
import { LatestScore } from './latest_score';
const year = dayjs().format('YYYY');

@JsonObject()
export class LatestHitterScore implements LatestScore{
  /// 日付
  @JsonProperty('date')
  date: string;

  /// 試合リンク
  @JsonProperty('gameLink')
  gameLink: string;

  /// 対戦相手
  @JsonProperty('vsTeam')
  vsTeam: string;

  /// 打数
  @JsonProperty('atBat')
  atBat: string;

  /// 安打
  @JsonProperty('hit')
  hit: string;

  /// 打点
  @JsonProperty('runBattedIn')
  runBattedIn: string;

  /// 三振
  @JsonProperty('strikeouts')
  strikeouts: string;

  /// 四死球
  @JsonProperty('basesOnBalles')
  basesOnBalles: string;

  /// 本塁打
  @JsonProperty('homeRuns')
  homeRuns: string;

  /// 盗塁
  @JsonProperty('stolenBases')
  stolenBases: string;

  constructor(list: (string | null)[], date: string, gameLink: string) {
    const _list: string[] = list.removeNull();
    this.date = this._dateYearToDayFrom(date);
    this.gameLink = gameLink;
    this.vsTeam = _list[0];
    this.atBat = _list[1];
    this.hit = _list[2];
    this.runBattedIn = _list[3];
    this.strikeouts = _list[4];
    this.basesOnBalles = _list[5];
    this.homeRuns = _list[6];
    this.stolenBases = _list[7];
  }

  _dateYearToDayFrom(dateString: string): string {
    const date = dateString.split("月").map((elm => elm.replace("日", "")));
    return `${year}-${date[0].twoDigit()}-${date[1].twoDigit()}`
  }

  toJson(): Object {
    return JSON.parse(JSON.stringify(this))
  }
}
