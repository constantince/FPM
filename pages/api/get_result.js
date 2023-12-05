import firebase from "../../firebase/index";
import {
  doc,
  query,
  collection,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";

async function getResult(req, res) {
  if (req.method === "POST") {
    // console.log(req.body);
    const { result, process_id, status } = req.body;

    if (status === "FAILED" || status === "COMPLETE") {
      console.log(result, process_id, status);
      const dataCollectionRef = collection(firebase.db, "data");

      const q = query(dataCollectionRef, where("process_id", "==", process_id));
      // console.log("querySnapshot:::====>", q);
      const querySnapshot = await getDocs(q);

      // if (querySnapshot.empty()) return res.status(200).json({ code: 0 });
      if (querySnapshot.docs.length) {
        const docRef = doc(dataCollectionRef, querySnapshot.docs[0].id);
        // Update the timestamp field with the value from the server
        const updateTimestamp = await updateDoc(docRef, {
          result,
          status,
        });
      }
    }
    res.status(200).json({ code: 0 });
  } else {
    req.status(403).json({ message: "request method not support" });
  }
}

export default getResult;
