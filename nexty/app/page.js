"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import SearchBar from "./components/searchBar";
import SortOptions from "./components/SortOptions";
import CategoryFilter from "./components/CategoryFilter";
import { fetchProducts } from "./lib/fetchProducts";
import Header from "./components/Header";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://next-ecommerce-api.vercel.app/categories",
          { cache: "force-cache" } // Cache categories aggressively
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts(
        page,
        search,
        sort,
        category,
      );
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, [page, search, sort, category,]); 

  const handlePagination = (newPage) => {
    if (!loading) {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`/?${params.toString()}`);
    }
  };

  const handleReset = () => {
    router.push("/");
  };

  return (
    <>
      <Header
        title="Discover Amazing Products"
        description="Browse our product catalog"
      />

      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Discover Amazing Products
        </h1>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="w-full md:w-1/3">
              <SearchBar initialSearchTerm={search} />
            </div>
            <div className="w-full md:w-1/3">
              <CategoryFilter
                categories={categories}
                selectedCategory={category}
              />
            </div>
            <div className="w-full md:w-1/3">
              <SortOptions selectedSort={sort} />
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            Reset All Filters
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600 mt-8">
            No products available.
          </p>
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handlePagination(Math.max(1, page - 1))}
            disabled={page === 1 || loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && page > 1 ? "Loading..." : "Previous"}
          </button>
          <span className="font-semibold text-gray-700">Page {page}</span>
          <button
            onClick={() => handlePagination(page + 1)}
            disabled={products.length < 20 || loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && products.length === 20 ? "Loading..." : "Next"}
          </button>
        </div>
      </section>
    </>
  );
}
