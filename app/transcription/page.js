import admin from "../../pages/firebase";
import { getAuth } from "firebase-admin/auth";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import AuthProvider from "../../comps/auth_provider";
import Link from "next/link";
import { cookies } from "next/headers";
import NoAuth from "../../comps/no_auth";

const Transcription = async () => {
  // const docRef = doc(db, "cities", "uid");

  const db = admin.firestore();
  const idToken = cookies().get("token").value;
  if (typeof idToken !== "string") return <NoAuth />;
  const user = await getAuth().verifyIdToken(idToken).catch(console.log);
  const docs = await db.collection("data").where("uid", "==", user.uid).get();

  // console.log(uid);

  // const docSnap = await getDoc(docRef);
  // const uid = firebase.auth.currentUser;

  // console.log(uid);
// 
  // console.log("-------", docs.docs[0].data());
  // docs.forEach((snapshot) => {
  // console.log("snapshot:::+++++>", snapshot.id);
  // });
  // const uid = firebase.auth.currentUser;

  // const dataRef = collection(firebase.db, "data");

  // const q = query(dataRef, where("uid", "==", uid));

  // const querySnapshot = await getDocs(q);

  // console.log("----------------------------", querySnapshot.docs);
  // console.log("--------------------------")
  // console.log(typeof querySnapshot.docs[0].data());
  // querySnapshot.map((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  // console.log("result:------------------", querySnapshot.data())
  return (
    <div className="flex flex-col items-center my-20">
      <div className="w-full md:w-1/2 flex flex-col items-center h-64 ">
        <div className="w-full px-4">
          <div className="flex flex-col items-center relative">
            <div className="w-full">
              <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                <div className="flex flex-auto flex-wrap" />
                <input
                  placeholder="Search by position"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                />
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                  <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-chevron-up w-4 h-4"
                    >
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
              {docs.docs.map((item) => (
                <Link href={`/transcription/${item.id}`}>
                  <div className="flex flex-col w-full" key={item.id}>
                    <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100 transition-all hover:py-5">
                      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                        <div className="w-6 flex flex-col items-center">
                        </div>
                        <div className="w-full items-center flex">
                          <div className="mx-2 -mt-1  ">
                           {item.data().name}
                            <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                            {item.data().status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcription;
