
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // req.body contains the POST parameters
    const { priceId } = req.body;
// console.log(req.body.priceId)
try {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/fail`,
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
} catch (err) {
  res.status(err.statusCode || 500).json(err.message);
}
    // rest of your code...
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }

};

// export default handler;