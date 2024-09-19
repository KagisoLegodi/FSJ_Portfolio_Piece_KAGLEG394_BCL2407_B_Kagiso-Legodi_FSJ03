"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "./components/ProductList";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerPage = 20;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const skip = (page - 1) * itemsPerPage;
      const res = await fetch(
        `https://next-ecommerce-api.vercel.app/products?limit=${itemsPerPage}&skip=${skip}`
      );
      if (!res.ok) throw new Error("Failed to load products");

      const data = await res.json();
      setProducts(data);
      setHasMore(data.length === itemsPerPage);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
    window.scrollTo(0, 0); // Scroll to top on page load
  }, [page]);

  const handlePageChange = (direction) => {
    const newPage = direction === "next" ? page + 1 : Math.max(1, page - 1);
    router.replace(`/?page=${newPage}`);
  };

  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4 text-center">All Products</h1>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center">No products available.</p>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          Previous
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={!hasMore}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
}
