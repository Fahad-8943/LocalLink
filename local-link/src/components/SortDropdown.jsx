
function SortDropdown({ sortBy, onSortChange }) {
  return (
    <select
      className="sort-select"
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      aria-label="Sort services"
    >
      <option value="">Sort By</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating-high">Rating: High to Low</option>
    </select>
  );
}

export default SortDropdown;