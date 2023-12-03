import firebase from "../../../firebase/index";
import { collection, query, where, getDoc, doc } from "firebase/firestore";

const Content = async ({ params }) => {
  const dataRef = doc(firebase.db, "data", params.slug);
  const docSnap = await getDoc(dataRef);

  if (docSnap.exists()) {
    const { content } = docSnap.data();
    console.log(docSnap.data())
    return <p>{content}</p>;
  }
  
  return "Not Found..."
  
};

export default Content;
