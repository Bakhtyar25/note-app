import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that require authentication (protected routes)
const protectedPaths = ["/"];
// Auth routes that should be inaccessible to logged-in users
const authPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  try {
    const reqUrl = request.nextUrl.pathname;
    const userCookie = request.cookies.get("user");
    const isLoggedIn = !!userCookie;
    const isAuthRoute = authPaths.some((path) =>
      reqUrl === path || reqUrl.startsWith(`${path}/`)
    );
    const isProtectedRoute = protectedPaths.some(
      (path) => reqUrl === path || reqUrl.startsWith(`${path}/`)
    );
    // If not logged in and accessing protected route (but not auth pages), redirect to login
    if (!isLoggedIn && isProtectedRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If logged in and accessing auth pages, redirect to home
    if (isLoggedIn && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow access to all routes
    console.log(`Allowing access to: ${reqUrl}`);
    return NextResponse.next();
    
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.next();
  }
}

// Only run middleware on protected routes to prevent conflicts
export const config = {
  matcher: ["/", "/login", "/signup"],
};
