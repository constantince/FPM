import { getAuth } from "firebase-admin/auth";

export default async function SessionLogin(req, res) {
  const sessionCookie = req.cookies.session || "";
  res.clearCookie("session");
  getAuth()
    .verifySessionCookie(sessionCookie)
    .then((decodedClaims) => {
      return getAuth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      res.redirect("/signin");
    })
    .catch((error) => {
      res.redirect("/signin");
    });
}
