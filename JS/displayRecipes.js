export function displayRecipes(
  recipesToDisplay,
  recipesContainer,
  updateRecipeCount,
  searchText = ""
) {
  // Vide le conteneur des recettes pour éviter la duplication
  recipesContainer.innerHTML = "";

  // Si aucune recette n'est trouvée, afficher un message personnalisé
  if (recipesToDisplay.length === 0) {
    const noRecipesMessage = document.createElement("p");
    noRecipesMessage.classList.add("no-recipes-message");
    noRecipesMessage.textContent = searchText
      ? `Aucune recette ne contient "${searchText}".`
      : "Aucune recette n'a été trouvée.";
    recipesContainer.appendChild(noRecipesMessage);
    updateRecipeCount(0); // Met à jour le compteur à 0
    return;
  }

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
