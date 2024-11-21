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

function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Fonction pour filtrer les recettes par texte (name et description uniquement)
export function filterRecipesByText(searchText, recipes) {
  // Assainir le texte de recherche pour éviter les balises malveillantes
  const sanitizedSearchText = sanitizeInput(searchText).toLowerCase();
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (
      recipe.name.toLowerCase().includes(sanitizedSearchText) ||
      recipe.description.toLowerCase().includes(sanitizedSearchText)
    ) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}

// Fonction pour filtrer les recettes par plusieurs tags
export function filterRecipesByMultipleTags(
  recipesToFilter,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  return recipesToFilter.filter((recipe) => {
    const ingredientMatch = matchItems(
      recipe.ingredients.map((ing) => ing.ingredient),
      selectedIngredients,
      "every"
    );
    const applianceMatch = matchItems(
      [recipe.appliance], // Normalisation des appareils en tableau
      selectedAppliances,
      "some"
    );
    const utensilMatch = matchItems(
      recipe.ustensils,
      selectedUtensils,
      "every"
    );

    return ingredientMatch && applianceMatch && utensilMatch;
  });
}
