import stripe_sdk from "stripe";
import { getAuth } from "firebase-admin/auth";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "../../firebase";
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const db = admin.firestore();
const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);
// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = "whsec_...";

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
const refreshSubscription = async (subscription) => {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;

  const copy_sub = {
    id: subscription.id,
    priceId: price.id,
    customer: subscription.customer,
    status: subscription.status,
    currency: lineItem.price.currency || null,
    interval: price.recurring.interval || null,
    intervalCount: price.recurring.interval_count || null,
    createdAt: subscription.created,
    periodStartsAt: subscription.current_period_start,
    periodEndsAt: subscription.current_period_end,
    trialStartsAt: subscription.trial_start || null,
    trialEndsAt: subscription.trial_end || null,
  };

  // create subscription
  const sub_ref = db.collection("Subscriptions").doc(subscription.id);
  const target_doc = await sub_ref.get();
  if (target_doc.exists) {
    await sub_ref.update(copy_sub, { merge: true });
  } else {
    await sub_ref.set(copy_sub);
  }
};

// integred stripte info to user
const updateUser = async (session) => {
  // check uid
  const { id, subscription, customer, customer_email } = session;
  const order_ref = db.collection("Orders").doc(id);
  const doc = await order_ref.get();
  if (doc.exists) {
    const uid = doc.data().uid;
    const user_ref = db.collection("Users").doc(uid);
    await user_ref.update(
      {
        subscription,
        customer,
        customer_email,
      },
      { merge: true },
    );
  }
};

// update user permission
const updatePermission = async (subscription) => {
  const { id, customer, status } = subscription;
  const userRef = db
    .collection("User")
    .where("customer", "==", customer)
    .where("scription", "==", id);

  await userRef.update(
    {
      status,
    },
    { merge: true },
  );
};

// directed  awaiting payment  paided   failed
const updateOrder = async (session) => {
  const { id, status, customer, mode } = session;
  return db.collection("Orders").doc(session.id).update({
    id,
    status,
    mode,
    customer,
  });
};

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

const StripeHook = async (request, response) => {
  const payload = request.body;
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
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
      await updateOrder(session);
      await updateUser(session);
      // await fulfillOrder(session);

      break;
    }
    // special payment delay
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;

      // Fulfill the purchase...
      await fulfillOrder(session);

      break;
    }

    // failed
    case "checkout.session.async_payment_failed": {
      const session = event.data.object;

      // Send an email to the customer asking them to retry their order
      await updateOrder(session);

      break;
    }

    // subscription created

    case "customer.subscription.created": {
      const subscription = event.data.object;
      refreshSubscription(subscription);
      updatePermission(subscription);
    }

    // renew or update
    case "customer.subscription.updated": {
      const subscription = event.data.object;

      // Send an email to the customer asking them to retry their order
      refreshSubscription(subscription);
      updatePermission(subscription);

      break;
    }

    // canceled
    case "subscription_schedule.canceled": {
      const session = event.data.object;

      // Send an email to the customer asking them to retry their order
      refreshSubscription(subscription);
      updatePermission(subscription);

      break;
    }

    // end
    case "customer.subscription.deleted": {
    }
  }

  response.status(200).end();
};

export default StripeHook;
