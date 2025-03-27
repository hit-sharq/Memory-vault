import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;

  // Check if the user is authenticated
  const isAuthenticated = request.cookies.get("session") !== undefined;

  // Redirect to login if not authenticated and trying to access dashboard
  if (!isAuthenticated && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register" || path === "/"

  // Get the token from the cookies
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value

  // Redirect logic
  if (isPublicPath && token) {
    // If user is on a public path but has a token, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !token) {
    // If user is on a protected path but has no token, redirect to login
    return NextResponse.redirect(new URL("/login?callbackUrl=" + encodeURIComponent(request.url), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
