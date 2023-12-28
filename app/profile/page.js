import { getAuth } from "firebase-admin/auth";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import BillingBtn from "../../comps/pay_form";
import { cookies } from "next/headers";
import getUserAuth from "../../utils/server_user_auth";
import { redirect } from "next/navigation";
import stripe_sdk from "stripe";
import dateFormat from "dateformat";
import Card from "./cards";

const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);

const db = admin.firestore();
const Profile = async ({}) => {
  const sessionCookie = (cookies().get("session") || {}).value;
  const user = await getUserAuth(sessionCookie);

  console.log("user session verify...", user);
  if (!user) {
    redirect("/expired");
    return;
  }
  const {
    displayName,
    email,
    photoURL,
    vip,
    subscription,
    customer,
    subInfo = {},
  } = user;
  console.log("result profile:", user);

  // let customer = null;
  let d_string = null;
  let sub_records = [];
  if (customer) {
    // subscribed user
    // search subscription_docs
    // const subscription_docs = await db.collection("Subscriptions").doc(sub_id);
    d_string = dateFormat(new Date(subInfo.periodEndsAt * 1000), "yyyy-mm-dd");
    sub_records = await stripe.subscriptions.list({
      customer,
      status: "active",
      limit: 10,
    });
  }
  console.log("customer:::", customer);
  return (
    <div className="container mx-auto my-60">
      <Card />
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
            {d_string && (
              <p className="text-center text-sm text-gray-400 font-medium">
                subscription end date: {d_string}
              </p>
            )}
            <p>
              <span></span>
            </p>
            <div className="my-5 px-6">
              {subInfo.status === "active" && customer ? (
                <BillingBtn
                  action="/api/manage_billing_portal"
                  method="post"
                  inputs={[{ name: "customer", value: customer }]}
                >
                  <input
                    type="submit"
                    className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
                    value="Manage bill and subscription"
                  />
                </BillingBtn>
              ) : null}
            </div>
            <div className="flex justify-between items-center my-5 px-6">
              <a
                href="/transcription"
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                My Tasks
              </a>
            </div>
            <div className="w-full">
              <h3 className="font-medium text-gray-900 text-left px-6">
                Recent Subscriptions
              </h3>
              {Array.isArray(sub_records.data) &&
                sub_records.data.map((item) => (
                  <div
                    className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm"
                    key={item.id}
                  >
                    <a
                      href="#"
                      className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
                    >
                      <img
                        src="https://avatars0.githubusercontent.com/u/35900628?v=4"
                        alt=""
                        className="rounded-full h-6 shadow-md inline-block mr-2"
                      />
                      {item.object} Created at{" "}
                      <span className="text-gray-500 text-xs">
                        {dateFormat(
                          new Date(item.created * 1000),
                          "yyyy-mm-dd HH:MM:ss",
                        )}
                      </span>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
