import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { routing } from "./i18n/routing";

const publicPages = [
  "/",
  "/about-us",
  "/compounds",
  "/contact-us",
  "/developers",
  "/hansy-circle",
  "/our-agents",
  "/properties",
  "/property",
  "/search",
  "/services",
  "/privacy-policy",
];

const authPages = ["/login", "/register", "/reset-password", "/forget-password"];

const handleI18nRouting = createMiddleware(routing);

export default auth((req) => {
  const { pathname, searchParams } = req.nextUrl;

  // Helper to remove locale from pathname to check against public/auth pages
  // e.g. /en/login -> /login, /ar/about-us -> /about-us
  const segments = pathname.split('/');
  const locale = segments[1];
  const isLocalePresent = routing.locales.includes(locale as any);

  // Get the path without the locale prefix
  const pathnameWithoutLocale = isLocalePresent
    ? `/${segments.slice(2).join('/')}`
    : pathname;

  // Handle root path normalization (empty string becomes /)
  const normalizedPath = pathnameWithoutLocale === "" ? "/" : pathnameWithoutLocale;

  // 1. If authenticated and on an auth page, redirect to home (or callbackUrl)
  if (req.auth && authPages.includes(normalizedPath)) {
    const cb = searchParams.get("callbackUrl") || "/";
    const newUrl = new URL(cb, req.url);

    // Ensure the redirect URL respects the current locale if it was just /
    if (cb === "/" && isLocalePresent) {
      newUrl.pathname = `/${locale}`;
    }

    return NextResponse.redirect(newUrl);
  }

  // 2. Check if page is public
  const isPublicPage = publicPages.some(
    (page) => page === normalizedPath || normalizedPath.startsWith(`${page}/`),
  );

  // 3. If NOT authenticated and not on a public page or auth page,
  //    redirect to login with a callbackUrl
  if (!req.auth && !isPublicPage && !authPages.includes(normalizedPath)) {
    // Construct login path with current locale if present
    const loginPath = isLocalePresent ? `/${locale}/login` : "/login";
    const loginUrl = new URL(loginPath, req.url);

    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Run next-intl middleware for all other cases (localization, redirects, etc.)
  return handleI18nRouting(req);
});

export const config = {
  // Matcher ignoring internal Next.js paths, API routes, and static files
  matcher: ["/((?!api|_next|_vercel|favicon.ico|images|.*\\..*).*)"],
};



