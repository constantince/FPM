"use client";
import { collection, addDoc, serverTimestamp, getFirestore   } from "firebase/firestore"; 

const db = getFirestore();
export default function ClientBtn({id}) {
    return <button onClick={() => {
       
const docRef = addDoc(collection(db, "users", id, "unproducts"), {
    createTime: serverTimestamp()
  }).then(res => {
    console.log(res)
  });
    }}>create</button>
}