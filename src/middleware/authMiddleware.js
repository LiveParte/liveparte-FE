import { NextRequest, NextResponse } from 'next/server';
import { useRouter } from 'next/router';

export function middleware(req) {
  const url = req.nextUrl.clone(); // Create a copy of the request URL

  // Check if authentication is required for this page
  const isProtectedPage = url.pathname.startsWith('/'); // Example: Protected routes start with '/protected'

  // Check for authentication state using your preferred method (replace with your logic)
  const isAuthenticated =false;

  if (isProtectedPage && !isAuthenticated) {
    const router = useRouter(); // Access router in middleware (experimental)
    return NextResponse.redirect(new URL('/', url.origin)); // Redirect to login on protected pages
  }

  // Allow access for non-protected pages or authenticated users
  return NextResponse.next();
}

// Optional: Wrap middleware with error handling (experimental)
export const config = {
  matcher: ['/event'], // Apply middleware to protected routes
};
