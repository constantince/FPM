import stripe_sdk from "stripe";
import { getAuth } from "firebase-admin/auth";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import { createCheckoutSession } from "/stripe/createCheckoutSession";

const db = admin.firestore();
const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);
const col = db.collection("Orders");
// awaiting payment  paided   failed
async function createOrder(uid, session_id, status) {
  return col.doc(session_id).set({
    uid,
    session_id,
    status,
    create_time: FieldValue.serverTimestamp(),
  });
}
// async function assignCustomerToUser(uid, customer) {
//   return db.collection("Users").doc(uid).update({
//     customer,
//   });
// }

export default async function handler(req, res) {
  // confirm the uid
  if (req.method === "POST") {
    try {
      const { price_id, uid } = req.body;

      createCheckoutSession(uid, price_id, req, res);
      return;
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
