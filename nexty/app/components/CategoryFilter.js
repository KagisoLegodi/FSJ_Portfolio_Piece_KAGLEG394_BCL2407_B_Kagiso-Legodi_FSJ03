"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

/**
 * CategoryFilter component for selecting and filtering products by category.
 *
 * @param {Object} props - Component properties.
 * @param {Array<string>} props.categories - List of categories to display.
 * @param {string} props.selectedCategory - Currently selected category.
 * @returns {JSX.Element} - Rendered CategoryFilter component.
 */
export default function CategoryFilter({ categories, selectedCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("Categories received in CategoryFilter:", categories);
  }, [categories]);

  /**
   * Handle category change and update query parameters.
   *
   * @param {string} category - The category selected by the user.
   */
  const onCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) params.set("category", category);
    else params.delete("category");
    params.set("page", "1");
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
    </Suspense>
  );
}
