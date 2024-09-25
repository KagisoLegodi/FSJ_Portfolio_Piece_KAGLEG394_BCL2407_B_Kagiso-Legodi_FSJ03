// components/SortOptions.js

export default function SortOptions({ selectedSort, onSortChange }) {
    return (
      <div className="flex justify-center mb-6">
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    );
  }
  