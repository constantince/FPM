import admin from "/firebase/admin";
import monster from "/utils/monsterapi";
import { getAuth } from "firebase-admin/auth";
const env = process.env;
//test:https://firebasestorage.googleapis.com/v0/b/podcast-translator-7c103.appspot.com/o/audios%2Ffirst_voice.mp3?alt=media&token
const db = admin.firestore();
// console.log(firebase.db);
// const { doc, setDoc, collection } = firebase.db;
const col = db.collection("examples");
// console.log(dataRef);;
async function upload(request, response) {
  if (request.method === "POST") {
    const idToken = request.cookies.token;
    if (typeof idToken !== "string")
      return response.status(403).json({
        code: 1,
        message: "Insufficient auth",
      });
    const user = await getAuth().verifyIdToken(idToken).catch(console.log);
    if (!user) {
      return response.status(401).json({
        code: 1,
        message: "Not a verified user",
      });
    }
    const { downloadUrl, name } = request.body;
    // console.log("result:", result);
    // create document with donwloadUlrl and pid;
    await col.add({
      downloadUrl,
      uid: user.uid,
      name,
    });

    response.status(200).json({
      code: 0,
      obj: null,
      message: "file upload success",
      pid: process_id,
      status,
    });
  } else {
    response.status(403).json({ message: "request method not support" });
  }
}

export default upload;
