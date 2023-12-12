import admin from "../../../pages/firebase";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import NoAuth from "../../comps/no_auth";
const Content = async ({ params }) => {
  const idToken = (cookies().get("token") || {}).value;
  if (typeof idToken !== "string") return <NoAuth />;
  const user = await getAuth().verifyIdToken(idToken).catch(console.log);
  if (typeof user !== "string") return <Noauth />;
  const db = admin.firestore();
  const docSnap = await db
    .collection("data")
    .where("uid", "==", user.uid)
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
