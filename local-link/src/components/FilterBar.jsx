
function FilterBar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <select
      className="filter-select"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      aria-label="Filter by category"
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default FilterBar;