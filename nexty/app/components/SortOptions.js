"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * SortOptions component for sorting products by price.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.selectedSort - The currently selected sort option.
 * @returns {JSX.Element} - Rendered SortOptions component.
 */
export default function SortOptions({ selectedSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Handle sort option change and update query parameters.
   *
   * @param {string} sort - The selected sorting option (e.g., "price-asc", "price-desc").
   */
  const onSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    if (sort) params.set("sort", sort);
    else params.delete("sort");
    params.set("page", "1"); // reset to page 1 when sorting changes
    router.push(`/?${params.toString()}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center mb-6">
        <div className="flex justify-center mb-2">
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border rounded-md text-black"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </Suspense>
  );
}
