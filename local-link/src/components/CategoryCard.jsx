
function CategoryCard({ category, onClick, isSelected }) {
  return (
    <button
      type="button"
      className={`category-pill-btn ${isSelected ? "active" : ""}`}
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  );
}

export default CategoryCard;