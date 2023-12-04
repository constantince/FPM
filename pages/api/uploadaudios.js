
import firebase from "../../firebase/index";
import { doc, setDoc } from "firebase/firestore";
import { transcription } from "../monsterapi";

const dataRef = collection(firebase.db, "data");
export default UploadAudios sync(request, responese) {

    if (req.method === "POST") {
        const { downloadUlr } = request.body;
// invoke function start to transcripte.
        const { process_id } = await transcription(downloadUrl);

        // create document with donwloadUlrl and pid;
        await setDoc(doc(dataRef), {downloadUrl, process_id, status: "IN_PROGRESS"});

        response.status(200).json({code: 0, obj: null, message: "url upload success"})
    }
    

   
}