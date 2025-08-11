import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that require authentication (protected routes)
const protectedPaths = ["/"];

export function middleware(request: NextRequest) {
  try {
    const reqUrl = request.nextUrl.pathname;
    const userCookie = request.cookies.get("user");
    const isLoggedIn = !!userCookie;
    

    // Only check protected routes - don't redirect from auth pages
    if (!isLoggedIn && protectedPaths.some((path) => reqUrl.startsWith(path))) {
      console.log(`Redirecting unauthenticated user from ${reqUrl} to /login`);
      return NextResponse.redirect(new URL("/login", request.url));
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
  matcher: [
    "/"
  ],
};
