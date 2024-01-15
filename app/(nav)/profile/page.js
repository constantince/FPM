import { getApp } from "firebase-admin/app";
import { Timestamp, FieldValue, FieldPath } from "firebase-admin/firestore";
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
  const { displayName, email, photoURL, role, stripeId, id, order } = user;

  let products = [];
  const list = await db.collection("unproducts").where("uid", "==", id).get();
  let wantList = {docs: []};
  if(Array.isArray(order)) {
    wantList = await db.collection("unproducts").where(FieldPath.documentId(), 'in', order).get();
  }
  
  // console.log("profile line:27",wantList.docs);
  if( !list.empty) {
    products = list.docs.map(item => {
      return {
        id: item.id,
        name: item.data().name,
        status: item.data().status,
        wants: item.data().wants,
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

            <h1 className="text-lg font-bold px-5 bg-gray-300 text-white mt-10 mb-2">My Failed Products</h1>
            <div className="flex justify-between items-center my-5 px-6">


            <ClientTable products={products} uid={id} />
            
             {/*products.map(item => (
              <a href={`/create/${item.id}`} className="hover:underline hover:text-blue-500">
                {item.data().name} {" created at: "} {dateFormat(new Date(item.data().createTime._seconds * 1000), "yyyy-mm-dd hh:MM:ss")}
              </a>
             ))*/}
            </div>


            {/* hunting list */}
            <h1 className="text-lg font-bold px-5 bg-gray-300 text-white mt-10 mb-2">Contacts</h1>
            <ul className="mb-10">
              {wantList.docs.map(item => (
                <li key={item.id} className="mb-2 flex text-xs text-slate-500 px-5 content-center"><span className="grow text-base font-bold mr-10">{item.data().name}</span>
                  <span className="flex items-center">{item.data().contact}</span></li>
               
              ))}
              </ul>

            <div className="w-full flex justify-end px-5 pb-5">
            <a href="/create" className="mr-5 w-auto rounded-sm middle px-3 py-1 none bg-blue-500 font-sans text-xs font-bold text-white shadow-md hover:cursor-pointer shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                {decodeURIComponent('%2B')} Create
              </a>
              <a href="/api/session_logout" className="font-xs text-slate-300 underline-offset-4">
                Log out  {decodeURIComponent('-%3E')}
              </a>


             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
