function renderDish(dish) {
  return `
    <div class="single-dish-container">
      <img class="single-dish-img" src="${dish.image}" alt="${dish.name}" />
      <div>
        <h3>${dish.name}</h3>
        <p class="single-dish-description">${dish.description}</p>
      </div>
      <div class="single-dish-prize-container">
        <h3>${dish.price}€</h3>
        <button>Add to basket</button>
      </div>
    </div>
  `;
}

function renderCategory(category) {
  return `
    <section id="${category.name.toLowerCase().replace(/\s+/g, '')}-section" class="menu-section">
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
}

export function renderMenu(menu) {
  return menu.category.map(category => renderCategory(category)).join('');
}

export function addToBakestButton() {}
