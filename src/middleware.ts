// !---- runs on edge ---->

import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes} from "@/routes"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
const { auth } = NextAuth(authConfig)
export default auth((req) => {
  // Your custom middleware logic goes here
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isHome = nextUrl.pathname === '/';
  
  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute || isHome) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }  

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return;
})

// !---- Clerkjs Matcher Function ---->
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}