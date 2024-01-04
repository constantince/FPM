import Link from "next/link";
import getUserAuth from "/utils/server_user_auth";
import admin from "/firebase/admin";
const db = admin.firestore();
export default async function Index({ params }) {
  const user = await getUserAuth();
  const { id } = user || {};
  const pid = params.pid ? params.pid[0] : undefined;
  console.log("create page line 7:", id, pid);
  let formDefaultValue = { assets: [] };
  if (pid) {
    const snapShot = await db.collection("unproducts").doc(pid).get();
    if (snapShot.exists) {
      formDefaultValue = snapShot.data();
    }
  }
  return (
    <>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Your project name:
        </label>
        <input
          type="name"
          name="name"
          id="name"
          require="true"
          defaultValue={formDefaultValue.name}
          placeholder="ChatGpt"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <input
        type="text"
        value={id}
        name="uid"
        className="hidden"
        readOnly={true}
      />
      <input
        type="text"
        value={pid}
        name="pid"
        className="hidden"
        readOnly={true}
      />
      <div className="mb-5">
        <label
          htmlFor="desc"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Say something about your idea and product:
        </label>
        <textarea
          rows={4}
          name="desc"
          id="desc"
          placeholder="Type your message"
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          defaultValue={formDefaultValue.desc}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="link"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Your project link:
        </label>
        <input
          type="link"
          name="link"
          id="link"
          placeholder="bac.com"
          defaultValue={formDefaultValue.link}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="date"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          First Launch Date:
        </label>
        <input
          type="date"
          name="date"
          id="date"
          defaultValue={formDefaultValue.date}
          placeholder="example@domain.com"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="spentTime"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          How much time spent to it:
        </label>
        <input
          type="spentTime"
          name="spentTime"
          id="spentTime"
          defaultValue={formDefaultValue.spentTime}
          placeholder="example@domain.com"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="reason"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Failure reason for this:
        </label>
        <textarea
          rows={4}
          name="reason"
          id="reason"
          placeholder="Type your message"
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          defaultValue={formDefaultValue.reason}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="assets"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          What is the price are you going to sell it:
        </label>
        <input
          type="number"
          name="price"
          id="price"
          defaultValue={formDefaultValue.price}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="asset"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          What type of assets include in this project
        </label>
        <div className="max-w-lg mx-auto">
          <fieldset className="mb-5 flex">
            <legend className="sr-only">Checkbox variants</legend>
            <div className="flex items-center items-start mb-4">
              <input
                id="checkbox-1"
                aria-describedby="checkbox-1"
                type="checkbox"
                name="assets"
                value="code"
                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                defaultChecked={formDefaultValue.assets.includes("code")}
              />
              <label
                htmlFor="checkbox-1"
                className="text-sm ml-3 font-medium text-gray-900"
              >
                code
              </label>
            </div>
            <div className="flex items-start items-center mb-4">
              <input
                id="checkbox-2"
                aria-describedby="checkbox-2"
                type="checkbox"
                name="assets"
                value="domain"
                defaultChecked={formDefaultValue.assets.includes("domain")}
                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
              />
              <label
                htmlFor="checkbox-2"
                className="text-sm ml-3 font-medium text-gray-900"
              >
                domain
              </label>
            </div>
            <div className="flex items-start items-center mb-4">
              <input
                id="checkbox-3"
                aria-describedby="checkbox-3"
                type="checkbox"
                name="assets"
                value="data"
                defaultChecked={formDefaultValue.assets.includes("data")}
                className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
              />
              <label
                htmlFor="checkbox-3"
                className="text-sm ml-3 font-medium text-gray-900"
              >
                data
              </label>
            </div>
            <div className="flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="shipping-2"
                  aria-describedby="shipping-2"
                  type="checkbox"
                  name="sellPrice"
                  value="social-accounts"
                  defaultChecked={formDefaultValue.assets.includes(
                    "social-accounts",
                  )}
                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                />
              </div>
              <div className="text-sm ml-3">
                <label
                  htmlFor="shipping-2"
                  className="font-medium text-gray-900"
                >
                  Social accounts
                </label>
                {/* <div className="text-gray-500">
                  <span className="font-normal text-xs">
                    For orders shipped from Flowbite from{" "}
                    <span className="font-medium">€ 25</span> in books or{" "}
                    <span>€ 29</span> on other categories
                  </span>
                </div> */}
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="acceemailsts"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          How to concat you:
        </label>
        <input
          type="contact"
          name="contact"
          id="contact"
          defaultValue={formDefaultValue.contact}
          placeholder="example@domain.com"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </>
  );
}
