"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CategoryFilter({ categories, selectedCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Categories received in CategoryFilter:', categories);
  }, [categories]);

  const onCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) params.set("category", category);
    else params.delete("category");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mb-6">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border rounded-md text-black"
      >
        <option value="">All Categories</option>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))
        ) : (
          <option value="">Loading categories...</option>
        )}
      </select>
    </div>
  );
}