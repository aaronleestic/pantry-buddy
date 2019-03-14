const FOOD_CATEGORIES = [
  "Grains & Carbs",
  "Protein & Diary",
  "Vegetables & Legumes",
  "Fruits & Sweets",
  "Spices & Ingredients",
  "misc"
].map((name, index) => {
  return { name, id: index }
});

export default FOOD_CATEGORIES;