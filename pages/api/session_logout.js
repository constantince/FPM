import { getAuth } from "firebase-admin/auth";
import cookie from "cookie";

export default async function SessionLogin(req, res) {
  const sessionCookie = req.cookies.session || "";
  const cookiesToClear = ["session", "vip"];

  const clearCookieHeaders = cookiesToClear.map((name) => {
    // Set each cookie with an expired date to clear it
    return cookie.serialize(name, "", { expires: new Date(0), path: "/" });
  });

  res.setHeader("Set-Cookie", clearCookieHeaders);
  // res.setHeader("Set-Cookie", cookie.serialize("vip", 0, options));
  const decodedClaims = await getAuth().verifySessionCookie(sessionCookie);
  getAuth().revokeRefreshTokens(decodedClaims.sub);
  res.redirect("/signin");
}
