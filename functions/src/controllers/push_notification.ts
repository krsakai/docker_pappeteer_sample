import * as admin from "firebase-admin";

class PushNotification {

  static fetchLastUpdateDate = async () => {
    const doc = await admin.firestore().collection('pushNotification').doc('master').get()
    const data = doc.data()
    if (data !== undefined) {
      return data['updateDate'] as string
    } else {
      return ''
    }
  }

  static updateSendDate = async (updateDate: string) => {
    await admin.firestore().collection('pushNotification').doc('master').set({'updateDate': updateDate})
  }

  static post = async (title: string, message: string) => {
    const tokenList = await PushNotification.tokenList()
    const sendToDeviceTask = await tokenList.map(async token => {
      const payload = {
        notification: {
          title: title,
          body: message,
          badge: "1",
          sound: "default"
        }
      }
      await admin.messaging().sendToDevice(token, payload, {priority: "high"})
    })
    await Promise.all(sendToDeviceTask)
  }

  static tokenList = async (fetchAll: Boolean = false) => {
    const snapshot = await admin.firestore()
      .collection("user")
      .where('suspend', '==', fetchAll)
      .get()
    const tokenList: string[] = []; 
    snapshot.forEach(doc => {
      tokenList.push(doc.data()['token'])
    })
    return tokenList
  }
}

export { PushNotification }