import { menu } from "./scripts/db.js";
import { renderMenu, renderBasket } from "./scripts/templates.js";
import { saveToLocalStorage, getFromLocalStorage } from "./scripts/storage.js";

window.menu = menu;

window.init = function (menu) {
  renderMenu(menu);
  renderBasket();
  localStorage.clear();
};

window.showOrderConfirmation = function() {
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.remove("overlay--hidden");
    localStorage.clear();

    setTimeout(() => {
      overlay.classList.add("overlay--hidden");
      window.location.reload();
    }, 3000);
  }
};

document.querySelector(".message-box__close-button")?.addEventListener("click", function() {
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.classList.add("overlay--hidden");
    localStorage.clear();
    const mobileContainer = document.getElementById("mobile-basket-container");
    const desktopContainer = document.getElementById("desktop-basket-container");
    if (mobileContainer) renderEmptyBasket(mobileContainer);
    if (desktopContainer) renderEmptyBasket(desktopContainer);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('button-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const basketOverlay = document.getElementById('basket-overlay');
      if (basketOverlay && window.innerWidth <= 1024) {
        basketOverlay.classList.toggle('basket-overlay--hidden');
        if (!basketOverlay.classList.contains('basket-overlay--hidden')) {
          renderBasket();
        }
      }
    });
  }
});

function handleResize() {
  const basket = getFromLocalStorage("basket") || {};
  const basketItems = Object.values(basket).filter(item => item.id);

  const isMobile = window.innerWidth <= 1024;

  const desktopContainer = document.getElementById("desktop-basket-container");
  const mobileContainer = document.getElementById("mobile-basket-container");
  const basketOverlay = document.getElementById("basket-overlay");
  const toggleButton = document.getElementById("button-toggle");

  if (desktopContainer) {
    desktopContainer.style.display = isMobile ? "none" : "block";
  }
  if (mobileContainer) {
    mobileContainer.style.display = isMobile ? "block" : "none";
  }

  if (toggleButton) {
    toggleButton.style.display = isMobile ? "block" : "none";
  }

  if (basketOverlay) {
    basketOverlay.classList.add('basket-overlay--hidden');
  }

  if (basketItems.length > 0 || !isMobile) {
    renderBasket();
  }
}



window.addEventListener("load", handleResize);
window.addEventListener("resize", handleResize);

handleResize();

window.init(menu);
