import admin from "../firebase";
import monster from "../monsterapi";

//test:https://firebasestorage.googleapis.com/v0/b/podcast-translator-7c103.appspot.com/o/audios%2Ffirst_voice.mp3?alt=media&token
const db = admin.firestore();
// console.log(firebase.db);
// const { doc, setDoc, collection } = firebase.db;
const col = db.collection("data");
// console.log(dataRef);
async function upload(request, response) {
  if (request.method === "POST") {
    const { downloadUrl, uid } = request.body;
    // invoke function start to transcripte.
    const {
      data: { process_id },
      status,
    } = await monster.transcription(
      downloadUrl,
      "transcriptionHook",
      "https://xffm9f-3000.csb.app/api/get_result",
    ).catch(ex => {
      console.log("error:", ex);
      return ex;
    });
    // console.log("result:", result);
    // create document with donwloadUlrl and pid;
    await col.doc(process_id).set(
      {
        downloadUrl,
        process_id,
        uid,
        status: "IN_PROCESS",
      },
      { merge: true },
    );

    response.status(200).json({
      code: 0,
      obj: null,
      message: "file upload success, waitting for hook action.",
      pid: process_id,
      status,
    });
  }
}

export default upload;
