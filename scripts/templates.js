import { addToBasket} from "./basket.js";
import { getFromLocalStorage, saveToLocalStorage, } from "./storage.js";

export function render(menu) {
  document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = renderMenu(menu);

    const overlay = document.getElementById("overlay");
    overlay.classList.add("hidden");

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
          onclick="addToBasket('${dish.id}', '${dish.name}', ${dish.price}, ); renderBasket()">
          Add to basket
        </button>
      </div>
    </div>
  `;
}


window.renderBasket = function() {
  const basketContainer = document.getElementById("basket-container");
  let localStorageValue = window.localStorage.length;
  if (localStorageValue === 0) {
    return basketContainer.innerHTML = renderEmptyBasket();
  } else {
    return basketContainer.innerHTML = renderFilledBasket();
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
  const basket = getFromLocalStorage("basket") || {};
  const basketItems = Object.values(basket).filter(item => item.id); // Filtert nur die Gerichte (nicht "total")

  if (basketItems.length === 0) {
    return renderEmptyBasket();
  }

  return `
    <div id="basket-container" class=" basket basket-filled">
      <h3>Your Basket</h3>
        <ul class="basket-items">
          ${basketItems.map(dish => `
            <li class="basket-added-items">
              <div class="basket-single-item">
                <p>${dish.quantity} x  ${dish.name} </p>
                <div class="add-remove-items">
                  <div>
                    <button
                      onclick="addToBasket('${dish.id}', '${dish.name}', ${dish.price}, 'remove'); renderBasket()"
                    >
                    <img
                      id="img-trash-minus-${dish.id}"
                      src="assets/icons/${dish.quantity > 1 ? 'minus.svg' : 'trash.svg'}"
                      class="remove-items ${dish.quantity > 1 ? 'minus-icon' : 'trash-icon'}" 
                    />
                    </button>
                    <p>${dish.quantity}
                    </p>
                    <button
                      onclick="addToBasket('${dish.id}', '${dish.name}', ${dish.price}, 'add'); renderBasket()">
                      <img src="assets/icons/plus.svg" class="add-items">
                    </button>
                  </div>
                    <p>${dish.totalPrice.toFixed(2)}€</p>
                </div>
              </div>
            </li>
          `).join("")}
        </ul>
      <div class="basket-total">
        <div class="subtotal">
          <p>Subtotal</p> <p>${basket.total.toFixed(2) || 0}€</p> 
        </div>
        <div class="subtotal" >
          <p> Delivery fee:</p> <p> 4.99€ </p>
        </div>
        <p class="dividing-line"> </p>
        <div class="total-price">
          <p> Total: </p> <p>${(basket.total + 4.99).toFixed(2) || 0}€</p>
        </div>
      </div>
      <button class="checkout-button" onclick="deliveryPlaced()">
      <p>Buy now</p> <span>(${(basket.total + 4.99).toFixed(2) || 0}€)</span>
      </button>


    </div>
  `;
}


