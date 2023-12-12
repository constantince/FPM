import { doc, setDoc } from "firebase/firestore";
import { transcription, registerHook } from "./monsterapi";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, process_id } = req.body;

    registerHook(
      "https://xffm9f-3000.csb.app/start_transcribe?",
      "getTtsResult",
    );

    res.status(err.statusCode || 500).json(req.body);
    // save the first process_id;
    await setDoc(doc(db, "transcriptions", auth), req.body);
    // save the result in firebase
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// export default handler;
