// Fonction pour ajouter un tag
export function addTag(selectId, value, performSearch) {
  // Si valeur vide, ne rien faire
  if (!value) return;

  // Selectionner le conteneur de tags
  const tagContainer = document.getElementById(`selected-${selectId}`);
  const existingTag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  // Si le tag existe déjà, ne rien faire
  if (existingTag) return;

  // Crée mon nouvel élément span pour le tag
  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.setAttribute("data-value", value);
  tag.setAttribute("data-select", selectId);
  tag.innerHTML = `${value} <i class="fa-solid fa-xmark close-tag" data-select="${selectId}" data-value="${value}"></i>`;

  // J'ajoute mon tag au conteneur de tags
  tagContainer.appendChild(tag);

  // Effacer la valeur de l'input de recherche
  const searchInput = document.querySelector(
    `#${selectId}-select .search-input`
  );
  if (searchInput) {
    searchInput.value = "";
    // Réafficher toutes les options
    const optionsList = searchInput.nextElementSibling;
    const options = optionsList.querySelectorAll("li");
    options.forEach((option) => (option.style.display = ""));
  }
  // J'exécute la recherche
  performSearch();
}

// Fonction pour supprimer un tag
export function removeTag(selectId, value, performSearch) {
  const tagContainer = document.getElementById(`selected-${selectId}`);
  const tag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  // Si le tag existe, je le supprime
  if (tag) {
    tag.remove();
  }
  // J'exécute la recherche de nouveau
  performSearch();
}
