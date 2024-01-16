import { NextResponse } from "next/server";
// import firebase from "/firebase/index;
// import { getAuth } from "firebase/auth";

// import admin from "/pages/firebase";
// const db = admin.firestore();

// const checkAuthAndStatus = async (session) => {

//   let result = { logged: null, vip: null };
//   const user = await getAuth().verifyIdToken(idToken).catch(console.log);
//   const docs = await db.collection("data").where("uid", "==", user.uid).get();

//   const currentUser = await getAuth().verifySessionCookie(
//     session,
//     true /** checkRevoked */,
//   );
//   if (!currentUser) {
//     result.logged = false;
//     return result;
//   }
//   const uid = currentUser.uid;
//   // load user information
//   const userDoc = await db.collection("Users").col(uid).get();

//   const { status } = userDoc.docs.data();

//   if (status !== "") {
//     result.vip = true;
//     return result;
//   }
// };
// pages collection that your want show to all customer currently.
const pages_discard = ["/pricing"];

export function middleware(request) {
  // console.log("request", request.nextUrl.pathname);
  // const allCookies = request.cookies.getAll(); // also  include cookie with http only property.
  // console.log("all cookies::", allCookies);
  const vip = request.cookies.has("vip");
  const logged = request.cookies.has("session");
  // console.log("vip", vip);
  // console.log("logged", logged);
  const nextPage = NextResponse.next();

  // only landing page mode for preview test
  // if (request.nextUrl.pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // discard temporaty the page you do not want useContext
  if (pages_discard.indexOf(request.nextUrl.pathname) > -1) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  //no auth user can not view these router
  if (
    /^\/(profile|transcription|feedback|create)/g.test(request.nextUrl.pathname)
  ) {
    if (logged) return nextPage;
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // logged user cannot view signin or signup page
  if (/^\/(signin|signup)$/g.test(request.nextUrl.pathname)) {
    if (!logged) return nextPage;
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return nextPage;
}
