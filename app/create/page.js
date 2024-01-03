import Link from "next/link";

export default async function Index() {
  return (
    <>
      <p className="font-semibold text-gray-700">
        💌 Get the best of Product Hunt, directly in your inbox.
      </p>
      <input
        type="text"
        className="h-10 w-full rounded border p-2 text-sm"
        placeholder="Title"
      />

      <input
        type="text"
        className="h-10 w-full rounded border p-2 text-sm"
        placeholder="Link"
      />

      <Link
        href="/create/main"
        className="rounded bg-[#FD5E57] text-gray-50 hover:bg-gradient-to-r hover:from-[#FD5E57] hover:to-[#FC477E]"
      >
        Next
      </Link>
    </>
  );
}
