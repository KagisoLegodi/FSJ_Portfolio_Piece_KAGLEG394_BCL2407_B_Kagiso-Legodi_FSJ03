import { NextResponse } from "next/server";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // Ensure this path is correct

export async function GET(_request, { params }) {
  const { id } = params; // Retrieve the product ID from the route parameters

  // Ensure params is defined and contains the id
  if (!params || !params.id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const productDocRef = doc(db, "products", id);
    const productDocSnap = await getDoc(productDocRef);

    if (productDocSnap.exists()) {
      const productData = productDocSnap.data();

      // Fetch reviews for the product
      const reviewsCollectionRef = collection(db, "products", id, "reviews");
      const reviewsSnapshot = await getDocs(reviewsCollectionRef);

      const reviews = reviewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Add reviews to the product data
      const productWithReviews = {
        ...productData,
        id: productDocSnap.id,
        reviews: reviews,
      };

      return NextResponse.json(productWithReviews);
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
