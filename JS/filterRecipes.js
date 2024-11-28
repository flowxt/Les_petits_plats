// Fonction pour vérifier les correspondances
function matchItems(recipeItems, selectedItems, comparisonType = "some") {
  if (selectedItems.length === 0) return true;

  // Pour effectuer ma recherche en normalisant en lowercase les éléments
  const normalizedRecipeItems = recipeItems.map((item) => item.toLowerCase());
  const normalizedSelectedItems = selectedItems.map((item) =>
    item.toLowerCase()
  );

  // Verifier les correspondances en fonction du type de comparaison
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

// Fonction pour filtrer les recettes par texte (name et description uniquement)
// Fonction pour échapper les caractères spéciaux dans le texte de recherche
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Fonction pour filtrer les recettes par texte (name et description uniquement)
export function filterRecipesByText(searchText, recipes) {
  // Assainir le texte de recherche pour éviter les balises malveillantes
  const sanitizedSearchText = sanitizeInput(searchText).toLowerCase();

  // Filtrer les recettes dont le nom ou la description contient le txt de recherche
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(sanitizedSearchText) ||
      recipe.description.toLowerCase().includes(sanitizedSearchText)
  );
}

// Fonction pour filtrer les recettes par plusieurs tags
export function filterRecipesByMultipleTags(
  recipesToFilter,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  // Filtrer les recettes en fonction des tags sélectionnés
  return recipesToFilter.filter((recipe) => {
    // Vérifier si les ingrédients sélectionnés sont présents dans la recette
    const ingredientMatch = matchItems(
      recipe.ingredients.map((ing) => ing.ingredient),
      selectedIngredients,
      "every"
    );
    // Vérifier si au moins un des appareils sélectionnés est présent dans la recette
    const applianceMatch = matchItems(
      [recipe.appliance], // Normalisation des appareils en tableau
      selectedAppliances,
      "some"
    );
    // Vérifier si tous les ustensiles sélectionnés sont présents dans la recette
    const utensilMatch = matchItems(
      recipe.ustensils,
      selectedUtensils,
      "every"
    );

    return ingredientMatch && applianceMatch && utensilMatch;
  });
}
