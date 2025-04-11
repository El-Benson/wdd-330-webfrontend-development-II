/**
 * Fetches an HTML template file and returns it as a string.
 * @param {string} path - The path to the HTML template file.
 * @returns {Promise<string>} - The HTML content as a string.
 */
export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load template: ${path}`);
  return await response.text();
}

/**
* Loads and inserts the header and footer dynamically.
*/
export async function loadHeaderFooter() {
  document.querySelector("header").innerHTML = await loadTemplate("/partials/header.html");
  document.querySelector("footer").innerHTML = await loadTemplate("/partials/footer.html");
}

/**
* Renders an HTML template using a given data object.
* @param {string} template - The HTML template string.
* @param {object} data - The data object to populate the template.
* @returns {string} - The populated HTML string.
*/
export function renderWithTemplate(template, data) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || "");
}

/**
* Renders a list of items using a template.
* @param {string} template - The HTML template string.
* @param {Array} list - The array of data objects.
* @param {Element} targetElement - The container where the rendered HTML should be inserted.
*/
export function renderListWithTemplate(template, list, targetElement) {
  targetElement.innerHTML = list.map(item => renderWithTemplate(template, item)).join("");
}

/**
* Retrieves data from local storage.
* @param {string} key - The storage key.
* @returns {any} - The parsed JSON object or null if not found.
*/
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
* Saves data to local storage.
* @param {string} key - The storage key.
* @param {any} data - The data to store.
*/
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
* Formats a number as a currency string.
* @param {number} amount - The number to format.
* @param {string} [currency="USD"] - The currency code (default: USD).
* @returns {string} - The formatted currency string.
*/
export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

/**
* Retrieves URL parameters.
* @param {string} param - The parameter key.
* @returns {string|null} - The parameter value or null if not found.
*/
export function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
* Displays an alert message to the user.
* @param {string} message - The message to display.
* @param {string} [type="info"] - The alert type (info, success, warning, error).
*/
export function showAlert(message, type = "info") {
  const alertBox = document.createElement("div");
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 3000);
}

/**
* Validates an email address format.
* @param {string} email - The email address.
* @returns {boolean} - True if valid, otherwise false.
*/
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
* Validates a phone number format.
* @param {string} phone - The phone number.
* @returns {boolean} - True if valid, otherwise false.
*/
export function validatePhoneNumber(phone) {
  const regex = /^\d{10}$/; // Example: 1234567890
  return regex.test(phone);
}

/**
* Adds an item to the shopping cart in local storage.
* @param {object} product - The product object.
*/
export function addToCart(product) {
  const cart = getLocalStorage("cart") || [];
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      cart.push({ ...product, quantity: 1 });
  }
  setLocalStorage("cart", cart);
  showAlert("Product added to cart!", "success");
}

/**
* Removes an item from the shopping cart in local storage.
* @param {string} productId - The product ID.
*/
export function removeFromCart(productId) {
  let cart = getLocalStorage("cart") || [];
  cart = cart.filter(item => item.id !== productId);
  setLocalStorage("cart", cart);
  showAlert("Product removed from cart!", "warning");
}

/**
* Calculates the total price of items in the cart.
* @returns {number} - The total price.
*/
export function calculateCartTotal() {
  const cart = getLocalStorage("cart") || [];
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
* Updates the cart badge with the number of items.
*/
export function updateCartBadge() {
  const cart = getLocalStorage("cart") || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.querySelector("#cart-badge");
  if (cartBadge) {
      cartBadge.textContent = cartCount;
  }
}

/**
* Clears the shopping cart.
*/
export function clearCart() {
  setLocalStorage("cart", []);
  updateCartBadge();
  showAlert("Cart cleared!", "info");
}

/**
* Fetches product data from an external API.
* @param {string} url - The API endpoint.
* @returns {Promise<object[]>} - The product data.
*/
export async function fetchProductData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data: ${url}`);
  return await response.json();
}
