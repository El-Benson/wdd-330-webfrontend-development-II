import { renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor(key) {
    this.key = key;
    this.cartItems = this.getCartItems();
    this.cartElement = document.querySelector("#cart-list");
  }

  /**
   * Initialize the cart by rendering items and setting up event listeners.
   */
  init() {
    this.renderCart();
    this.updateCartSummary();
  }

  /**
   * Get cart items from local storage.
   * @returns {Array} Cart items array.
   */
  getCartItems() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  /**
   * Save cart items to local storage.
   */
  saveCartItems() {
    localStorage.setItem(this.key, JSON.stringify(this.cartItems));
  }

  /**
   * Render the cart contents dynamically.
   */
  renderCart() {
    if (this.cartItems.length === 0) {
      this.cartElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
    const template = document.getElementById("cart-item-template");
    renderListWithTemplate(template, this.cartElement, this.cartItems, this.prepareCartItem);
  }

  /**
   * Prepare cart item template with data.
   * @param {Element} templateClone - The cloned cart item template.
   * @param {Object} item - The cart item data.
   */
  prepareCartItem(templateClone, item) {
    templateClone.querySelector(".cart-item-name").textContent = item.name;
    templateClone.querySelector(".cart-item-image").src = item.image;
    templateClone.querySelector(".cart-item-image").alt = item.name;
    templateClone.querySelector(".cart-item-price").textContent = `$${item.price.toFixed(2)}`;
    templateClone.querySelector(".cart-item-quantity").value = item.quantity;
    
    templateClone.querySelector(".remove-item").addEventListener("click", () => {
      this.removeItem(item.id);
    });

    templateClone.querySelector(".cart-item-quantity").addEventListener("change", (event) => {
      this.updateQuantity(item.id, parseInt(event.target.value));
    });
  }

  /**
   * Remove an item from the cart.
   * @param {string} productId - The ID of the product to remove.
   */
  removeItem(productId) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartItems();
    this.renderCart();
    this.updateCartSummary();
  }

  /**
   * Update the quantity of a cart item.
   * @param {string} productId - The ID of the product to update.
   * @param {number} newQuantity - The new quantity.
   */
  updateQuantity(productId, newQuantity) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && newQuantity > 0) {
      item.quantity = newQuantity;
      this.saveCartItems();
      this.updateCartSummary();
    } else {
      this.removeItem(productId);
    }
  }

  /**
   * Calculate and display cart summary (subtotal, tax, and total).
   */
  updateCartSummary() {
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.07; // Assuming 7% tax
    const total = subtotal + tax;

    document.querySelector("#cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#cart-tax").textContent = `$${tax.toFixed(2)}`;
    document.querySelector("#cart-total").textContent = `$${total.toFixed(2)}`;
  }
}
