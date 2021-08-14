import dayjs from 'dayjs';
import { ElementHandle, Page } from 'puppeteer';
import { JSON, JsonObject, JsonProperty } from "ta-json";
import '../extensions/array.extension'
import '../extensions/string.extension'
const year = dayjs().format('YYYY');

@JsonObject()
export class News {
  /// ID
  @JsonProperty('newsId')
  newsId: string;

  /// 日付(YYYY-MM-DD)
  @JsonProperty('date')
  date: string;

  /// リンクURL
  @JsonProperty('linkUrl')
  linkUrl: string;

  /// 画像URL
  @JsonProperty('imageUrl')
  imageUrl: string;

  /// タイトルテキスト
  @JsonProperty('titleText')
  titleText: string;

  /// メッセージテキスト
  @JsonProperty('messageText')
  messageText: string;

  constructor() {
    this.newsId = "";
    this.date = "";
    this.linkUrl = "";
    this.imageUrl = "";
    this.titleText = "";
    this.messageText = "";
  }

  static async factory(element: ElementHandle) {
    const news = new News();
    news.newsId = await News._newsId(element)
    news.date = await News._date(element)
    news.linkUrl = await News._linkUrl(element)
    news.imageUrl = await News._imageUrl(element)
    news.titleText = await News._titleText(element)
    news.messageText = await News._messageText(element)
    return news;
  }

  static _newsId = async (elm: ElementHandle) => {
    const href = await (await elm.getProperty('href')).jsonValue() as string
    return href.split('/')[href.split('/').length - 2].replace('post', '')
  }
  static _date = async (elm: ElementHandle) => await elm.$eval('.c-article-col__meta-date', (elm) => elm.textContent) ?? ""
  static _linkUrl = async (elm: ElementHandle) => await (await elm.getProperty('href')).jsonValue() as string
  static _imageUrl = async (elm: ElementHandle) => await (await (await elm.$('img'))!.getProperty('src')).jsonValue() as string
  static _titleText = async (elm: ElementHandle) => await elm.$eval('.c-article-col__title', (elm) => elm.textContent) ?? ""
  static _messageText = async (elm: ElementHandle) => await elm.$eval('.c-article-col__desc', (elm) => elm.textContent) ?? ""

  toJson(): Object {
    return JSON.parse(JSON.stringify(this))
  }
}
