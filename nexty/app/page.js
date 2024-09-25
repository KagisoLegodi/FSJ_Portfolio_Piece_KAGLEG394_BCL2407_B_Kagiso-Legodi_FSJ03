"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import SearchBar from "./components/searchBar";
import SortOptions from "./components/SortOptions";
import CategoryFilter from "./components/CategoryFilter";
import { fetchProducts } from "./lib/fetchProducts";

const categories = ["Electronics", "Clothing", "Books", "Accessories"]; // Example categories

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Set loading to true when fetching products
      const fetchedProducts = await fetchProducts(page, search, sort, category);
      setProducts(fetchedProducts);
      setLoading(false); // Set loading to false when fetching is done
    };
    loadProducts();
  }, [page, search, sort, category]);

  const handlePagination = (newPage) => {
    if (!loading) {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4 text-center">All Products</h1>

      <SearchBar initialSearchTerm={search} />
      <SortOptions selectedSort={sort} />
      <CategoryFilter categories={categories} selectedCategory={category} />

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center">No products available.</p>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePagination(Math.max(1, page - 1))}
          disabled={page === 1 || loading} // Disable when loading
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          {loading && page > 1 ? "Loading..." : "Previous"}{" "}
          {/* Loading state for Previous */}
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          onClick={() => handlePagination(page + 1)}
          disabled={products.length < 20 || loading} // Disable when loading
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          {loading && products.length === 20 ? "Loading..." : "Next"}{" "}
          {/* Loading state for Next */}
        </button>
      </div>
    </section>
  );
}
