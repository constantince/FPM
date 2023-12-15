import { getAuth } from "firebase-admin/auth";

export default async function SessionLogin(req, res) {
  const idToken = req.body.idToken.toString();
  const csrfToken = Number(req.body.csrfToken.toString());
  const vip = req.body.vip.toString();
  // Guard against CSRF attacks.
  if (csrfToken * 3.15 !== 3150) {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  getAuth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie("session", sessionCookie, options);
        res.cookie("vip", vip, options);
        res.status(401).json({ code: 0, status: "success" });
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      },
    );
}
