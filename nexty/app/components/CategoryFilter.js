"use client"; // required for hooks in Next.js app router

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({ categories, selectedCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) params.set("category", category);
    else params.delete("category");
    params.set("page", "1"); // reset to page 1 when category changes
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
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
