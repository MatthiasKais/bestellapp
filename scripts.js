import {menu} from "./scripts/db.js";
import {render} from "./scripts/templates.js";
import {saveToLocalStorage, getFromLocalStorage} from "./scripts/storage.js";

init(menu);

function init(menu){
  render(menu)
}


window.deliveryPlaced = function(menu) {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("hidden"); // Zeige die Meldung
    localStorage.clear();
    render(menu);

    // Verstecke die Meldung nach 3 Sekunden
    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 3000);
    

};


