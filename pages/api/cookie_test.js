import cookie from "cookie";
export default async function cookieTest(req, res) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const options = { maxAge: expiresIn, httpOnly: true, secure: true };
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", "what is the fuck", options)
  );
  res.status(200).json({ code: 0, status: "success" });
}
