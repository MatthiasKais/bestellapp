import { menu } from "./scripts/db.js";
import { renderMenu, renderBasket } from "./scripts/templates.js";
import { saveToLocalStorage, getFromLocalStorage } from "./scripts/storage.js";

window.menu = menu;

// Initialisierung
window.init = function (menu) {
  renderMenu(menu);
  renderBasket();
  localStorage.clear();
};

// Bestellbestätigung
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

// Close-Button für die Message-Box
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

// Event-Listener für den Warenkorb-Button (nur einmal registrieren)
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('button-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const basketOverlay = document.getElementById('basket-overlay');
      if (basketOverlay) {
        basketOverlay.classList.toggle('basket-overlay--hidden');
        if (!basketOverlay.classList.contains('basket-overlay--hidden')) {
          renderBasket();
        }
      }
    });
  }
});

// Funktion, um den Warenkorb basierend auf der Bildschirmgröße neu zu rendern
function handleResize() {
  const basket = getFromLocalStorage("basket") || {};
  const basketItems = Object.values(basket).filter(item => item.id);

  const isMobile = window.innerWidth <= 425;

  const desktopContainer = document.getElementById("desktop-basket-container");
  const mobileContainer = document.getElementById("mobile-basket-container");

  if (desktopContainer) {
    desktopContainer.style.display = isMobile ? "none" : "block";
  }

  if (mobileContainer) {
    mobileContainer.style.display = isMobile ? "block" : "none";
  }

  if (basketItems.length > 0 || !isMobile) {
    renderBasket();
  }
}

// Event-Listener für das Ändern der Bildschirmgröße
window.addEventListener("resize", handleResize);

// Initialen Aufruf von handleResize
handleResize();

// Initialisierung aufrufen
window.init(menu);
