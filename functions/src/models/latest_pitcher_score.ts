import dayjs from 'dayjs';
import { JSON, JsonObject, JsonProperty } from "ta-json";
const year = dayjs().format('YYYY');
import '../extensions/array.extension'
import '../extensions/string.extension'
import { LatestScore } from './latest_score';

@JsonObject()
export class LatestPitcherScore implements LatestScore {
  /// 日付
  @JsonProperty('date')
  date: string;

  /// 試合リンク
  @JsonProperty('gameLink')
  gameLink: string;

  /// 対戦相手
  @JsonProperty('vsTeam')
  vsTeam: string;

  /// 勝敗
  @JsonProperty('outcome')
  outcome: string;

  /// 投球回数
  @JsonProperty('inningsPitched')
  inningsPitched: string;

  /// 投球数
  @JsonProperty('numberPitched')
  numberPitched: string;

  /// 被安打
  @JsonProperty('hits')
  hits: string;

  /// 与四球
  @JsonProperty('basesOnBalles')
  basesOnBalles: string;

  /// 自責点
  @JsonProperty('earnedRuns')
  earnedRuns: string;

  /// 打者数
  @JsonProperty('numberHitters')
  numberHitters: string;

  /// 奪三振
  @JsonProperty('strikeouts')
  strikeouts: string;

  /// 失点
  @JsonProperty('runs')
  runs: string;

  constructor(list: (string | null)[], date: string, gameLink: string) {
    const _list: string[] = list.removeNull();
    this.date = this._dateYearToDayFrom(date);
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

  _dateYearToDayFrom(dateString: string): string {
    const date = dateString.split("月").map((elm => elm.replace("日", "")));
    return `${year}-${date[0].twoDigit()}-${date[1].twoDigit()}`
  }

  toJson(): Object {
    return JSON.parse(JSON.stringify(this))
  }
}
