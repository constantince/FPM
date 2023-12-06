import admin from '../../pages/firebase';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import AuthProvider from "../../comps/auth_provider";

// const docRef = doc(db, "cities", "uid");
const db = admin.firestore();
// const docSnap = await getDoc(docRef);
// const uid = firebase.auth.currentUser;
const docs = db.collection("data").doc("02c6fdcd-0e09-4658-ace2-1801396a525e");



// console.log(uid);

console.log("-------",docs.get())

const Transcription = async () => {
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
        <li className="flex items-center">
          <svg
            className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          At least 10 characters
        </li>
        <li className="flex items-center">
          <svg
            className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          At least one lowercase character
        </li>
        {[].map((item) => (
          <li className="flex items-center" key={item.id}>
            <svg
              className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <Link href={{ pathname: "/transcription/" + item.data().id }}>
              {" "}
              let me see see
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Transcription;
