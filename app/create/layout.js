import admin from "/firebase/admin";
import { getAuth } from "firebase-admin/auth";
import getUserAuth from "/utils/server_user_auth";

export default async function RootLayout({ children }) {
  const user = await getUserAuth();
  //   console.log("user session verify...", user);
  const v = user ? { uid: user.id, email: user.email, role: user.role } : null;

  return (
    <div className="flex h-screen items-center justify-center bg-[#fbfbfb]">
      <div className="">
        {children}

        {/* <a href="">
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
        </a> */}
      </div>
    </div>
  );
}
