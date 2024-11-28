// Fonction pour mettre à jour les tags disponibles
export function updateAvailableTags(filteredRecipes, updateFunction) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  // Je parcours mes recettes qui sont filtrées
  filteredRecipes.forEach((recipe) => {
    // Pour chaque recette, je récupère les ingrédients, les appareils et les ustensiles
    recipe.ingredients.forEach((ing) => ingredientsSet.add(ing.ingredient));
    appliancesSet.add(recipe.appliance);
    recipe.ustensils.forEach((utensil) => utensilsSet.add(utensil));
  });

  // Ici je mets à jour ma liste d'option
  updateFunction("ingredients", Array.from(ingredientsSet));
  updateFunction("appliances", Array.from(appliancesSet));
  updateFunction("ustensils", Array.from(utensilsSet));
}

// Fonction pour peupler les listes d'options
export function populateOptionsList(selectId, options) {
  // Je récupère la liste d'options
  const optionsList = document.querySelector(
    `#${selectId}-select .options-list`
  );
  // Je vide la liste des options existantes
  optionsList.innerHTML = "";
  // J'ajoute chaque option à la liste des options
  options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    optionsList.appendChild(li);
  });
}
