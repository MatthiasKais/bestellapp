import {menu} from "./scripts/db.js";
import {render} from "./scripts/templates.js";
import {saveToLocalStorage, getFromLocalStorage} from "./scripts/storage.js";

init(menu);

function init(menu){
  render(menu)
}


window.deliveryPlaced = function() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("hidden");
    localStorage.clear();
    
    setTimeout(() => {
        overlay.classList.add("hidden");
        window.location.reload();
    }, 3000);
  
};

document.getElementById("closeButton")?.addEventListener("click", function() {
  const overlay = document.getElementById("overlay");
  overlay.classList.add("hidden");
  window.location.reload(); // Seite neu laden
});


