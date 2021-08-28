import { Page } from "puppeteer";
import * as admin from "firebase-admin";
import { BatReport } from "../models/bad_report";

export { PostalReportRepository }

const target = 'table[summary="最新成績詳細"] > tbody > tr';

class PostalReportRepository {
  static fetchBatReportListTask = async (page: Page) => {
    const elementList = await page.$$(target)
    return Promise.all(elementList.map(async (elm) => await BatReport.factoryWithPage(elm)))
  }

  static fetchLatestGameDate = async () => {
    const doc = await admin.firestore().collection('latestGameDate').doc('master').get()
    const data = doc.data()
    if (data !== undefined) {
      return data['updateDate'] as string
    } else {
      return ''
    }
  }

  static updateLatestGameDate = async (updateDate: string) => {
    return await admin.firestore().collection('latestGameDate').doc('master').set({'updateDate': updateDate})
  }

  static postGameStart = async (title: string, message: string) => {
    const tokenList = await PostalReportRepository.tokenList('game_notification_suspend', '==')
    const sendToDeviceTask = await tokenList.map(async token => {
      const payload = {
        notification: {
          title: title,
          body: message,
          badge: "1",
          sound: "default"
        }
      }
      return await admin.messaging().sendToDevice(token, payload, {priority: "high"})
    })
    return await Promise.all(sendToDeviceTask)
  }

  // MARK: - 最新打席情報通知

  static fetchLatestBatReportedList = async () => {
    const snapshot = await admin.firestore().collection('latestBatReport').get()
    const reportList: BatReport[] = []
    snapshot.forEach(async doc => {
      reportList.push(BatReport.factoryWithDB(doc.data()))
    })
    return reportList
  }

  static updateLatestBatReportedList = async (batReportList: BatReport[]) => {
    const updateList = batReportList.map((value, index) => {
      return admin.firestore().collection('latestBatReport').doc(`${index}`).set(value.toJson())
    })
    return await Promise.all(updateList);
  }

  static deleteLatestBatReportedList = async () => {
    const snapshot = await admin.firestore().collection('latestBatReport').get();
    const deleteList: Promise<FirebaseFirestore.WriteResult>[] = [];
    snapshot.forEach(doc => {
      deleteList.push(admin.firestore().collection('latestBatReport').doc(doc.id).delete())
    })
    return await Promise.all(deleteList);
  }

  static postBatStart = async (report: BatReport) => {
    const tokenList = await PostalReportRepository.tokenList('bat_notification_suspend', '==')
    const sendToDeviceTask = await tokenList.map(async token => {
      const payload = {
        notification: {
          title: `${report.innings}の大谷翔平の打席結果`,
          body: report.report,
          badge: "1",
          sound: "default"
        }
      }
      return await admin.messaging().sendToDevice(token, payload, {priority: "high"})
    })
    return await Promise.all(sendToDeviceTask)
  }

  // MARK: - 対象ユーザーのデバイストークンリスト取得

  static tokenList = async (column: string, condition: FirebaseFirestore.WhereFilterOp, value: Boolean = false) => {
    const snapshot = await admin.firestore().collection("user").where(column, condition, value).get()
    const tokenList: (string | null)[] = []; 
    snapshot.forEach(doc => {
      tokenList.push(doc.data()['token'])
    })
    return tokenList.removeEmpty<string>().filter(item => item != '')
  }
}
