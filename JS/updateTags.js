// Fonction pour mettre à jour les tags disponibles
export function updateAvailableTags(filteredRecipes, updateFunction) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredientsSet.add(ing.ingredient));
    appliancesSet.add(recipe.appliance);
    recipe.ustensils.forEach((utensil) => utensilsSet.add(utensil));
  });

  updateFunction("ingredients", Array.from(ingredientsSet));
  updateFunction("appliances", Array.from(appliancesSet));
  updateFunction("ustensils", Array.from(utensilsSet));
}

// Fonction pour peupler les listes d'options
export function populateOptionsList(selectId, options) {
  const optionsList = document.querySelector(
    `#${selectId}-select .options-list`
  );
  optionsList.innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    optionsList.appendChild(li);
  });
}
