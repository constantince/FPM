const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { getAuth } from "firebase-admin/auth";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "../firebase";

const db = admin.firestore();
const col = db.collection("data");
// 0 paying 1 success 2 failed
async function createOrder(uid, pay_id) {
  return col.doc(pay_id).set({
    uid,
    pay_id,
    status: 1,
    create_time: FieldValue.serverTimestamp(),
  });
}

export default async function handler(req, res) {
  // confirm the uid
  const idToken = req.cookies.token;
  if (typeof idToken !== "string") {
    // no loged user;
    return res.status(403).json({
      code: 1,
      message: "Insufficient auth",
    });
  }

  const user = await getAuth().verifyIdToken(idToken).catch(console.log);
  if (!user) {
    // no auth user
    return res.status(401).json({
      code: 1,
      message: "Not a verified user",
    });
  }
  if (req.method === "POST") {
    try {
      const { price_id } = req.body;
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
        mode: "payment",
        success_url: `${req.headers.origin}/payment-result?success=true`,
        cancel_url: `${req.headers.origin}/payment-result?canceled=true`,
      });
      // save the session to database
      const order = createOrder(user.uid, session.id);
      if (order) {
        res.redirect(303, session.url);
        return;
      }
      res.status(200).json({ code: 1, message: "something went wrong", order });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
