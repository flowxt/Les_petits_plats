// Fonction pour ajouter un tag
export function addTag(selectId, value, performSearch) {
  if (!value) return;

  const tagContainer = document.getElementById(`selected-${selectId}`);
  const existingTag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  if (existingTag) return;

  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.setAttribute("data-value", value);
  tag.setAttribute("data-select", selectId);
  tag.innerHTML = `${value} <i class="fa-solid fa-xmark close-tag" data-select="${selectId}" data-value="${value}"></i>`;

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

  performSearch();
}

// Fonction pour supprimer un tag
export function removeTag(selectId, value, performSearch) {
  const tagContainer = document.getElementById(`selected-${selectId}`);
  const tag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  if (tag) {
    tag.remove();
  }
  performSearch();
}
