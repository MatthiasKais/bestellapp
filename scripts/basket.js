import {getFromLocalStorage, saveToLocalStorage } from './storage.js';


export function addToBasket(dishId, dishName, dishPrice) {
  let basket = getFromLocalStorage("basket") || {};

  if (basket[dishId]) {
    basket[dishId].quantity += 1;
  } else {
    basket[dishId] = {
      id: dishId,
      name: dishName,
      price: dishPrice,
      quantity: 1,
    };
  }

  basket[dishId].totalPrice = basket[dishId].price * basket[dishId].quantity;

  let total = 0;
  for (const key in basket) {
    if (key !== "total") {
      total += basket[key].totalPrice;
    }
  }
  basket.total = total;
  saveToLocalStorage("basket", basket);

  const button = document.getElementById(`btn-${dishId}`);
  button.textContent = `Added ${basket[dishId].quantity}`;
  button.disabled = true;
  button.style.color = "white";
}

window.addToBasket = addToBasket;