import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

export default async function serverAuth() {
  let user = {};
  const sessionCookie = (cookies().get("session") || {}).value;
  if (sessionCookie) {
    // console.log("thhis is session cookie in nav", sessionCookie);
    const token = await getAuth()
      .verifySessionCookie(sessionCookie /** checkRevoked */)
      .catch((ex) => ({}));
    console.log("server_user_auth.js line 10: this is token", token);

    if (token) {
      const userRecord = await getAuth().getUser(token.sub);

      const role = userRecord["customClaims"]
        ? userRecord["customClaims"]["stripeRole"]
        : null;

      // console.log("server_user_auth.js line 14, your role is::", role);
      console.log("error in nav", sessionCookie, token);
      const db = admin.firestore();
      // search user collection
      const user_docs = await db.collection("users").doc(token.sub).get();

      user = user_docs.data();
      user.role = role;
      return user;
    }
  }
  return user;
}
