export default function SearchBar({ initialSearchTerm, onSearch }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const searchInput = e.target.elements.search.value;
      onSearch(searchInput);
    };
  
    return (
      <form className="mb-6 flex w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="relative flex-grow">
          <input
            type="text"
            name="search"
            defaultValue={initialSearchTerm}
            placeholder="Search products..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-400"
          />
          {/* Optional: Search Icon inside input */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1118 9.5 7.5 7.5 0 0116.65 16.65z"
            />
          </svg>
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
  