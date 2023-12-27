import stripe_sdk from "stripe";
import { getAuth } from "firebase-admin/auth";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const db = admin.firestore();
const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);
// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// console.log(
//   "secretKey:",
//   process.env.STRIPE_SECRET_KEY,
//   "endpointSecret:",
//   endpointSecret,
// );
// fullfill the Order
const fulfillOrder = async (session) => {
  const status = session.payment_status;
  // await updateOrder(session.id, status);
  // await createSubscription(session.subscription, status);
  // await updateUser(session.id, status, session.subscription);
  // TODO: fill me in
  console.log("Order Fulfilled ", session.id);
};

// ship subscription docs to firebase
const refreshSubscription = async (uid, subscription) => {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;

  const copy_sub = {
    id: subscription.id,
    priceId: price.id,
    customer: subscription.customer,
    status: subscription.status,
    currency: subscription.currency || null,
    interval: price.recurring.interval || null,
    intervalCount: price.recurring.interval_count || null,
    createdAt: subscription.created,
    periodStartsAt: subscription.current_period_start,
    periodEndsAt: subscription.current_period_end,
    trialStartsAt: subscription.trial_start || null,
    trialEndsAt: subscription.trial_end || null,
  };

  // create subscription
  const sub_ref = db.collection("Subscriptions").doc(uid);
  await sub_ref.set(copy_sub);

  return subscription.customer;
};

// integred stripte info to user
const updateUser = async (session, uid) => {
  // check uid
  const { id, subscription, customer, customer_email, status } = session;

  const user_doc_ref = db.collection("Users").doc(uid);
  await user_doc_ref.update(
    {
      subscription,
      customer_email,
      customer,
    },
    { merge: true },
  );
};

// update user permission
const updatePermission = async (subscription) => {
  const userRef = await db
    .collection("Users")
    .where("customer", "==", subscription.customer)
    .get();
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;
  const copy_data = {
    subInfo: {
      id: subscription.id,
      status: subscription.status,
      interval: price.recurring.interval || null,
      intervalCount: price.recurring.interval_count || null,
      createdAt: subscription.created,
      periodStartsAt: subscription.current_period_start,
      periodEndsAt: subscription.current_period_end,
      trialStartsAt: subscription.trial_start || null,
      trialEndsAt: subscription.trial_end || null,
    },
  };
  if (!userRef.exists) {
    return console.log("hook_for_stripe.js line 91:", "userRef not exists!");
  }

  console.log("copy data", userRef.docs[0].id);
  const sub_col_ref = db.doc(`Users/${userRef.docs[0].id}`);

  if (sub_col_ref) {
    sub_col_ref.update(copy_data, { merge: true });
  } else {
    sub_col_ref.set(copy_data);
  }
};

// directed  awaiting payment  paided   failed
const updateOrder = async (session) => {
  const { id, status, mode, uid } = session;
  const doc = db.collection("Orders").doc(session.id);
  const snapshot = await doc.get();
  await doc.update({
    id,
    status,
    mode,
  });
  return snapshot.data().uid;
};

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

const buffer = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};

const StripeHook = async (request, response) => {
  // console.log("event from stripe are coming****************************");
  const rawBody = await buffer(request);
  const sig = request.headers["stripe-signature"];
  // console.log("rawBody:", rawBody);
  // console.log("sig:", sig);
  let event = null;
  // console.log("event type::::", event.type);
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // Save an order in your database, marked as 'awaiting payment'

      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      console.log("checkout.session.completed");
      const uid = await updateOrder(session);
      await updateUser(session, uid);
      // await fulfillOrder(session);

      break;
    }

    // special payment delay
    case "checkout.session.async_payment_succeeded": {
      console.log("checkout.session.async_payment_succeeded");
      const session = event.data.object;

      // Fulfill the purchase...
      await fulfillOrder(session);

      break;
    }

    // failed
    case "checkout.session.async_payment_failed": {
      console.log("checkout.session.async_payment_failed");
      const session = event.data.object;

      // Send an email to the customer asking them to retry their order
      await updateOrder(session);

      break;
    }

    // subscription created

    case "customer.subscription.created": {
      console.log("customer.subscription.created");
      const subscription = event.data.object;
      // await refreshSubscription(subscription);
      await updatePermission(subscription);
      break;
    }

    // renew or update
    case "customer.subscription.updated": {
      console.log("customer.subscription.updated");
      const subscription = event.data.object;

      // Send an email to the customer asking them to retry their order
      // refreshSubscription(subscription);
      await updatePermission(subscription);

      break;
    }

    // canceled
    case "subscription_schedule.canceled": {
      console.log("subscription_schedule.canceled");
      const subscription = event.data.object;

      // Send an email to the customer asking them to retry their order
      // refreshSubscription(subscription);
      await updatePermission(subscription);

      break;
    }

    // end
    case "customer.subscription.deleted": {
      console.log("customer.subscription.deleted");
      const subscription = event.data.object;
      // refreshSubscription(subscription);
      await updatePermission(subscription);
      break;
    }
  }

  response.status(200).end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default StripeHook;
