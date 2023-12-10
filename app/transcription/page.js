import admin from "../../pages/firebase";
import { getAuth } from "firebase-admin/auth";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import AuthProvider from "../../comps/auth_provider";
import Link from "next/link";
import { cookies } from "next/headers";

const Transcription = async () => {
  // const docRef = doc(db, "cities", "uid");
  const db = admin.firestore();
  const idToken = cookies().get("token").value;
  // console.log("id token:",idToken)
  if (typeof idToken !== "string") return <>No Auth</>;
  const user = await getAuth().verifyIdToken(idToken).catch(console.log);
  console.log("uid:------------------", user.uid);
  // const docSnap = await getDoc(docRef);
  // const uid = firebase.auth.currentUser;
  const docs = await db.collection("data").where("uid", "==", user.uid).get();

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
    <section className="bg-gray-80 dark:bg-gray-900 flex items-center">
      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        {docs.docs.map((item) => (
          <li className="flex items-center" key={item.id}>
            {item.data().status === "COMPLETED" ? (
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
            <Link href={{ pathname: "/transcription/" + item.data().process_id }}>
              {item.data().process_id + "-" + item.data().status}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Transcription;
