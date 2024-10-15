import { NextResponse } from "next/server";
import { db, serverTimestamp } from "../../../lib/firebaseAdmin";
import { verifyToken } from "../../../lib/helpers";

export async function POST(request, { params }) {
  const { productId } = params;

  try {
    const { rating, comment } = await request.json();
    const decodedToken = await verifyToken(request);

    if (!rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
