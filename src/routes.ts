/**
 *  Routes that are accessible to public
 *  These routes do not require authentication
 *  @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/auth/verification"
]

/**
 * Routes used for authentication
 * These routes will redirect user to /dashboard
 * @type { string[] }
 */
export const authRoutes: string[] = [
  "/auth/signin",
  "/auth/signup",
  "/auth/error",
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type { string }
 */
export const apiAuthPrefix: string = "/api/auth";


/**
 * The default redirect path after logging in
 * @type { string }
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/escapes";