"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "./components/ProductList";
import SearchBar from "./components/searchBar";
import SortOptions from "./components/SortOptions";
import CategoryFilter from "./components/CategoryFilter";
import { fetchProducts } from "./lib/fetchProducts";
import { fetchCategories } from "./lib/fetchCategories"; // Correct import path
import Header from "./components/Header";

/**
 * Component to handle search params using useSearchParams.
 */
function ProductFilter({ setSearchData }) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    // Update search data whenever search params change
    setSearchData({ search, sort, category, page });
  }, [search, sort, category, page, setSearchData]);

  return null;
}

export default function Home() {
  const router = useRouter();

  // State for storing product data, categories, and loading status
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for search params data
  const [searchData, setSearchData] = useState({
    search: "",
    sort: "",
    categories: "",
    page: 1,
  });

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  // Load products based on search params
  useEffect(() => {
    const loadProducts = async () => {
      const { search, sort, category, page } = searchData;
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts(
          page,
          search,
          sort,
          category
        );
        console.log("Fetched Products:", fetchedProducts);
        setProducts(fetchedProducts.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchData]);

  /**
   * Handles pagination to load products for a new page.
   *
   * @param {number} newPage - The page number to navigate to.
   */
  const handlePagination = (newPage) => {
    if (!loading) {
      const params = new URLSearchParams(window.location.search);
      params.set("page", newPage.toString());
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl);
      setSearchData((prevData) => ({ ...prevData, page: newPage }));
    }
  };

  /**
   * Resets all filters, search, and sort options.
   */
  const handleReset = () => {
    router.push("/"); // Reset URL to default without filters
  };

  return (
    <>
      <Header
        title="Discover Amazing Products"
        description="Browse our product catalog"
      />

      <Suspense fallback={<div>Loading filters...</div>}>
        <ProductFilter setSearchData={setSearchData} />
      </Suspense>

      <section className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Discover Amazing Products
        </h1>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="w-full md:w-1/3">
              <SearchBar initialSearchTerm={searchData.search} />
            </div>
            <div className="w-full md:w-1/3">
              <CategoryFilter
                categories={categories}
                selectedCategory={searchData.category}
              />
            </div>
            <div className="w-full md:w-1/3">
              <SortOptions selectedSort={searchData.sort} />
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
              <ProductList key={product.id} product={product.data} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600 mt-8">
            No products available.
          </p>
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handlePagination(Math.max(1, searchData.page - 1))}
            disabled={searchData.page === 1 || loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && searchData.page > 1 ? "Loading..." : "Previous"}
          </button>
          <span className="font-semibold text-gray-700">
            Page {searchData.page}
          </span>
          <button
            onClick={() => handlePagination(searchData.page + 1)}
            disabled={products.length < 20 || loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && products.length === 20 ? "Loading..." : "Next"}
          </button>
        </div>
      </section>

      <footer className="bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2024 NEXTY E-Commerce. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
