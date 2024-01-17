import { getApp } from "firebase-admin/app";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import getUserAuth from "/utils/server_user_auth";
import Image from "next/image";

const db = admin.firestore();
export default async function Landing() {
  const staticDoc = await db.collection("static").doc("landing-info").get();
  const staticData = staticDoc.data();
  // console.log("this is static data", staticData);
  return (
    <section className="pb-12 bg-gray-800 text-white">
      <div className="items-center pt-12 px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
        <div className="justify-center w-full text-left lg:p-10 max-auto">
          <div className="justify-center w-full mx-auto">
            <p className="sm:mt-8 mt-3 sm:px-44 text-4xl sm:text-6xl font-semibold tracking-tighter text-center">
              <span className="underline leading-8 underline-offset-8	decoration-8 decoration-[#8B5CF6]">
                Failed{" "}
              </span>
              Products Matter
            </p>
            <p className="sm:mt-8 mt-2.5  sm:px-72  sm:leading-loose text-lg font-normal tracking-tighter">
              {staticData.content}
            </p>
            {/* <p className="sm:mt-8 mt-2.5  sm:px-72  sm:leading-loose text-lg font-normal tracking-tighter"></p> */}
          </div>
        </div>
      </div>
      <h1 className="text-center sm:mt-8 mt-3 sm:px-44 text-4xl sm:text-4xl underline underline-offset-8 mb-5">
        The Screenshot
      </h1>
      {/* intro image */}
      <Image
        className="block m-auto mb-10"
        src={staticData.screenshot2}
        width={600}
        height={300}
        alt="Picture of the author"
      />
      {/* progress */}
      <h1 className="text-center sm:mt-8 mt-3 sm:px-44 text-4xl sm:text-4xl underline underline-offset-8">
        The Progress
      </h1>
      <div className="flex items-center justify-center my-1">
        <section className="w-full p-6 rounded-lg max-w-2xl">
          <header className="flex items-center"></header>
          <section className="py-1 grid grid-cols-1 gap-x-6">
            <div className="flex items-center py-3">
              <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue-500"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M7 21l3 -4" />
                  <path d="M16 21l-2 -4l-3 -3l1 -6" />
                  <path d="M6 12l2 -3l4 -1l3 3l3 1" />
                </svg>
              </span>
              <div className="space-y-3 flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium text-sm mr-auto text-white flex items-center">
                    {staticData.builddesc}
                  </h4>
                  <span className="px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs">
                    {staticData.progress}%
                  </span>
                </div>
                <div className="overflow-hidden bg-blue-50 h-1.5 rounded-full w-full">
                  <span
                    className="h-full bg-blue-500 w-full block rounded-full"
                    style={{ width: `${staticData.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>

      {/* Form Collection */}
      <h1 className="text-center sm:mt-8 mt-3 sm:px-44 text-4xl sm:text-4xl underline underline-offset-8">
        Would You Like to List Them
      </h1>
      <div className="text-center space-x-4 mt-6">
        <form
          className="m-4 flex justify-center"
          method="post"
          action="api/preemail"
        >
          <input
            required={true}
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            title="email format not correct"
            name="email"
            className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="your@mail.com"
          />
          <button className="px-8 rounded-r-lg bg-blue-500  font-bold p-4 border-blue-500 border-t border-b border-r text-white">
            Get Notify
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-500 mb-10 text-center w-full">
          When our product successfully launches, {"you'll"} be the first to
          receive an email notification.
        </p>
      </div>
    </section>
  );
}
