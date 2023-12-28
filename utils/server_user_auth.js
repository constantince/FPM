import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
export default async (sessionCookie) => {
  let user = null;
  if (sessionCookie) {
    // console.log("thhis is session cookie in nav", sessionCookie);
    const token = await getAuth()
      .verifySessionCookie(sessionCookie, true /** checkRevoked */)
      .catch((ex) => null);
    console.log("server_user_auth.js line 10: this is token", token);

    if (token) {
      getAuth()
        .getUser(token.sub)
        .then((userRecord) => {
          // The claims can be accessed on the user record.
          console.log(userRecord);
        });
      // console.log("error in nav", sessionCookie, token);
      const db = admin.firestore();
      // search user collection
      const user_docs = await db.collection("users").doc(token.sub).get();

      user = user_docs.data();
      return user;
    }
  }
  return user;
};
