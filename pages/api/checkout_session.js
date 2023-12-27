import stripe_sdk from "stripe";
import { getAuth } from "firebase-admin/auth";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";

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
      // Create Checkout Sessions from body params.
      // https://stripe.com/docs/api/checkout/sessions/object   session description
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: price_id,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/payment-result?success=true`,
        cancel_url: `${req.headers.origin}/payment-result?canceled=true`,
      });

      console.log("sesssion successed...", session);

      // save the session to database
      // await assignCustomerToUser(uid, session.customer);
      // const order = await createOrder(uid, session.id, session.status);

      if (session) {
        res.redirect(303, session.url);
        return;
      }
      res.status(500).json({ code: 1, message: "something went wrong", order });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
