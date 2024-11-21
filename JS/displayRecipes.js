// Fonction pour afficher les recettes
export function displayRecipes(
  recipesToDisplay,
  recipesContainer,
  updateRecipeCount
) {
  // Vide le conteneur des recettes
  recipesContainer.innerHTML = "";

  // Parcourt chaque recette à afficher
  for (let recipe of recipesToDisplay) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    // Ajoute le contenu HTML de la carte de recette
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
              (ingredient) => `
                <li>${ingredient.ingredient}<br>
                  <span class="unit">${ingredient.quantity || "-"} ${
                ingredient.unit || ""
              }</span>
                </li>`
            )
            .join("")}
        </ul>
      </div>
    `;

    // Ajoute la carte de recette dans le conteneur
    recipesContainer.appendChild(recipeCard);
  }

  // Met à jour le compteur de recettes
  updateRecipeCount(recipesToDisplay.length);
}

// Fonction pour mettre à jour le nombre de recettes
export function updateRecipeCount(count, nbRecipeSpan) {
  nbRecipeSpan.textContent = `${count} recette${count > 1 ? "s" : ""}`;
}
