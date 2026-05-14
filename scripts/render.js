import {menu} from "./db.js";
import {renderMenu } from "./templates.js";
import {changeLabel} from "./templates.js";



document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = renderMenu(menu);
});

document.addEventListener("click", () => {
  const buttonBasket = document.getElementById('button-single-dish');
  buttonBasket.innerHTML = changeLabel(menu);
});




