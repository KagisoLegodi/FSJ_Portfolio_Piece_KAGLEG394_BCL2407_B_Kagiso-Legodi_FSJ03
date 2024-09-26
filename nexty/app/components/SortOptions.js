"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortOptions({ selectedSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSortChange = (sort) => {
    const params = new URLSearchParams(searchParams);
    if (sort) params.set("sort", sort);
    else params.delete("sort");
    params.set("page", "1"); // reset to page 1 when sorting changes
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mb-6">
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
  );
}
