import Link from "next/link";
import getUserAuth from "/utils/server_user_auth";
import admin from "/firebase/admin";
const db = admin.firestore();
export default async function Index({ params }) {
  const user = await getUserAuth();
  const { id } = user || {};
  return (
    <>
      <input
        type="text"
        value={id}
        name="uid"
        className="hidden"
        readOnly={true}
      />

      <div className="mb-5">
        <label
          htmlFor="link"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          名称:
        </label>
        <input
          type="name"
          name="name"
          id="name"
          required={true}
          placeholder="ChatGpt"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="source"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          请选择源样本:
        </label>
        <select
          name="source"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        >
          <option value="1">{"测试.mp3"}</option>
          <option value="1">{"测试1.mp3"}</option>
          <option value="1">{"测试2.mp3"}</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="text"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          请填入您预期的文本:
        </label>
        <textarea
          rows={4}
          name="text"
          id="text"
          required={true}
          placeholder=""
          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </>
  );
}
