import admin from "../../../pages/firebase";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
const Content = async ({ params }) => {
  const sessionCookie = (cookies().get("session") || {}).value;
  const user = await getAuth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .catch(console.error);
  const db = admin.firestore();
  const docSnap = await db
    .collection("data")
    .where("uid", "==", user.sub)
    .where("process_id", "==", params.slug)
    .get();

  if (!docSnap.empty) {
    const { text, errorMessage } = docSnap.docs[0].data();
    return (
      <div className="max-w-2xl mx-auto">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <div id="myTabContent" className="my-20">
            <div
              className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {text || errorMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <h1>Empty</h1>;
};

export default Content;
