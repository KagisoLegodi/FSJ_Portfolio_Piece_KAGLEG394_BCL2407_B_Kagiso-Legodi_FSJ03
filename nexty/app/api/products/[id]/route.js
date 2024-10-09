// app/api/products/[id]/route.js

import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase"; // Ensure this path is correct

export async function GET(request, { params }) {
  const { id } = params; // Retrieve the product ID from the route parameters

  // Ensure params is defined and contains the id
  if (!params || !params.id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const productDocRef = doc(db, "products", id); // Adjust "products" to your collection name
    const productDocSnap = await getDoc(productDocRef);

    if (productDocSnap.exists()) {
      const productData = productDocSnap.data();
      return NextResponse.json(productData);
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
