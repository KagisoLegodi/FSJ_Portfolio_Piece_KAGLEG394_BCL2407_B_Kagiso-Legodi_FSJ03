import { NextResponse } from "next/server";
import { auth } from "../../../lib/firebaseAdmin";
import { db } from "../../../lib/firebaseAdmin";
import { serverTimestamp } from "firebase-admin/firestore";

// Add review
export async function POST(request) {
  try {
    const { productId, rating, comment } = await request.json();
    const authHeader = request.headers.get("Authorization");

    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const token = authHeader.split("Bearer ")[1];
      const decodedToken = await auth.verifyIdToken(token);

      const review = {
        rating,
        comment,
        date: serverTimestamp(),
        reviewerEmail: decodedToken.email,
        reviewerName: decodedToken.name || "Anonymous",
      };

      const newReviewRef = await db
        .collection("products")
        .doc(productId)
        .collection("reviews")
        .add(review);
      return NextResponse.json(
        { message: "Review added successfully", reviewId: newReviewRef.id },
        { status: 201 }
      );
    } catch (authError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
