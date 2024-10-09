import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET() {
  try {
    const categoriesDocRef = doc(db, "categories", "allCategories");
    const categoriesSnapshot = await getDoc(categoriesDocRef);

    if (categoriesSnapshot.exists()) {
      const categories = categoriesSnapshot
        .data()
        .categories.arrayValue.values.map((value) => value.stringValue);

      return NextResponse.json({ categories });
    } else {
      return NextResponse.json(
        { error: "No Categories Found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
