import { getApp } from 'firebase-admin/app'
import { Timestamp, FieldValue, FieldPath } from 'firebase-admin/firestore'
import admin from '/firebase/admin'
import BillingBtn from '../../../comps/pay_form'
import ClientTable from './comps/ClientTable'

import getUserAuth from '../../../utils/server_user_auth'
import { redirect } from 'next/navigation'
// import stripe_sdk from "stripe";
// import dateFormat from "dateformat";
// import ClientBtn from "./comps/ClientBtn";

// const stripe = stripe_sdk(process.env.STRIPE_SECRET_KEY);

const db = admin.firestore()
const Profile = async ({}) => {
    const user = await getUserAuth()

    // console.log("user session verify...", user);
    if (!user) {
        redirect('/expired')
    }
    const { displayName, email, photoURL, role, stripeId, id, order } = user
    const col = db.collection('examples')
    const voiceCol = db.collection('voices')
    let examples = []
    const exampleSnapShot = await col.where('uid', '==', id).get()
    if (!exampleSnapShot.empty) {
        examples = exampleSnapShot.docs
    }
    let voices = []
    const scriptVoicesSnapShot = await voiceCol.where('uid', '==', id).get()
    if (!scriptVoicesSnapShot.empty) {
        voices = scriptVoicesSnapShot.docs
    }

    return (
        <>
            <div className="container h-4/5 w-4/5 overflow-hidden overflow-y-scroll py-5 mx-auto">
                {voices.length === 0 ? (
                    <p className="mt-4 flex items-center text-base text-gray-500 hover:text-gray-700 mb-10">
                        您暂时还未生成任何音频
                    </p>
                ) : (
                    <>
                        <ul className="space-y-2 text-gray-500 list-inside dark:text-gray-400 w-full">
                            {/* <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white align-left w-full">
                            声音
                        </h2> */}
                            {voices.map((voice) => (
                                <li
                                    key={voice.id}
                                    className="flex items-center py-4 bg-white px-5 justify-between hover:bg-slate-100 text-sm hover: cursor-pointer"
                                >
                                    <span className="font-bold flex justify-start items-center">
                                        {voice.data().status === 'done' ? (
                                            <svg
                                                className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                        )}

                                        {voice.data().name}
                                    </span>
                                    {voice.data().status !== 'done' ? (
                                        <p className="ml-5 text-xs ">
                                            请等待处理
                                        </p>
                                    ) : (
                                        <a
                                            href={voice.data().downloadUrl}
                                            className="mx-auto ml-5 rounded-sm middle px-3 py-1 none bg-blue-500 font-sans text-xs font-bold text-white shadow-md hover:cursor-pointer shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        >
                                            下载
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <div className="my-10 self-center align-center flex">
                <a
                    href="/create"
                    className="mx-auto rounded-3xl middle px-3 py-2 none bg-blue-500 font-sans text-base font-bold text-white shadow-md hover:cursor-pointer shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    {decodeURIComponent('%2B')} 创建音频
                </a>
            </div>
        </>
    )
}

export default Profile
