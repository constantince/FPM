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
export function middleware(request) {
  console.log("request", request.nextUrl.pathname);
  // const allCookies = request.cookies.getAll(); // also  include cookie with http only property.
  // console.log("all cookies::", allCookies);
  const vip = request.cookies.has("vip");
  const logged = request.cookies.has("session");
  console.log("vip", vip);
  console.log("logged", logged);
  const nextPage = NextResponse.next();
  // // vip customer do not need to view this page
  if (request.nextUrl.pathname.startsWith("/pricing")) {
    if (logged) {
      if (!vip) {
        return nextPage;
      } else {
        return NextResponse.rewrite(new URL("/profile", request.url));
      }
    }
  }

  //no auth user can not view these router
  if (/^\/(profile|transcription)/g.test(request.nextUrl.pathname)) {
    if (logged) return nextPage;
    return NextResponse.rewrite(new URL("/signin", request.url));
  }

  // logged user cannot view signin or signup page
  if (/^\/(signin|signup)$/g.test(request.nextUrl.pathname)) {
    if (!logged) return nextPage;
    return NextResponse.rewrite(new URL("/profile", request.url));
  }

  return nextPage;
}
