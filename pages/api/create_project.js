import admin from '/firebase/admin'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue } from 'firebase-admin/firestore'

const db = admin.firestore()
const examplesCol = db.collection('examples')
const voiceCol = db.collection('voices')
export default async function SessionLogin(req, res) {
    if (req.method !== 'POST') {
        res.status(401).send('UNAUTHORIZED REQUEST!')
        return
    }
    const { link, voice, name, message, uid } = req.body
    // console.log('post body...', req.body)
    const example = await examplesCol.add({
        downloadUrl: link,
        uid: uid,
        name: voice,
        createTime: FieldValue.serverTimestamp(),
    })
    console.log('example id::', example.id)
    // const voicesCol = db.collection('voices')
    await voiceCol.add({
        words: message,
        uid,
        name,
        example: example.id,
        status: 'pending',
        createTime: FieldValue.serverTimestamp(),
    })

    //   const doc = await feedInfo.get();
    //   if (doc.exists) {
    //     await feedInfo.update({
    //       message: FieldValue.arrayUnion(message),
    //     });
    //   } else {
    //     await feedInfo.set({
    //       message: [message],
    //     });
    //   }
    res.redirect(303, `${req.headers.origin}/success`)
}
