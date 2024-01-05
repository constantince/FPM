import { getApp } from "firebase-admin/app";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import BillingBtn from "../../../comps/pay_form";
import ClientTable from "./comps/ClientTable";

import getUserAuth from "../../../utils/server_user_auth";
import { redirect } from "next/navigation";
import stripe_sdk from "stripe";
import dateFormat from "dateformat";
import ClientBtn from "./comps/ClientBtn";

const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);

const db = admin.firestore();
const Profile = async ({}) => {
  const user = await getUserAuth();

  // console.log("user session verify...", user);
  if (!user) {
    redirect("/expired");
  }
  const { displayName, email, photoURL, role, stripeId, id } = user;

  let products = [];
  const list = await db.collection("unproducts").where("uid", "==", id).get();
 
  if( !list.empty) {
    products = list.docs.map(item => {
      return {
        id: item.id,
        name: item.data().name,
        status: item.data().status,
        want: item.data().want,
        createTime: item.data().createTime._seconds
      }
      
    })
  }
  // console.log("list docs",products[0].data().createTime._seconds);
  // console.log("result profile:", user);
  console.log("profile page.js line 28:", stripeId);
  return (
    <div className="container mx-auto my-60">
      <div>
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
          <div className="flex justify-center">
            <img
              src={photoURL||"https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"}
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
              {/*role === "premium" && stripeId ? (
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
              ) : null*/}
            </div>
            <div className="flex justify-between items-center my-5 px-6">


      <ClientTable products={products} />
             {/*products.map(item => (
              <a href={`/create/${item.id}`} className="hover:underline hover:text-blue-500">
                {item.data().name} {" created at: "} {dateFormat(new Date(item.data().createTime._seconds * 1000), "yyyy-mm-dd hh:MM:ss")}
              </a>
             ))*/}
            </div>
            <div className="w-full flex justify-end px-5 pb-5">
            <a href="/create" className="mr-5 w-auto rounded-sm middle px-3 py-1 none bg-blue-500 font-sans text-xs font-bold uppercase text-white shadow-md hover:cursor-pointer shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                create
              </a>
              <a href="/api/session_logout" className="font-sm text-slate-300 underline-offset-4">
                Log out
              </a>


             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
