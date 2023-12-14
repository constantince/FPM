import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

const UserAuthCheck = () => {
  const [user, setUser] = useState(null);
  const idToken = (cookies().get("token") || {}).value;
  if (typeof idToken !== "string") null;
  getAuth()
    .verifyIdToken(idToken)
    .then((res) => {
      setUser(user);
    });

  return user;
};

export default UseAuthCheck;
