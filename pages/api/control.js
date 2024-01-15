import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";

const db = admin.firestore();
export default async function SessionLogin(req, res) {
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

  const { pid, status, uid } = req.query;

  await db.collection("unproducts").doc(pid).update(
    {
      status,
    },
    { merge: true },
  );
  let products = [];
  const list = await db.collection("unproducts").where("uid", "==", uid).get();

  if (!list.empty) {
    products = list.docs.map((item) => {
      return {
        id: item.id,
        name: item.data().name,
        status: item.data().status,
        wants: item.data().wants,
        createTime: item.data().createTime._seconds,
      };
    });
  }

  console.log("control.js line 28:::", products);

  res.status(200).json({ status: "success", code: 0, data: products });
}
