"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar({ initialSearchTerm }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset page to 1 on search
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      className="mb-6 flex w-full max-w-lg mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div className="relative flex-grow justify-left">
        <input
          type="text"
          name="search"
          value={searchTerm} // Controlled component
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
          placeholder="Search products..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        className="ml-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
      >
        Search
      </button>
    </form>
  );
}
