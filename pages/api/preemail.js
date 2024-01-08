import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";

const db = admin.firestore();
export default async function SessionLogin(req, res) {
  if (req.method !== "POST") {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }

  const { email } = req.body;

  const feedInfo = db.collection("preusers");
  await feedInfo.add({
    email,
  });

  res.redirect(303, `${req.headers.origin}/success/thankyou`);
}
