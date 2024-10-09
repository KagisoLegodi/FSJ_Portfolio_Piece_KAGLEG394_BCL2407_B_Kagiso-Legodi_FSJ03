// app/middleware.js
import { NextResponse } from 'next/server';
import { adminAuth } from './lib/firebaseAdmin';

export async function middleware(req) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await adminAuth.verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/secure-page/:path*',
};
