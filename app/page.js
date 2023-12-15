"use client";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebase from "../firebase/index.js";
import Link from "next/link";
import Warning from "../comps/warning";
import Footer from "../comps/footer";
import { getAuth, onAuthStateChanged, UserInfo } from "firebase/auth";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
const storage = getStorage();
const auth = getAuth();
// const storageRef = ref(storage, "audios/first_voice.mp3");
// console.log(storageRef);
// getDownloadURL(storageRef).then((downloadURL) => {
//   console.log("voice:--------", downloadURL);
// });

export default function Home() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [warn, setWarn] = useState(null);
  const [name, setName] = useState(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  function onChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    if (/^audio\/(mp3|wav|mpeg)$/g.test(file.type)) {
      // test the file type
      if (file.size <= 8 * 1024 * 1024) {
        // test the file size
        setFile(file);
        setName(file.name);
      } else {
        setWarn("too big..");
      }
    } else {
      setWarn("type invaild..");
    }
  }

  onAuthStateChanged(getAuth(), (user) => {
    console.log("user:::", user);
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {}, [user]);

  function onSubmit(e) {
    e.preventDefault();
    if (!user) {
      window.location.href = "/signin";
      return;
    }
    if (!file) return console.error("no file");
    const storageRef = ref(storage, "audios/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          // call monster api with downloadURL paramters;
          console.log("File available at", downloadUrl);
          // front-end process done
          // fetch("/api/uploadaudios", { auth, downloadURL }).then((res) => {
          //   console.log("res:", res);
          //   // if (res.status === 200) {
          //   //   window.location.href = "/transcription/" + res.pid;
          //   // }
          // });

          const postData = {
            uid: user.uid,
            downloadUrl,
            name: file.name,
          };

          // Configuring the fetch request
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Assuming JSON data in the request body
              // Add any other headers as needed
            },
            body: JSON.stringify(postData), // Convert JavaScript object to JSON string
          };

          // Making the fetch request
          fetch("/api/uploadaudios", fetchOptions)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json(); // Assuming the response is in JSON format
            })
            .then((data) => {
              router.push("/success");
            })
            .catch((error) => {
              console.error("Error during fetch:", error);
            });
        });
      },
    );
  }

  // return (
  //   <>
  //     <Link href={{ pathname: "/transcription/1" }}>must login firt</Link>
  //     <a href="/transcription/">without auth</a>
  //   </>
  // );
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
          <form
            onSubmit={onSubmit}
            className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col"
          >
            <div className="flex items-center justify-center w-full">
              {name ? (
                <div className="flex justify-center flex-col items-center">
                  <h1 className="pt-2 sm:pt-5 text-blue">
                    {name} uploaded:
                    <span className=" text-xs text-yellow-400">
                      {progress}%
                    </span>
                  </h1>
                  <div className="mt-2 h-4 relative w-60 rounded-full overflow-hidden">
                    <div className=" w-full h-full bg-gray-200 absolute " />
                    <div
                      className=" h-full bg-yellow-400 sm:bg-green-500 absolute"
                      style={{ width: progress + "%" }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        WAV, MP3 (MAX. 8M)
                      </p>
                    </div>
                    <input
                      onChange={onChange}
                      id="dropzone-file"
                      type="file"
                      name="target-audio"
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>

            <button
              type="submit"
              className="block ml-auto mr-auto my-20 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
      </main>

      <Footer />

      {warn && (
        <Warning
          onClose={() => {
            setWarn(null);
          }}
          text={warn}
        />
      )}
    </>
  );
}
