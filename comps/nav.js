"use client";
import { useContext } from "react";
import { UserContext } from "../utils/user-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Market", href: "/market" },
  { name: "Contact", href: "/contact" },
];

// console.log("what are your type...");

export default function Nav() {
  const pathname = usePathname();
  console.log(pathname);
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
  const { uid, role, email, photoURL } = user || {};
  console.log("uid in nav:::", user);
  return (
    <>
      <nav className="fixed top-0 left-0 z-20 w-full border-gray-200 py-2.5 px-6 sm:px-4">
        <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
          <div className="mt-2 sm:mt-0 sm:flex md:order-2">
            {!uid ? (
              <>
                {/* Login Button */}
                <a
                  href="/signin"
                  type="button"
                  className="rounde mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  type="button"
                  className="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg"
                >
                  Register
                </a>
                {/* Register Button */}
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <a href="/profile">
                <img
                  alt="tania andrew"
                  src={
                    photoURL ||
                    "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"
                  }
                  className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
                  data-popover-target="profile-menu"
                />
              </a>
            )}
          </div>

          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`block rounded py-2 pl-3 pr-4  md:bg-transparent md:p-0 text-${
                      item.href == pathname ? "blue" : "gray"
                    }-700`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
