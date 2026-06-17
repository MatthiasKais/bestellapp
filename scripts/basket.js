import { getFromLocalStorage, saveToLocalStorage } from './storage.js';

export function addToBasket(dishId, dishName, dishPrice, state) {
  let basket = getFromLocalStorage("basket") || {};

  if (!basket[dishId]) {
    basket[dishId] = {
      id: dishId,
      name: dishName,
      price: dishPrice,
      quantity: 0,
    };
  }

  if (state === "add") {
    basket[dishId].quantity += 1;
  } else if (state === "remove") {
    basket[dishId].quantity -= 1;
    if (basket[dishId].quantity <= 0) {
      delete basket[dishId];
    }
  } else {
    basket[dishId].quantity = 1;
  }
  if (basket[dishId]) {
    basket[dishId].totalPrice = basket[dishId].price * basket[dishId].quantity;
  }


  let total = 0;
  for (const key in basket) {
    if (key !== "total") {
      total += basket[key].totalPrice;
    }
  }
  basket.total = total;
  saveToLocalStorage("basket", basket);

  buttonActualState(basket, dishId);

};

function buttonActualState(basket, dishId){
  const button = document.getElementById(`btn-${dishId}`);
  if (button) {
    if (basket[dishId]) {
      button.textContent = `Added ${basket[dishId].quantity}`;
      button.disabled = true;
      button.style.color = "white";
    } else {
      button.textContent = "Add to basket";
      button.disabled = false;
      button.style.color = "black";
    }
  }
};




window.addToBasket = addToBasket;

