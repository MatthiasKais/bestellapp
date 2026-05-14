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
        ${category.dishes.map(dish => renderDish(dish)).join('')}
      </div>
    </section>
  `;
};

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
        <button id="button-single-dish" onclick="changeLabel(menu)" >Add to basket</button>
      </div>
    </div>
  `;
};



export function renderMenu(menu) {
  return menu.category.map(category => renderCategory(category)).join('');
};

export function addToBakestButton() { };


export function changeLabel(menu) {
  return menu.category
    .flatMap(category => category.dishes)
    .map(dish => renderButtonSingleDishBasket(dish))
    .join('');
};



function renderButtonSingleDishBasket(dish) {
  return
  ` <button class="button-single-dish-pressed" id="button-single-dish"> Added ${dish.amount} </button>
  `;
};