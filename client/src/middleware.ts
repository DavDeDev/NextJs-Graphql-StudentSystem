import { authConfig } from "@/auth.config";
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

// https://authjs.dev/guides/upgrade-to-v5#edge-compatibility
const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  console.log("====MIDDLEWARE====")
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log(isLoggedIn ? "🟢 Logged in" : "🔴 Not Logged in");

  console.log("ROUTE: ", nextUrl.pathname)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  console.log(`does ${nextUrl.pathname} start with ${apiAuthPrefix}: ${isApiAuthRoute}`);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  console.log(`is ${nextUrl.pathname} a public route?  ${isPublicRoute}`);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log(`is ${nextUrl.pathname} an auth route?  ${isAuthRoute}`);
  console.log("=============")
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
    console.log("↗️ Redirecting")
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