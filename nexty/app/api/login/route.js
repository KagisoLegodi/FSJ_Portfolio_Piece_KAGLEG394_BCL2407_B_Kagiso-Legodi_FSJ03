// app/api/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { token } = await request.json();

  const response = NextResponse.json({ message: 'Logged in successfully' });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}
