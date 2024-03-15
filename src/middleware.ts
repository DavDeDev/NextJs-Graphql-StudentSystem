import { authConfig } from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";

// https://authjs.dev/guides/upgrade-to-v5#edge-compatibility
const { auth: middleware } = NextAuth(authConfig)

export default middleware( (req) => {
  // get session role
  // if role is admin, redirect to /admin
  // if role is student, redirect to /student
//   const session = await getSession();

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;



  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return;
  }

  // When the user visits the auth route
  if (isAuthRoute) {
    // If it's already logged in we redirect them
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    // Otherwise remain in the login page
    return;
  }

  // If the route is not public and I am not logged in
  if (!isLoggedIn && !isPublicRoute) {
    // We store this path for later
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ));
  }

  return;
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}