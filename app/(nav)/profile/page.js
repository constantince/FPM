import { getApp } from "firebase-admin/app";
import { Timestamp, FieldValue, FieldPath } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import BillingBtn from "../../../comps/pay_form";
import ClientTable from "./comps/ClientTable";

import getUserAuth from "../../../utils/server_user_auth";
import { redirect } from "next/navigation";
// import stripe_sdk from "stripe";
// import dateFormat from "dateformat";
// import ClientBtn from "./comps/ClientBtn";

// const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);

const db = admin.firestore();
const Profile = async ({}) => {
  const user = await getUserAuth();

  // console.log("user session verify...", user);
  if (!user) {
    redirect("/expired");
  }
  const { displayName, email, photoURL, role, stripeId, id, order } = user;
  const col = db.collection("examples");
  const voiceCol= db.collection("voices");
  const exampleSnapShot = await col.where("uid", "==", id);
 
  const scriptVoicesSnapShot = await voiceCol.where("uid", "==", id);


  return (
    <div className="container mx-auto my-20 flex justify-center flex-col items-center">
      <h1>声源</h1>
      <ul>
          <li>测试赛ceshi.wav</li>
      </ul>
      <h1>声音</h1>
      <ul>
          <li>
            <span>测试赛ceshi.wav</span>

            <a>下载</a>
            </li>
      </ul>

      <div class="my-20 self-end">
          <a href="/create" className="mx-auto  rounded-sm middle px-3 py-2 none bg-blue-500 font-sans text-xs font-bold text-white shadow-md hover:cursor-pointer shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  {decodeURIComponent('%2B')} 开始创建音频
          </a>
      </div>
    </div>
  );
};

export default Profile;
