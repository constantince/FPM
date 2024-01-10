import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";

const db = admin.firestore();
export default async function Want(req, res) {
  if (req.method !== "GET") {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }
  const idToken = req.cookies.session;
  if (typeof idToken !== "string")
    return res.status(403).json({
      code: 1,
      message: "Insufficient auth",
    });

  // user info
  const user = await getAuth().verifySessionCookie(idToken).catch(console.log);

  if (!user) {
    res.redirect(303, `${req.headers.origin}/signin`);
    return;
  }

  //other's product id
  const { pid, contact } = req.query;
  console.log("want.js line 21:", user, req.query);

  await db
    .collection("users")
    .doc(user.uid)
    .update({
      order: FieldValue.arrayUnion(req.query.pid),
    });

  // add a want
  await db
    .collection("unproducts")
    .doc(req.query.pid)
    .update({
      wants: FieldValue.increment(1),
    });

  res.redirect(303, `${req.headers.origin}/profile`);
}
