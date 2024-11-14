import { recipes } from "../../data/recipes.js";

// Sélection des élements du DOM
const input = document.getElementById("search");
const searchGlass = document.querySelector(".search-glass");
const form = document.querySelector("form");
const recipesContainer = document.getElementById("recipes-container");
const nbRecipeSpan = document.getElementById("nbrecipe");

// Ma variable pour stocker les recettes filtrées
let filteredRecipes = recipes;

//-----------------------------------------------------------------------------------------------
// Fonction pour afficher les recettes
//-----------------------------------------------------------------------------------------------
function displayRecipes(recipesToDisplay) {
  recipesContainer.innerHTML = "";
  recipesToDisplay.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
            <img src="media/${recipe.image}" alt="${recipe.name}" />
            <div class="recipe-time">${recipe.time} min</div>
            <div class="recipe-content">
                <h2>${recipe.name}</h2>
                <h3>Recette</h3>
                <p class="description">${recipe.description}</p>
                <h3>Ingrédients</h3>
                <ul>
                    ${recipe.ingredients
                      .map(
                        (ingredient) =>
                          `<li>${ingredient.ingredient}<br><span class="unit">${
                            ingredient.quantity || "-"
                          } ${ingredient.unit || ""}</span></li>`
                      )
                      .join("")}
                </ul>
            </div>
        `;
    recipesContainer.appendChild(recipeCard);
  });
  updateRecipeCount(recipesToDisplay.length);
}

//-----------------------------------------------------------------------------------------------
// Fonction pour mettre à jour le nombre de recettes affichées
//-----------------------------------------------------------------------------------------------
function updateRecipeCount(count) {
  nbRecipeSpan.textContent = `${count} recette${count > 1 ? "s" : ""}`;
}

//-----------------------------------------------------------------------------------------------
// Filtre les recettes en fonction du texte de recherche
//-----------------------------------------------------------------------------------------------
function filterRecipesByText(searchText) {
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(searchText.toLowerCase())
      ) ||
      recipe.description.toLowerCase().includes(searchText.toLowerCase())
  );
}

//-----------------------------------------------------------------------------------------------
// Filtre les recettes en fonction des tags sélectionnés
//-----------------------------------------------------------------------------------------------
function filterRecipesByTags(recipesToFilter) {
  const selectedIngredient = document.getElementById("ingredients").value;
  const selectedAppliance = document.getElementById("appliances").value;
  const selectedUtensil = document.getElementById("ustensils").value;

  return recipesToFilter.filter(
    (recipe) =>
      (!selectedIngredient ||
        recipe.ingredients.some(
          (ing) =>
            ing.ingredient.toLowerCase() === selectedIngredient.toLowerCase()
        )) &&
      (!selectedAppliance ||
        recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase()) &&
      (!selectedUtensil ||
        recipe.ustensils.some(
          (u) => u.toLowerCase() === selectedUtensil.toLowerCase()
        ))
  );
}

// Mise à jour des tags disponibles dans les selects
function updateAvailableTags() {
  const ingredients = new Set();
  const appliances = new Set();
  const ustensils = new Set();

  // Collecte des tags uniques à partir des recettes filtrées
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(ing.ingredient));
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach((ustensil) => ustensils.add(ustensil));
  });

  // Mise à jour des selects avec les nouveaux tags
  updateSelect("ingredients", Array.from(ingredients));
  updateSelect("appliances", Array.from(appliances));
  updateSelect("ustensils", Array.from(ustensils));
}

// Mise à jour d'un select spécifique
function updateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  const currentValue = select.value;

  let label = "";
  switch (selectId) {
    case "ingredients":
      label = "Ingrédients";
      break;
    case "appliances":
      label = "Appareils";
      break;
    case "ustensils":
      label = "Ustensiles";
      break;
  }

  select.innerHTML = `<option value="">${label}</option>`;
  for (let i = 0; i < options.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.value = options[i];
    optionElement.textContent = options[i];
    select.appendChild(optionElement);
  }
  select.value = currentValue;
}

//-----------------------------------------------------------------------------------------------
// Fonction principale de recherche
//-----------------------------------------------------------------------------------------------
function performSearch() {
  const searchText = input.value.trim();
  let recipesToFilter = recipes;

  // Si la recherche texte contient au moins 3 caractères, on applique le filtre
  if (searchText.length >= 3) {
    recipesToFilter = filterRecipesByText(searchText);
  }

  // Filtrage par tags
  filteredRecipes = filterRecipesByTags(recipesToFilter);

  // Affichage des recettes filtrées
  displayRecipes(filteredRecipes);
  updateAvailableTags();
}

// Écouteurs d'événements
input.addEventListener("input", performSearch);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  performSearch();
});

// Ajout d'écouteurs d'événements pour chaque select
["ingredients", "appliances", "ustensils"].forEach((selectId) => {
  document.getElementById(selectId).addEventListener("change", () => {
    performSearch();
  });
});

// Affichage initial
displayRecipes(recipes);
updateAvailableTags();
