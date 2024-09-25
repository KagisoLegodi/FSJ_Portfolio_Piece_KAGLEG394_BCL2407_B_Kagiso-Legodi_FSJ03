/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useState } from "react";
import ProductList from "./components/ProductList";
import SearchBar from "./components/searchBar"
import SortOptions from "./components/SortOptions";
import CategoryFilter from "./components/CategoryFilter";
import { fetchProducts } from "./lib/fetchProducts";

const categories = ["Electronics", "Clothing", "Books", "Accessories"]; // Example categories

export default async function Home({ searchParams }) {
  const [sort, setSort] = useState(searchParams.sort || "");
  const [category, setCategory] = useState(searchParams.category || "");
  const page = parseInt(searchParams.page || "1", 10);
  const initialSearchTerm = searchParams.search || "";

  const products = await fetchProducts(page, initialSearchTerm, sort, category);

  const handleSearch = (searchTerm) => {
    window.location.href = `/?search=${encodeURIComponent(searchTerm)}&page=1&sort=${sort}&category=${category}`;
  };

  const handleSortChange = (sortOption) => {
    setSort(sortOption);
    window.location.href = `/?search=${initialSearchTerm}&page=1&sort=${sortOption}&category=${category}`;
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    window.location.href = `/?search=${initialSearchTerm}&page=1&sort=${sort}&category=${selectedCategory}`;
  };

  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4 text-center">All Products</h1>

      <SearchBar initialSearchTerm={initialSearchTerm} onSearch={handleSearch} />
      <SortOptions selectedSort={sort} onSortChange={handleSortChange} />
      <CategoryFilter categories={categories} selectedCategory={category} onCategoryChange={handleCategoryChange} />

      {products.length > 0 ? (
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
          onClick={() => window.location.href = `/?page=${Math.max(1, page - 1)}&search=${initialSearchTerm}&sort=${sort}&category=${category}`}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          Previous
        </button>
        <span className="font-semibold">Page {page}</span>
        <button
          onClick={() => window.location.href = `/?page=${page + 1}&search=${initialSearchTerm}&sort=${sort}&category=${category}`}
          disabled={products.length < 20}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
}
