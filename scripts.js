import {menu} from "./scripts/db.js";
import {render} from "./scripts/templates.js";
import {saveToLocalStorage, getFromLocalStorage} from "./scripts/storage.js"

init(menu)

function init(menu){
    render(menu)
    setEventListeners()
    localStorage.clear(); 'ACHTUNG! ->Setzt local storage auf null, für debug zwecke'
  }

function setEventListeners() {
  document.body.addEventListener("click", onclick);
}
