import firebase from "../../firebase/index";
import { doc, query, collection, getDocs, updateDoc } from "firebase/firestore";

export default async function getResult(req, res) {
  if (req.method === "POST") {
    const { result, process_id, status } = req.body;
    if (status === "COMPLETED") {
      const dataCollectionRef = collection(firebase.db, "data");

      const q = query(dataCollectionRef, where("process_id", "==", process_id));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty()) return;

      const docRef = doc(dataCollectionRef, q.docs[0].id);

      // Update the timestamp field with the value from the server
      const updateTimestamp = await updateDoc(docRef, {
        result,
        status,
      });
    }
  }
}
