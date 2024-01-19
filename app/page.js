import admin from "/firebase/admin";
import Image from "next/image";

const db = admin.firestore();
const staticDoc = await db.collection("static").doc("landing-info").get();
const staticData = staticDoc.data();

export default async function Landing() {
  return (
    <>
      {/* top banner */}
      <div className="bg-gray-900 w-full h-full text-white">
        <header className="flex justify-end mb-10 p-5">
          <a
            href="/signin"
            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Login
          </a>
        </header>
        <section className="flex flex-wrap md:flex-wrap items-center justify-center">
          <div className="left pl-20 grow">
            <p className="sologn text-6xl font-bold">Failed Products Matter</p>
            <p className="descriptions text-xl mt-5 mb-5 max-w-screen-sm">
              List your unsuccessful products for sale, and give them a chance
              for a new life or to be repurposed by someone else.
            </p>
            <div className="flex justify-start items-center">
              <a
                href="/create"
                className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                List Mine
              </a>
              <a
                href="/market"
                className="flex items-center hover:text-gray-500"
              >
                Explore Products{" "}
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
              </a>
            </div>
          </div>
          <div className="right text-center">
            <img alt="" className="w-3/4 block" src={staticData.hero} />
          </div>
        </section>
      </div>

      {/* intro */}
      <div className="bg-gray-100 w-full h-full text-gray-500">
        <div className="h-28"></div>
        <h1 className="text-4xl text-center font-bold ">What Can You Sell?</h1>
        {/* <p className="text-sm text-left w-2/5 mx-auto mt-2">
            list your failed product for sellinglist your failed product for
            sellinglist your failed product for sellinglist your faile
          </p> */}
        <section className="mt-40">
          <ul className="flex px-20">
            <li className="inline-flex grow flex-col items-center justify-center mx-10">
              <div className="text-lg font-bold feature-icon bg-gray-700 rounded-md justify-center rounded-custom text-black w-14 h-14 flex items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="text-lg font-bold text-white"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"></path>
                </svg>
              </div>
              <div className="text-center text-lg font-bold">Code</div>
              {/* <p className="text-left text-sm">
                  apps, websites, or other type of code you can sell it all.
                </p> */}
            </li>
            <li className="inline-flex grow flex-col items-center justify-center mx-10">
              <div className="text-lg font-bold feature-icon bg-red-500 rounded-md justify-center rounded-custom text-black w-14 h-14 flex items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-lg font-bold text-white"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z"></path>
                  </g>
                </svg>
              </div>
              <div className="text-center text-lg font-bold">Assets</div>
              {/* <p className="text-left text-sm">
                  app, website, or other type of code you can sell it all.
                </p> */}
            </li>
            <li className="inline-flex grow flex-col items-center justify-center mx-10">
              <div className="text-lg font-bold feature-icon bg-blue-700 rounded-md justify-center rounded-custom text-black w-14 h-14 flex items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 18 18"
                  className="text-lg font-bold text-white"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="text-lg font-bold text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path>
                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
                  </svg>
                </svg>
              </div>
              <div className="text-center text-lg font-bold">Domain</div>
              {/* <p className="text-left text-sm">
                  a failure site domain can be list and sell.
                </p> */}
            </li>
            <li className="inline-flex grow flex-col items-center justify-center mx-10">
              <div className="text-lg font-bold feature-icon bg-gray-700 rounded-md justify-center rounded-custom text-black w-14 h-14 flex items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="text-lg font-bold text-white"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256.12 245.96c-13.25 0-24 10.74-24 24 1.14 72.25-8.14 141.9-27.7 211.55-2.73 9.72 2.15 30.49 23.12 30.49 10.48 0 20.11-6.92 23.09-17.52 13.53-47.91 31.04-125.41 29.48-224.52.01-13.25-10.73-24-23.99-24zm-.86-81.73C194 164.16 151.25 211.3 152.1 265.32c.75 47.94-3.75 95.91-13.37 142.55-2.69 12.98 5.67 25.69 18.64 28.36 13.05 2.67 25.67-5.66 28.36-18.64 10.34-50.09 15.17-101.58 14.37-153.02-.41-25.95 19.92-52.49 54.45-52.34 31.31.47 57.15 25.34 57.62 55.47.77 48.05-2.81 96.33-10.61 143.55-2.17 13.06 6.69 25.42 19.76 27.58 19.97 3.33 26.81-15.1 27.58-19.77 8.28-50.03 12.06-101.21 11.27-152.11-.88-55.8-47.94-101.88-104.91-102.72zm-110.69-19.78c-10.3-8.34-25.37-6.8-33.76 3.48-25.62 31.5-39.39 71.28-38.75 112 .59 37.58-2.47 75.27-9.11 112.05-2.34 13.05 6.31 25.53 19.36 27.89 20.11 3.5 27.07-14.81 27.89-19.36 7.19-39.84 10.5-80.66 9.86-121.33-.47-29.88 9.2-57.88 28-80.97 8.35-10.28 6.79-25.39-3.49-33.76zm109.47-62.33c-15.41-.41-30.87 1.44-45.78 4.97-12.89 3.06-20.87 15.98-17.83 28.89 3.06 12.89 16 20.83 28.89 17.83 11.05-2.61 22.47-3.77 34-3.69 75.43 1.13 137.73 61.5 138.88 134.58.59 37.88-1.28 76.11-5.58 113.63-1.5 13.17 7.95 25.08 21.11 26.58 16.72 1.95 25.51-11.88 26.58-21.11a929.06 929.06 0 0 0 5.89-119.85c-1.56-98.75-85.07-180.33-186.16-181.83zm252.07 121.45c-2.86-12.92-15.51-21.2-28.61-18.27-12.94 2.86-21.12 15.66-18.26 28.61 4.71 21.41 4.91 37.41 4.7 61.6-.11 13.27 10.55 24.09 23.8 24.2h.2c13.17 0 23.89-10.61 24-23.8.18-22.18.4-44.11-5.83-72.34zm-40.12-90.72C417.29 43.46 337.6 1.29 252.81.02 183.02-.82 118.47 24.91 70.46 72.94 24.09 119.37-.9 181.04.14 246.65l-.12 21.47c-.39 13.25 10.03 24.31 23.28 24.69.23.02.48.02.72.02 12.92 0 23.59-10.3 23.97-23.3l.16-23.64c-.83-52.5 19.16-101.86 56.28-139 38.76-38.8 91.34-59.67 147.68-58.86 69.45 1.03 134.73 35.56 174.62 92.39 7.61 10.86 22.56 13.45 33.42 5.86 10.84-7.62 13.46-22.59 5.84-33.43z"></path>
                </svg>
              </div>
              <div className="text-center text-lg font-bold">Others</div>
              {/* <p className="text-left text-sm">
                  social medal persona or media or the relvent asset could be
                  sell.
                </p> */}
            </li>
          </ul>
        </section>
      </div>

      {/* FAQ */}
      <div className="bg-white w-full h-full text-gray-500">
        <div className="h-28"></div>
        <h1 className="text-4xl font-bold text-center mb-10">FAQ</h1>
        <p className="text-black text-xl text-center mb-10">
          Frequently Asked Questions
        </p>
        {/* <p className="w-2/4 mx-auto my-5 mb-10">
            Conveniently mesh cooperative services via magnetic outsourcing.
            Dynamically grow value whereas accurate e-commerce vectors.
          </p> */}
        <ul className="w-2/4 mx-auto my-5">
          <li className="my-5">
            <p className="text-xl font-bold">
              <b className="text-blue-500 text-2xl">1</b>. What type of product
              can you sell
            </p>
            <p className="text-sm py-5">
              All types of products can be listed and sold here, including
              mobile apps, websites, and other types of digital products.
            </p>
          </li>
          <li className="my-5">
            <p className="text-xl font-bold">
              <b className="text-blue-500 text-2xl">2</b>. Can you sell a idea?
            </p>
            <p className="text-sm py-5">
              Please note that only products that have been launched can be
              listed here. This means that you cannot sell an idea; you must
              have already built something!
            </p>
          </li>
          <li className="my-5">
            <p className="text-xl font-bold">
              <b className="text-blue-500 text-2xl">3</b>.How to I pay to the
              author of the owner.
            </p>
            <p className="text-sm py-5">
              To connect with the seller, go to the detail page and click the{" "}
              <span className="text-blue-400">I want</span> button. Then, the
              seller{"'"}s contact information will appear on your profile page.
              You can contact them at any time.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}
