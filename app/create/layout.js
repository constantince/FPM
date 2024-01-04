import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import getUserAuth from "/utils/server_user_auth";
import Link from "next/link";

export default async function RootLayout({ children }) {
  const user = await getUserAuth();
  //   console.log("user session verify...", user);
  const v = user ? { uid: user.id, email: user.email, role: user.role } : null;

  return (
    <div className="flex items-center justify-center bg-[#fbfbfb]">
      <div className="">
        <p className="mt-4 flex items-center text-xs text-gray-500 hover:text-gray-700 mb-10">
          Pleas note: Your product must be launded at once to sell.
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-1 h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </p>
        <form method="post" action="/api/createunproduct">
          {children}
          <Link
            href="/profile"
            className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer"
          >
            Cancel
          </Link>
          <input
            type="submit"
            value="Submit"
            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer"
          />
        </form>
        <a href="">
          <p className="mt-4 flex items-center text-xs text-gray-500 hover:text-gray-700">
            Read the latest issue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-1 h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </p>
        </a>
      </div>
    </div>
  );
}
