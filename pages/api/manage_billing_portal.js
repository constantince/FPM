import stripe_sdk from "stripe";
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);

export default async function ToPortal(req, res) {
  if (req.method === "POST") {
    const { customer } = req.body;

    const session = await stripe.billingPortal.sessions.create({
      customer,
      return_url: "/",
    });

    res.redirect(303, session.url);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
