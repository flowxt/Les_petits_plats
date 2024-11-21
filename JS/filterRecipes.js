// Fonction pour vérifier les correspondances
function matchItems(recipeItems, selectedItems, comparisonType = "some") {
  if (selectedItems.length === 0) return true;

  const normalizedRecipeItems = recipeItems.map((item) => item.toLowerCase());
  const normalizedSelectedItems = selectedItems.map((item) =>
    item.toLowerCase()
  );

  switch (comparisonType) {
    case "some":
      return normalizedSelectedItems.some((item) =>
        normalizedRecipeItems.includes(item)
      );
    case "every":
      return normalizedSelectedItems.every((item) =>
        normalizedRecipeItems.includes(item)
      );
    default:
      throw new Error("Invalid comparison type");
  }
}

// Fonction pour filtrer les recettes par texte
export function filterRecipesByText(searchText, recipes) {
  const lowerSearchText = searchText.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(lowerSearchText) ||
      recipe.description.toLowerCase().includes(lowerSearchText)
  );
}

// Fonction pour filtrer les recettes par plusieurs tags
export function filterRecipesByMultipleTags(
  recipesToFilter,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  return recipesToFilter.filter((recipe) => {
    const ingredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((ing) =>
        recipe.ingredients.some(
          (recipeIng) =>
            recipeIng.ingredient.toLowerCase() === ing.toLowerCase()
        )
      );

    const applianceMatch =
      selectedAppliances.length === 0 ||
      selectedAppliances.some(
        (app) => recipe.appliance.toLowerCase() === app.toLowerCase()
      );

    const utensilMatch =
      selectedUtensils.length === 0 ||
      selectedUtensils.every((ut) =>
        recipe.ustensils.some(
          (recipeUt) => recipeUt.toLowerCase() === ut.toLowerCase()
        )
      );

    return ingredientMatch && applianceMatch && utensilMatch;
  });
}
