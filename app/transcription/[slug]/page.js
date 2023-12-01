import firebase from "../../../firebase/index";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

const Content = ({ params }) => {
  const dataRef = doc(firebase.db, "data", params.slug);
  const docSnap = await getDoc(docRef);
  const { result } = docSnap.data();
  return <p>{result}</p>;
};

export default Content;
