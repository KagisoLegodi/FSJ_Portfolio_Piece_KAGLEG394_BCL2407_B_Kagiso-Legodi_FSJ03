import { NextResponse } from 'next/server';
import { auth } from '../../../lib/firebaseAdmin';
import { db } from '../../../lib/firebaseAdmin';

// Add review
export async function POST(request) {
  try {
    const { productId, rating, comment } = await request.json();
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    const review = {
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerEmail: decodedToken.email,
      reviewerName: decodedToken.name || 'Anonymous'
    };
    
    await db.collection('products').doc(productId).collection('reviews').add(review);
    return NextResponse.json({ message: 'Review added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Edit review
export async function PUT(request) {
  try {
    const { productId, reviewId, rating, comment } = await request.json();
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    const reviewRef = db.collection('products').doc(productId).collection('reviews').doc(reviewId);
    const reviewDoc = await reviewRef.get();
    
    if (!reviewDoc.exists) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    
    if (reviewDoc.data().reviewerEmail !== decodedToken.email) {
      return NextResponse.json({ error: 'Unauthorized to edit this review' }, { status: 403 });
    }
    
    await reviewRef.update({
      rating,
      comment,
      date: new Date().toISOString()
    });
    
    return NextResponse.json({ message: 'Review updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete review
export async function DELETE(request) {
  try {
    const { productId, reviewId } = await request.json();
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    
    const reviewRef = db.collection('products').doc(productId).collection('reviews').doc(reviewId);
    const reviewDoc = await reviewRef.get();
    
    if (!reviewDoc.exists) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    
    if (reviewDoc.data().reviewerEmail !== decodedToken.email) {
      return NextResponse.json({ error: 'Unauthorized to delete this review' }, { status: 403 });
    }
    
    await reviewRef.delete();
    
    return NextResponse.json({ message: 'Review deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}