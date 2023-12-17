import { getAuth } from "firebase-admin/auth";
import cookie from "cookie";

export default async function SessionSignUp(req, res) {
  const idToken = req.body.idToken.toString();
  const csrfToken = Number(req.body.csrfToken.toString());
  const vip = req.body.vip.toString();
  // Guard against CSRF attacks.
  if (csrfToken * 3.15 !== 3150 || req.method !== "POST") {
    res.status(401).send("UNAUTHORIZED REQUEST!");
    return;
  }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  const sessionCookie = await getAuth().createSessionCookie(idToken, {
    expiresIn,
  });

  if (sessionCookie) {
    // Set cookie policy for session cookie.
    const options = {
      path: "/",
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    const cookies = {
      session: {
        value: sessionCookie,
        options,
      },
      vip: {
        value: vip,
        options,
      },
    };
    const cookieHeaders = Object.entries(cookies).map(
      ([name, { value, options }]) => {
        return cookie.serialize(name, value, options);
      }
    );

    // res.setHeader(
    //   "Set-Cookie",
    //   `session=${sessionCookie}; HttpOnly; Secure; Max-Age=${options.maxAge}`
    // );
    // res.setHeader(
    //   "Set-Cookie",
    //   `vip=0; HttpOnly; Secure; Max-Age=${options.maxAge}`
    // );
    res.setHeader("Set-Cookie", cookieHeaders);
    // res.setHeader("Set-Cookie", cookie.serialize("vip", 0, options));
    // res.cookies.set("session", sessionCookie, options);
    res.status(200).json({ code: 0, status: "success" });

    return;
  }

  res.status(401).send("UNAUTHORIZED REQUEST!");
}
