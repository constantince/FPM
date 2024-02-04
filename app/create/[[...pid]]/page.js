import Link from 'next/link'
import getUserAuth from '/utils/server_user_auth'
import admin from '/firebase/admin'
const db = admin.firestore()
export default async function Index({ params }) {
    const user = await getUserAuth()
    let examples = []
    const col = db.collection('examples')
    const exampleSnapShot = await col.where('uid', '==', user.id).get()
    if (!exampleSnapShot.empty) {
        examples = exampleSnapShot.docs
    }
    const { id } = user || {}
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
                    Name:
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
                    Source Example:
                </label>
                <select
                    name="source"
                    className="w-full px-2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                    {examples.map((example) => (
                        <option
                            className="px-2"
                            key={example.id}
                            value={example.id}
                        >
                            {example.data().name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-5">
                <label
                    htmlFor="text"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    Your Script:
                </label>
                <textarea
                    rows={4}
                    name="text"
                    id="text"
                    required={true}
                    maxLength={1000}
                    placeholder=""
                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
        </>
    )
}
