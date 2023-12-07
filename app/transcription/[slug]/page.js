import firebase from "../../../firebase/index";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

const Content = async ({ params }) => {
  const idToken = cookies().get("token");
  if (typeof idToken !== "string") return <>No Auth</>;
  const uid = await getAuth().verifyIdToken(idToken).catch(console.log);

  const db = admin.firestore();
  const docSnap = await db
    .collection("data")
    .where("uid", "==", uid)
    .where("process_id", "==", params.slug);

  if (docSnap.exists()) {
    const { text } = docSnap.data();
    return <p>{text}</p>;
  }

  return "Empty";
};

export default Content;
