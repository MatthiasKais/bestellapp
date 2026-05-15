import { addToBasket } from "./basket.js";
import { getFromLocalStorage, saveToLocalStorage } from "./storage.js";

export function render(menu) {
  document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = renderMenu(menu);

    // 1. Warenkorb laden
    const basket = getFromLocalStorage("basket") || {};

    // 2. Buttons aktualisieren
    menu.category.forEach((category) => {
      category.dishes.forEach((dish) => {
        if (basket[dish.id]) {
          const button = document.getElementById(`btn-${dish.id}`);
          button.textContent = `Added ${basket[dish.id].quantity}`;
          button.disabled = true;
        }
      });
    });
    const basketContainer = document.getElementById("basket-container");
    basketContainer.innerHTML = renderBasket();
  });
}

function renderMenu(menu) {
  return menu.category.map((category) => renderCategory(category));
}

function renderCategory(category) {
  return `
    <section>
      <header class="menu-header">
        <div class="menu-container">
          <img class="section-menu-img" src="${category.headerimage}" alt="${category.name}" />
          <h2>${category.name}</h2>
        </div>
      </header>
      <div class="dishes-container">
        ${category.dishes.map((dish) => renderDish(dish)).join("")}
      </div>
    </section>
  `;
}

function renderDish(dish) {
  return `
    <div class="single-dish-container menu-wrapper"  >
      <img class="single-dish-img" src="${dish.image}" alt="${dish.name}" />
      <div>
        <h3>${dish.name}</h3>
        <p class="single-dish-description">${dish.description}</p>
      </div>
      <div class="single-dish-prize-container">
        <h3>${dish.price.toFixed(2)}€</h3>
          <button
          id="btn-${dish.id}"
          onclick="addToBasket('${dish.id}', '${dish.name}', ${dish.price})">
          Add to basket
        </button>
      </div>
    </div>
  `;
}

function renderBasket() {
  let localStorageValue = window.localStorage.length;
  if (localStorageValue === 0) {
    return renderEmptyBasket();
  } else {
    console.log("Yes");
  }

}

function renderEmptyBasket() {
  return `
    <div id="basket-container" class="basket basket-empty">
    <h3> Your Basket <h3>
    <p> Nothing here yet. <br> Go ahead and choose something delicious!<p>
    <img src="assets/icons/basket.svg" alt="Empty Basket"/>  
    </div>
  `;
}

function renderFilledBasket() {
  return `
    <div id="basket-container" class="basket-filled"></div>
  `;
}
