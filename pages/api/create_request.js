import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";

const db = admin.firestore();
export default async function SessionLogin(req, res) {
  if (req.method !== "POST") {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }

  const unproductCol = db.collection("voices");
  await unproductCol.add({
    ...req.body,
    status: "pending",
    createTime: FieldValue.serverTimestamp(),
  });

  //   const doc = await feedInfo.get();
  //   if (doc.exists) {
  //     await feedInfo.update({
  //       message: FieldValue.arrayUnion(message),
  //     });
  //   } else {
  //     await feedInfo.set({
  //       message: [message],
  //     });
  //   }
  res.redirect(303, `${req.headers.origin}/success`);
}
