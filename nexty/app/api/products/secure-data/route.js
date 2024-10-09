import { NextResponse } from 'next/server';
import { adminAuth } from '../../../lib/firebaseAdmin';

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return NextResponse.json({ message: 'Secure data', userId: decodedToken.uid });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}