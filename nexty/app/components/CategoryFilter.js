"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

export default function CategoryFilter({ categories, selectedCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("Categories received in CategoryFilter:", categories);
  }, [categories]);

  const onCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category)
      params.set(
        "category",
        category
      ); // Make sure the key matches your API parameter
    else params.delete("category");
    params.set("page", "1"); // Reset to the first page on category change
    router.push(`/?${params.toString()}`);
  };

  return (
    <Suspense fallback={<div>Loading categories...</div>}>
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border rounded-md text-black"
        >
          <option value="">All Categories</option>
          {categories > 0 ? (
            categories.map((category) => (
              <option key={category} value={category}>
                {category}

              </option>
            ))
          ) : (
            <option value="">Loading categories...</option>
          )}
        </select>
      </div>
    </Suspense>
  );
}
