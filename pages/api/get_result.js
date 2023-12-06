import admin from "../firebase";
import {
  doc,
  query,
  collection,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
const db = admin.firestore();
const col = db.collection("data");

async function getResult(req, res) {
  if (req.method === "POST") {
    // console.log(req.body);
    const { result, process_id, status } = req.body;
    console.log(result, process_id, status);
    if (status === "FAILED" || status === "COMPLETED") {
      // Update the timestamp field with the value from the server
      const updateTimestamp = await col.doc(process_id).update({
        ...result,
        status,
      });
    }

    res.status(200).json({ code: 0 });
  } else {
    req.status(403).json({ message: "request method not support" });
  }
}

export default getResult;
