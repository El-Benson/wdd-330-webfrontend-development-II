import ProductData from "./ProductData.mjs";
import { renderListWithTemplate, getParam } from "./utils.mjs";

export default class ProductList {
  constructor(category, apiBaseUrl, listElement) {
    this.category = category;
    this.productData = new ProductData(apiBaseUrl);
    this.listElement = listElement;
  }

  /**
   * Initialize product listing by fetching and rendering products.
   */
  async init() {
    try {
      const products = await this.productData.getProductsByCategory(this.category);
      if (products.length === 0) {
        this.listElement.innerHTML = "<p>No products available in this category.</p>";
        return;
      }
      this.renderProductList(products);
    } catch (error) {
      console.error("Error initializing product list:", error);
      this.listElement.innerHTML = "<p>Error loading products. Please try again later.</p>";
    }
  }

  /**
   * Render the list of products.
   * @param {Array} productList - The list of products to render.
   */
  renderProductList(productList) {
    const template = document.getElementById("product-card-template");
    renderListWithTemplate(template, this.listElement, productList, this.prepareProductTemplate);
  }

  /**
   * Prepare product template with data.
   * @param {Element} templateClone - The cloned product template element.
   * @param {Object} product - The product data.
   */
  prepareProductTemplate(templateClone, product) {
    templateClone.querySelector(".product-name").textContent = product.name;
    templateClone.querySelector(".product-image").src = product.image;
    templateClone.querySelector(".product-image").alt = product.name;
    templateClone.querySelector(".product-price").textContent = `$${product.price.toFixed(2)}`;
    templateClone.querySelector(".product-link").href = `product_pages/index.html?product=${product.id}`;
  }
}
