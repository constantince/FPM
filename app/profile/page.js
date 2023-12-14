import { getAuth } from "firebase-admin/auth";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "../firebase";
import BillingBtn from "../../comps/pay_form";
import { cookies } from "next/headers";
import NoAuth from "./no_auth";

const Profile = async () => {
  const idToken = (cookies().get("token") || {}).value;
  if (typeof idToken !== "string") return <NoAuth />;
  const db = admin.firestore();
  const user = await getAuth().verifyIdToken(idToken).catch(console.log);
  // search user collection
  const user_docs = await db.collection("Users").doc(user.uid).get();

  const { displayName, email, photoURL, vip, subscription } = user_docs.data();

  const sub_id = subscription[0];

  let customer = null;

  if (vip === 1) {
    // subscribed user
    // search subscription_docs
    const subscription_docs = await db
      .collection("Subscriptions")
      .doc(sub_id)
      .get();

    if (doc.exists) {
      customer = subscription_docs.data().customer;
    }
  }

  return (
    <div className="container mx-auto my-60">
      <div>
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
          <div className="flex justify-center">
            <img
              src={photoURL}
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>
          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">
              {displayName}
            </h1>
            <p className="text-center text-sm text-gray-400 font-medium">
              {email}
            </p>
            <p>
              <span></span>
            </p>
            <div className="my-5 px-6">
              {customer && (
                <BillingBtn
                  action="/api/manage_billing_portal"
                  method="post"
                  name="customer"
                  value={customer}
                >
                  <input
                    type="submit"
                    className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
                    value="Manage bill and subscription"
                  />
                </BillingBtn>
              )}
            </div>
            <div className="flex justify-between items-center my-5 px-6">
              <a
                href
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                My Tasks
              </a>
            </div>
            <div className="w-full">
              <h3 className="font-medium text-gray-900 text-left px-6">
                Recent Subscriptions
              </h3>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                <a
                  href="#"
                  className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                >
                  <img
                    src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                    alt=""
                    className="rounded-full h-6 shadow-md inline-block mr-2"
                  />
                  Updated his status
                  <span className="text-gray-500 text-xs">24 min ago</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
