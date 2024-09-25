// components/SearchBar.js

export default function SearchBar({ initialSearchTerm, onSearch }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const searchInput = e.target.elements.search.value;
      onSearch(searchInput);
    };
  
    return (
      <form className="mb-6 flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          defaultValue={initialSearchTerm}
          placeholder="Search products..."
          className="px-4 py-2 border rounded-l-md w-2/3 sm:w-1/2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
    );
  }
  