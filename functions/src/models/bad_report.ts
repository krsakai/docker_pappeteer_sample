import { ElementHandle } from "puppeteer";
import { JSON, JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export class BatReport {
  @JsonProperty('innings')
  innings: string;

  @JsonProperty('report')
  report: string;

  constructor() {
    this.innings = "";
    this.report = "";
  }

  static factoryWithDB(data: FirebaseFirestore.DocumentData) {
    const report = new BatReport();
    report.innings = data['innings']
    report.report = data['report']
    return report;
  }

  static async factoryWithPage(element: ElementHandle) {
    const report = new BatReport();
    report.innings = await BatReport._innings(element)
    report.report = await BatReport._report(element)
    return report;
  }

  static _innings = async (elm: ElementHandle) => {
    const tdList = await elm.$$eval('td', (elmList: Element[]) => elmList.map((elm) => elm.textContent ?? ""));
    return tdList[0];
  }

  static _report = async (elm: ElementHandle) => {
    const tdList = await elm.$$eval('td', (elmList: Element[]) => elmList.map((elm) => elm.textContent ?? ""));
    return tdList[1];
  }

  toJson(): Object {
    return JSON.parse(JSON.stringify(this))
  }
}