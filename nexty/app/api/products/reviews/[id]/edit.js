import { NextResponse } from "next/server";
import { db, serverTimestamp } from "../../../lib/firebaseAdmin";
import { verifyToken } from "../../../lib/helpers";

export async function PUT(request, { params }) {
  const { productId } = params;

  try {
    const { reviewId, rating, comment } = await request.json();
    const decodedToken = await verifyToken(request);

    if (!rating || !comment || !reviewId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reviewDoc = await db
      .collection("products")
      .doc(productId)
      .collection("reviews")
      .doc(reviewId)
      .get();

    if (!reviewDoc.exists) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (reviewDoc.data().reviewerEmail !== decodedToken.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db
      .collection("products")
      .doc(productId)
      .collection("reviews")
      .doc(reviewId)
      .update({
        rating,
        comment,
        date: serverTimestamp(),
      });

    return NextResponse.json({ message: "Review updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error editing review:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
