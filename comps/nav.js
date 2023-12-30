"use client";
import { useContext } from "react";
import { UserContext } from "../utils/user-provider";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

// console.log("what are your type...");

export default function Nav() {
  // let user = null;
  // if (sessionCookie) {
  //   console.log("thhis is session cookie in nav", sessionCookie);
  //   const token = await getAuth()
  //     .verifySessionCookie(sessionCookie, true /** checkRevoked */)
  //     .catch((ex) => null);
  //   console.log("this is token", token);
  //   if (token) {
  //     // console.log("error in nav", sessionCookie, token);
  //     const db = admin.firestore();
  //     // search user collection
  //     const user_docs = await db.collection("Users").doc(token.sub).get();

  //     user = user_docs.data();
  //   }
  // }

  // const { data, isLoading, error } = useGetUser("test.");
  const user = useContext(UserContext);
  // console.log("user in nav", user);
  const { uid, role, email } = user || {};
  return (
    <>
      <nav className="bg-white-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <Link href="/">
            <div className="text-indigo-500 md:order-1">Podtransfer</div>
          </Link>
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              {role !== "premium" && (
                <li className="md:px-4 md:py-2 text-indigo-500">
                  <a href="/pricing">Pricing</a>
                </li>
              )}
              {uid && (
                <li className="md:px-4 md:py-2 text-indigo-500">
                  <a href="/feedback">Feedback</a>
                </li>
              )}
            </ul>
          </div>
          <div className="order-2 md:order-3">
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {uid ? (
                <a href="/profile">{user.email}</a>
              ) : (
                <a href="/signin">Sign In</a>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
