import firebase from "../../firebase/index";
import { doc, setDoc, collection } from "firebase/firestore";
import monster from "../monsterapi";

//test:https://firebasestorage.googleapis.com/v0/b/podcast-translator-7c103.appspot.com/o/audios%2Ffirst_voice.mp3?alt=media&token
// const db = firebase.firestore();
const dataRef = collection(firebase.db, "data");
async function upload(request, response) {
  if (request.method === "POST") {
    const { downloadUrl } = request.body;
    // invoke function start to transcripte.
    const {
      data: { process_id },
      status,
    } = await monster.transcription(
      downloadUrl,
      "transcriptionHook",
      "https://xffm9f-3000.csb.app/api/get_result",
    );
    // console.log("result:", result);
    // create document with donwloadUlrl and pid;
    await setDoc(doc(dataRef), {
      downloadUrl,
      process_id,
      uid: "gRDnu6ncJlcldeFeOAme",
      status: "IN_PROCESS",
    });

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
