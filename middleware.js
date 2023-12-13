import { NextResponse } from "next/server";

export async function middleware(request) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API

  const sessionCookie = request.cookies.session || "";
  NextResponse.redirect(new URL("/home", request.url));
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  getAuth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      serveContentForUser("/profile", req, res, decodedClaims);
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect("/login");
    });

  return response;
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
