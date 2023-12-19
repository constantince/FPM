import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
export default async (sessionCookie) => {
  let user = null;
  if (sessionCookie) {
    console.log("thhis is session cookie in nav", sessionCookie);
    const token = await getAuth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .catch((ex) => null);
    if (token) {
      // console.log("error in nav", sessionCookie, token);
      const db = admin.firestore();
      // search user collection
      const user_docs = await db.collection("Users").doc(token.sub).get();

      user = user_docs.data();

      return user;
    }
  }
  return user;
};
