/**
 * An array of public routes that do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/auth/new-password",
];

/**
 * An array of routes that used for authentication
 * These route will be redirected to /settings if the user is already authenticated
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

/**
 * The prefix for the api authentication routes
 * Routes that start with this prefix are used for authentication
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default login redirect path
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
