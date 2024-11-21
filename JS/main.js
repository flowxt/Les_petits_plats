import { recipes } from "../../data/recipes.js";
import { displayRecipes, updateRecipeCount } from "./displayRecipes.js";
import {
  filterRecipesByText,
  filterRecipesByMultipleTags,
} from "./filterRecipes.js";
import { updateAvailableTags, populateOptionsList } from "./updateTags.js";
import { addTag, removeTag } from "./manageTags.js";

// Sélection des éléments DOM
const input = document.getElementById("search");
const form = document.querySelector("form");
const recipesContainer = document.getElementById("recipes-container");
const nbRecipeSpan = document.getElementById("nbrecipe");

// Variable pour stocker les recettes filtrées
let filteredRecipes = recipes;

// Fonction de recherche principale
function performSearch() {
  const searchText = input.value.trim();
  let recipesToFilter = recipes;

  // Filtrage des recettes par texte si au moins 3 caractères sont saisis
  if (searchText.length >= 3) {
    recipesToFilter = filterRecipesByText(searchText, recipes);
  }

  // Récupération des tags sélectionnés
  const selectedIngredients = Array.from(
    document.querySelectorAll("#selected-ingredients .tag")
  ).map((tag) => tag.getAttribute("data-value"));
  const selectedAppliances = Array.from(
    document.querySelectorAll("#selected-appliances .tag")
  ).map((tag) => tag.getAttribute("data-value"));
  const selectedUtensils = Array.from(
    document.querySelectorAll("#selected-ustensils .tag")
  ).map((tag) => tag.getAttribute("data-value"));

  // Filtrage des recettes en fonction des tags sélectionnés
  filteredRecipes = filterRecipesByMultipleTags(
    recipesToFilter,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils
  );

  // Affichage des recettes filtrées et mise à jour du compteur
  displayRecipes(filteredRecipes, recipesContainer, (count) =>
    updateRecipeCount(count, nbRecipeSpan)
  );

  // Mise à jour des tags disponibles
  updateAvailableTags(filteredRecipes, populateOptionsList);
}

// Événements de recherche
input.addEventListener("input", performSearch);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  performSearch();
});

// Initialisation des sélecteurs personnalisés
function initializeCustomSelects() {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((select) => {
    const header = select.querySelector(".select-header");
    const dropdown = select.querySelector(".select-dropdown");
    const searchInput = select.querySelector(".search-input");
    const optionsList = select.querySelector(".options-list");

    // Gestion de l'ouverture/fermeture du dropdown
    header.addEventListener("click", () => {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    // Filtrage des options en temps réel
    searchInput.addEventListener("input", (e) => {
      const filter = e.target.value.toLowerCase();
      const options = optionsList.querySelectorAll("li");

      options.forEach((option) => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(filter) ? "" : "none";
      });
    });

    // Sélection d'une option
    optionsList.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        addTag(
          select.id.replace("-select", ""),
          e.target.textContent,
          performSearch
        );
        dropdown.style.display = "none";
      }
    });
  });
}

// Gestion de la suppression des tags
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-tag")) {
    const selectId = e.target.closest(".tag").getAttribute("data-select");
    const value = e.target.closest(".tag").getAttribute("data-value");
    removeTag(selectId, value, performSearch);
  }
});

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  initializeCustomSelects();
  displayRecipes(recipes, recipesContainer, (count) =>
    updateRecipeCount(count, nbRecipeSpan)
  );
  updateAvailableTags(recipes, populateOptionsList);

  // Gestion des flèches pour les menus déroulants
  document.querySelectorAll(".select-header").forEach((header) => {
    header.addEventListener("click", () => {
      const customSelect = header.parentElement;
      const dropdown = header.nextElementSibling;
      const arrow = header.querySelector(".arrow");

      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        arrow.classList.remove("up");
        arrow.classList.add("down");
      } else {
        dropdown.classList.add("show");
        arrow.classList.remove("down");
        arrow.classList.add("up");
      }
    });
  });
});
