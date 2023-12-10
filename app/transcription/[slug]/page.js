import admin from "../../../pages/firebase";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

const Content = async ({ params }) => {
  const idToken = cookies().get("token").value;
  if (typeof idToken !== "string") return <>No Auth</>;
  const user = await getAuth().verifyIdToken(idToken).catch(console.log);

  const db = admin.firestore();
  const docSnap = await db
    .collection("data")
    .where("uid", "==", user.uid)
    .where("process_id", "==", params.slug).get();

  if (!docSnap.empty) {
    const { text, errorMessage } = docSnap.docs[0].data();
    return <p>{text || errorMessage}</p>;
  }

  return <h1>Empty</h1>;
};

export default Content;
