// components/CategoryFilter.js

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2 border rounded-md"
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
  