import { getApp } from "firebase-admin/app";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import BillingBtn from "../../../comps/pay_form";

import getUserAuth from "../../../utils/server_user_auth";
import { redirect } from "next/navigation";
import stripe_sdk from "stripe";
import dateFormat from "dateformat";

const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);

const db = admin.firestore();
const Profile = async ({}) => {
  const user = await getUserAuth();

  // console.log("user session verify...", user);
  if (!user) {
    redirect("/expired");
  }
  const { displayName, email, photoURL, role, stripeId } = user;
  // console.log("result profile:", user);
  console.log("profile page.js line 28:", stripeId);
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
            <div className="my-5 px-6">
              {role === "premium" && stripeId ? (
                <BillingBtn
                  action="/api/manage_billing_portal"
                  method="post"
                  inputs={[{ name: "customer", value: stripeId }]}
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
              <a href="/api/session_logout"><h3 className="font-medium text-gray-900 text-left px-6">
                Log out
              </h3></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
