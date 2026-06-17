import { addToBasket } from "./basket.js";
import { getFromLocalStorage, saveToLocalStorage } from "./storage.js";

export function renderMenu(menu) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = menu.category
    .map((category) => renderTemplateCategory(category))
    .join("");
}



function renderTemplateCategory(category) {
  return `
    <section class="menu__section--container">
      <header class="menu__header">
        <div class="menu__container">
          <img
            class="menu__img"
            src="${category.headerimage}"
            alt="${category.name}"
          />
          <h2 class="menu__title">${category.name}</h2>
        </div>
      </header>
      <div class="menu__dishes">
        ${category.dishes
      .map(
        (dish) => `
              <div class="dish">
                <img
                  class="dish__img"
                  src="${dish.image}"
                  alt="${dish.name}"
                />
                <div class="dish__container">
                  <h3 class="dish__name">${dish.name}</h3>
                  <p class="dish__description">${dish.description}</p>
                </div>
                <div class="dish__price-container">
                  <h3 class="dish__price">${dish.price.toFixed(2)}€</h3>
                  <button onclick="addToBasket('${dish.id}', '${dish.name}', ${dish.price}, 'add'); renderBasket()"  class="dish__add-button" id="btn-${dish.id}">
                    Add to basket
                  </button>
                </div>
              </div>
            `,
      )
      .join("")}
      </div>
    </section>
  `;
}

export function renderBasket() {
  const basket = getFromLocalStorage("basket") || {};
  const basketItems = Object.values(basket).filter(item => item.id);

  // Prüfe, ob wir auf Mobile sind
  const isMobile = window.innerWidth <= 425;

  // Wähle den richtigen Container
  const basketContainer = isMobile
    ? document.getElementById("mobile-basket-container")
    : document.getElementById("desktop-basket-container");

  if (!basketContainer) return;

  if (basketItems.length === 0) {
    renderEmptyBasket(basketContainer);
  } else {
    renderFilledBasket(basketItems, basket, basketContainer);
  }
}

function renderEmptyBasket(container) {
  container.innerHTML = `
    <div class="basket basket--empty">
      <h3 class="basket__headline">Your Basket</h3>
      <p class="basket__text-empty">Nothing here yet. <br> Go ahead and choose something delicious!</p>
      <img class="basket__img-empty" src="assets/icons/basket.svg" alt="Empty Basket"/>
    </div>
  `;
}

function renderFilledBasket(basketItems, basket, container) {
  container.innerHTML = `
    <div class="basket basket--filled">
      <h3 class="basket__title">Your Basket</h3>
      <ul id="basket-items" class="basket__items">
        ${basketItems.map((dish) => renderBasketSingleDish(dish)).join("")}
      </ul>
      <div class="basket__total">
        <div class="basket__total-line">
          <p>Subtotal</p> <p>${basket.total.toFixed(2) || 0}€</p>
        </div>
        <div class="basket__total-line">
          <p>Delivery fee:</p> <p>4.99€</p>
        </div>
        <hr class="basket__divider" />
        <div class="basket__total-line basket__total-line--final">
          <p>Total:</p> <p>${(basket.total + 4.99).toFixed(2) || 0}€</p>
        </div>
      </div>
      <button class="basket__checkout-button" onclick="showOrderConfirmation()">
        <p>Buy now</p> <span>(${(basket.total + 4.99).toFixed(2) || 0}€)</span>
      </button>
    </div>
  `;
}


function renderBasketSingleDish(dish) {
  return `
    <li class="basket__item" id="basket-item-${dish.id}">
      <div class="basket__item-details">
        <p class="basket__item-quantity">${dish.quantity} x ${dish.name}</p>
        <div class="basket__item-controls">
          <div>
            <button onclick="addToBasket('${dish.id}', '${dish.name}', ${dish.price}, 'remove'); updateBasketItem('${dish.id}')">
              <img
                id="img-trash-minus-${dish.id}"
                src="assets/icons/${dish.quantity > 1 ? 'minus.svg' : 'trash.svg'}"
                class="basket__control-icon ${dish.quantity > 1 ? 'basket__control--remove' : 'basket__control--remove basket__control--trash'}"
              />
            </button>
            <p class="basket__item-quantity-value">${dish.quantity}</p>
            <button onclick="addToBasket('${dish.id}', '${dish.name}', ${dish.price}, 'add'); updateBasketItem('${dish.id}')">
              <img src="assets/icons/plus.svg" class="basket__control-icon">
            </button>
          </div>
          <p class="basket__item-price">${dish.totalPrice.toFixed(2)}€</p>
        </div>
      </div>
    </li>
  `;
}

function updateBasketItem(dishId) {
  const basket = getFromLocalStorage("basket") || {};
  const dish = basket[dishId];

  if (!dish) {
    const itemElement = document.getElementById(`basket-item-${dishId}`);
    if (itemElement) {
      itemElement.remove();
    }
  }

  saveToLocalStorage("basket", basket);

  const basketItems = Object.values(basket).filter(item => item.id);
  const isMobile = window.innerWidth <= 425;
  const container = isMobile
    ? document.getElementById("mobile-basket-container")
    : document.getElementById("desktop-basket-container");

  if (basketItems.length === 0 && container) {
    renderEmptyBasket(container);
  } else {
    if (dish && container) {
      const newItemHTML = renderBasketSingleDish(dish);
      const itemElement = document.getElementById(`basket-item-${dishId}`);
      if (itemElement) {
        itemElement.outerHTML = newItemHTML;
      }
    }
    if (container) {
      renderBasketTotal(basket);
    }
  }
}

function renderBasketTotal(basket) {
  const basketItems = Object.values(basket).filter(item => item.id);
  if (basketItems.length === 0) {
    renderEmptyBasket();
    return;
  }

  const subtotal = basket.total || 0;
  const deliveryFee = 4.99;
  const total = subtotal + deliveryFee;

  const subtotalElement = document.querySelector(".basket__total-line:first-child p:last-child");
  if (subtotalElement) {
    subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
  }

  const totalElement = document.querySelector(".basket__total-line--final p:last-child");
  if (totalElement) {
    totalElement.textContent = `${total.toFixed(2)}€`;
  }

  const buyNowButton = document.querySelector(".basket__checkout-button span");
  if (buyNowButton) {
    buyNowButton.textContent = `(${total.toFixed(2)}€)`;
  }
}


window.renderBasket = renderBasket;
window.renderBasketTotal = renderBasketTotal;
window.renderEmptyBasket = renderEmptyBasket;
window.updateBasketItem = updateBasketItem;