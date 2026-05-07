import {menu} from "./db.js";
import {renderMenu} from "./templates.js";


const headerNameBurgerSandwiches = document.getElementById('burgersandwiches');
const headerNamePizza = document.getElementById('pizza');
const headerNameSalad = document.getElementById('salad');

document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = renderMenu(menu);
});
