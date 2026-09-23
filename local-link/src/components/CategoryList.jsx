import CategoryCard from "./CategoryCard";

function CategoryList({ categories, onCategorySelect, selectedCategory }) {
  return (
    <section className="category-section">
      <h2 className="category-section-title">Popular Categories</h2>

      <div className="category-pills-wrap">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            isSelected={selectedCategory === category}
            onClick={onCategorySelect}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryList;