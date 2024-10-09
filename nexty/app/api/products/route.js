import { db } from "../../lib/firebase";
import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  getCountFromServer,
  orderBy,
  where,
} from "firebase/firestore";
import Fuse from "fuse.js";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

  try {
    // Start building the query for products
    let productsQuery = collection(db, "products");

    // Apply category filter
    if (category) {
      productsQuery = query(productsQuery, where("category", "==", category));
    }

    // Apply sorting
    if (sort === "price-asc") {
      productsQuery = query(productsQuery, orderBy("price", "asc"));
    } else if (sort === "price-desc") {
      productsQuery = query(productsQuery, orderBy("price", "desc"));
    }

    // Get total count of products
    const totalSnapshot = await getCountFromServer(productsQuery);
    const total = totalSnapshot.data().count;

    // Determine the starting point for pagination
    const startAfterDoc =
      page > 1
        ? (await getDocs(query(productsQuery, limit((page - 1) * pageSize))))
            .docs[pageSize - 1] // Get the last document of the previous page
        : null;

    // Apply pagination logic
    if (startAfterDoc) {
      productsQuery = query(
        productsQuery,
        startAfter(startAfterDoc),
        limit(pageSize)
      );
    } else {
      productsQuery = query(productsQuery, limit(pageSize));
    }

    // Fetch products
    const snapshot = await getDocs(productsQuery);
    let products = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    // Search with Fuse.js
    if (search) {
      const fuse = new Fuse(products, { keys: ["data.title"] });
      const result = fuse.search(search);
      products = result.map((res) => res.item);
    }

    // Return the response
    return new Response(
      JSON.stringify({
        products,
        total,
        page,
        pageSize,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
