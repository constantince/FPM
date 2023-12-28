import admin from "/firebase/admin";
import stripe_sdk from "stripe";

const db = admin.firestore();
const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(uid, price_id, req, res) {
  // Create a new checkout session in the subollection inside this users document

  console.log("createCheckoutSession.js line 10", uid, price_id);
  const checkoutSessionRef = await db
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      // replace the price_XXX value with the correct value from your product in stripe.
      price: price_id,
      success_url: `${req.headers.origin}/payment-result?success=true`,
      cancel_url: `${req.headers.origin}/payment-result?canceled=true`,
    });

  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId, url } = snap.data();
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      //   const stripe = await getStripe();
      //   stripe.redirectToCheckout({ sessionId });
      console.log("createCheckoutSession.js line 10", url);
      res.redirect(303, url);
    }
  });
}
