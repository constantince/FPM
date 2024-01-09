import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "/firebase/admin";
import getUserAuth from "/utils/server_user_auth";
import dateFormat from "dateformat";

const db = admin.firestore();
export default async function Details({ params }) {
  const user = await getUserAuth();
  const { id } = user || {};
  const snapShot = await db.collection("unproducts").doc(params.pid).get();
  if (!snapShot.exists) return "empty";
  const {
    name,
    uid,
    date,
    assets = [],
    link,
    contact,
    reason,
    spentTime,
    desc,
    price,
  } = snapShot.data();

  console.log(assets);
  return (
    <div className="flex flex-col gap-2 mt-5 pb-20">
      <a
        className="m-auto w-full max-w-md text-black rounded-l-md py-2 hover:text-blue-600"
        href="/market"
      >
        <div className="flex flex-row align-middle">
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-2">Back</p>
        </div>
      </a>
      <h1 className="text-lg font-mono text-black-800 text-center font-bold">
        {name}
      </h1>
      <div className="m-auto w-full max-w-md bg-white shadow p-2 border-t-4 border-gray-600 rounded">
        <header className="p-2 border-b flex">
          <div className="flex flex-col">
            <h4 className="text-base font-semibold">Project Link:</h4>
            <h2 className="text-sm font-mono text-blue-600">
              <a href={link}>{link}</a>
            </h2>
          </div>
        </header>
        <div className="flex flex-wrap p-2 w-full gap-4 border-b">
          <div className="flex flex-col w-full ">
            <h4 className="text-base font-semibold">
              Idead And Product Explain:
            </h4>
            <h1 className="text-sm">{desc}</h1>
          </div>
        </div>
        <div className="flex flex-wrap p-2 w-full gap-4 flex-col border-b">
          {/* <div className="flex flex-col w-full">
          <h4 className="text-xs">Days for build</h4>
          <h1 className="text-lg">{spentTime}</h1>
        </div> */}
          <div className="flex flex-col">
            <h4 className="text-base font-semibold">First Launch Date:</h4>
            <h1 className="text-sm">{date}</h1>
          </div>
          <div className="flex flex-col">
            <h4 className="text-base font-semibold">Days spent:</h4>
            <h1 className="text-sm ">{spentTime} days</h1>
          </div>

          <div className="flex flex-col">
            <h4 className="text-base font-semibold">End Pharse:</h4>
            <h1 className="text-sm ">Building</h1>
          </div>
        </div>

        <div className="flex flex-wrap p-2 w-full gap-4  border-b">
          <div className="flex flex-col w-full ">
            <h4 className="text-base font-semibold">Assets To Sell:</h4>
            <h1 className="text-sm">
              {Array.isArray(assets) ? (
                assets.map((as) => (
                  <div
                    key={as}
                    className="center relative inline-block select-none whitespace-nowrap rounded-lg mr-2 bg-blue-500 py-1 px-2 align-baseline font-sans text-xs leading-none text-white"
                  >
                    <div className="mt-px">{as}</div>
                  </div>
                ))
              ) : (
                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg mr-2 bg-blue-500 py-1 px-2 align-baseline font-sans text-xs leading-none text-white">
                  <div className="mt-px">{assets}</div>
                </div>
              )}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap p-2 w-full gap-4  border-b">
          <div className="flex flex-col w-full ">
            <h4 className="text-base font-semibold">Failure Reason:</h4>
            <h1 className="text-sm">{reason}</h1>
          </div>
        </div>

        <div className="flex flex-wrap p-2 w-full gap-4 ">
          <div className="flex flex-col w-full ">
            <h4 className="text-base font-semibold">Sold Price:</h4>
            <h1 className="text-base font-semibold text-red-600">${price}</h1>
          </div>
        </div>
      </div>
      <p className="max-w-md m-auto mt-2 flex items-center text-xs text-gray-500 hover:text-gray-700">
        By clicking the blow button, Contact infomation about this {"project's"}
        author will appear your profolio page.
      </p>
      <footer className="flex max-w-md m-auto justify-end w-full">
        {id ? (
          <a
            href=""
            className="w-auto rounded-sm middle px-3 py-1 none bg-blue-500 font-sans text-xs font-bold uppercase text-white shadow-md hover:cursor-pointer shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            I Want It
          </a>
        ) : (
          <a
            href="/signin"
            className="w-auto rounded-sm middle px-3 py-1 none bg-blue-500 font-sans text-xs font-bold uppercase text-white shadow-md hover:cursor-pointer shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            I Want It
          </a>
        )}
      </footer>
    </div>
  );
}
