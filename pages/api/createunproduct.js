import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";

const db = admin.firestore();
export default async function SessionLogin(req, res) {
  if (req.method !== "POST") {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }

  const { name, uid, date, assets, link, contact, reason, spentTime, desc } =
    req.body;
  console.log(
    "createunproduct.js line 13:",
    { ...req.body },
    // createTime: FieldValue.serverTimestamp()
    // name,
    // uid,
    // date,
    // assets,
    // link,
    // contact,
    // reason,
    // spentTime,
    // desc,
  );
  console.log("this is req.body", req.body.pid);
  const unproductCol = db.collection("unproducts");
  if (req.body.pid) {
    await unproductCol.doc(req.body.pid).update(
      {
        ...req.body,
        wants: 0,
        status: "listing",
        updateTime: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } else {
    await unproductCol.add({
      ...req.body,
      status: "listing",
      createTime: FieldValue.serverTimestamp(),
    });
  }

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
