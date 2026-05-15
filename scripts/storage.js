export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  const loadedData = JSON.parse(localStorage.getItem(key));
  return loadedData
}
