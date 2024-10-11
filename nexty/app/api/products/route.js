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
    } else {
      // Default sorting by id
      productsQuery = query(productsQuery, orderBy("id", "desc"));
    }

    // Apply search filter
    if (search) {
      // Assuming you have a 'title' field in your products
      productsQuery = query(
        productsQuery,
        where("title", ">=", search),
        where("title", "<=", search + "\uf8ff")
      );
    }

    // Get total count of products
    const totalSnapshot = await getCountFromServer(productsQuery);
    const total = totalSnapshot.data().count;

    // Paginate the query
    const startIndex = (page - 1) * pageSize;
    let paginatedQuery = query(productsQuery, limit(pageSize));

    if (page > 1) {
      const prevPageSnapshot = await getDocs(
        query(productsQuery, limit(startIndex))
      );
      const lastVisible =
        prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];
      paginatedQuery = query(paginatedQuery, startAfter(lastVisible));
    }

    // Fetch products
    const snapshot = await getDocs(paginatedQuery);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

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
