import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // We ONLY want to protect routes that start with "/admin"
  if (request.nextUrl.pathname.startsWith("/admin")) {
    
    // 1. Check if the user has an admin_session cookie
    const sessionCookie = request.cookies.get("admin_session")?.value;

    // 2. If no cookie exists, redirect them instantly to /login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. If they have a cookie, decrypt it to make sure it's valid and hasn't been tampered with
    const parsedSession = await decrypt(sessionCookie);

    if (!parsedSession) {
      // Token is invalid, expired, or fake -> Kick them out
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 4. Everything is secure, allow them into the Admin panel!
    return NextResponse.next();
  }

  // Allow all public routes (like /, /about, /contact) to pass through normally
  return NextResponse.next();
}

// Tells Next.js to only run this middleware on /admin routes to keep the site fast
export const config = {
  matcher: ["/admin/:path*"],
};