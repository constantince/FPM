import { getApp } from "firebase-admin/app";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import getUserAuth from "/utils/server_user_auth";
const db = admin.firestore();

export default async function Landing() {
  const user = await getUserAuth();
  const { displayName, email, photoURL, role, stripeId, id } = user || {};
  console.log(user);
  let auth = "anonymous";
  if (id) auth = "registed user";
  if (role === "premium") auth = "paid user";
  return (
    <p className="my-40 mx-auto text-center">
      Your status in the web app is: <a href="/profile">{auth}</a>
    </p>
  );
}
