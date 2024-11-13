import { recipes } from "../../data/recipes.js";

// Sélection des éléments du DOM
const input = document.getElementById("search");
const form = document.querySelector("form");
const recipesContainer = document.getElementById("recipes-container");
const nbRecipeSpan = document.getElementById("nbrecipe");

// Variable pour stocker les recettes filtrées
let filteredRecipes = recipes;

// Fonction pour afficher les recettes
function displayRecipes(recipesToDisplay) {
  recipesContainer.innerHTML = "";
  // Va parcourir chaque recette à afficher grâce à ma boucle for
  for (let i = 0; i < recipesToDisplay.length; i++) {
    const recipe = recipesToDisplay[i];
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
  }
  updateRecipeCount(recipesToDisplay.length);
}

// Mise à jour du compteur de recettes
function updateRecipeCount(count) {
  nbRecipeSpan.textContent = `${count} recette${count > 1 ? "s" : ""}`;
}

// Filtre les recettes en fonction du texte de recherche (utilisant une boucle for)
function filterRecipesByText(searchText) {
  const lowerSearchText = searchText.toLowerCase();
  const result = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (
      recipe.name.toLowerCase().includes(lowerSearchText) ||
      recipe.description.toLowerCase().includes(lowerSearchText)
    ) {
      result.push(recipe);
      continue;
    }
    for (let j = 0; j < recipe.ingredients.length; j++) {
      if (
        recipe.ingredients[j].ingredient.toLowerCase().includes(lowerSearchText)
      ) {
        result.push(recipe);
        break;
      }
    }
  }
  return result;
}

// Filtre les recettes en fonction des tags sélectionnés (utilisant une boucle for)
function filterRecipesByTags(recipesToFilter) {
  const selectedIngredient = document
    .getElementById("ingredients")
    .value.toLowerCase();
  const selectedAppliance = document
    .getElementById("appliances")
    .value.toLowerCase();
  const selectedUtensil = document
    .getElementById("ustensils")
    .value.toLowerCase();

  const result = [];
  for (let i = 0; i < recipesToFilter.length; i++) {
    const recipe = recipesToFilter[i];
    let matchesIngredient = !selectedIngredient;
    let matchesAppliance =
      !selectedAppliance ||
      recipe.appliance.toLowerCase() === selectedAppliance;
    let matchesUtensil = !selectedUtensil;

    if (!matchesIngredient) {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (
          recipe.ingredients[j].ingredient.toLowerCase() === selectedIngredient
        ) {
          matchesIngredient = true;
          break;
        }
      }
    }

    if (!matchesUtensil) {
      for (let k = 0; k < recipe.ustensils.length; k++) {
        if (recipe.ustensils[k].toLowerCase() === selectedUtensil) {
          matchesUtensil = true;
          break;
        }
      }
    }

    if (matchesIngredient && matchesAppliance && matchesUtensil) {
      result.push(recipe);
    }
  }
  return result;
}

// Mise à jour des tags disponibles dans les selects
function updateAvailableTags() {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientsSet.add(recipe.ingredients[j].ingredient);
    }
    appliancesSet.add(recipe.appliance);
    for (let k = 0; k < recipe.ustensils.length; k++) {
      utensilsSet.add(recipe.ustensils[k]);
    }
  }

  updateSelect("ingredients", Array.from(ingredientsSet));
  updateSelect("appliances", Array.from(appliancesSet));
  updateSelect("ustensils", Array.from(utensilsSet));
}

// Mise à jour d'un select spécifique
function updateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  const currentValue = select.value;
  select.innerHTML = `<option value="">${
    selectId.charAt(0).toUpperCase() + selectId.slice(1)
  }</option>`;
  for (let i = 0; i < options.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.value = options[i];
    optionElement.textContent = options[i];
    select.appendChild(optionElement);
  }
  select.value = currentValue;
}

// Fonction principale de recherche
function performSearch() {
  const searchText = input.value.trim();
  let recipesToFilter = recipes;

  if (searchText.length >= 3) {
    recipesToFilter = filterRecipesByText(searchText);
  }

  filteredRecipes = filterRecipesByTags(recipesToFilter);

  displayRecipes(filteredRecipes);
  updateAvailableTags();
}

// Écouteurs d'événements
input.addEventListener("input", performSearch);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  performSearch();
});

["ingredients", "appliances", "ustensils"].forEach(function (selectId) {
  document.getElementById(selectId).addEventListener("change", performSearch);
});

// Affichage initial
displayRecipes(recipes);
updateAvailableTags();
