import ProductData from "./ProductData.mjs";

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;
const productData = new ProductData(apiBaseUrl);

// Fetch all products
productData.getAllProducts().then(products => console.log(products));

// Fetch a single product by ID
const productId = "12345";
productData.getProductById(productId).then(product => console.log(product));

// Fetch products by category
const category = "Tents";
productData.getProductsByCategory(category).then(products => console.log(products));
export default class ProductData {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Fetch all products from the API.
   * @returns {Promise<Array>} A promise that resolves to an array of products.
   */
  async getAllProducts() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/products`);
      if (!response.ok) throw new Error("Failed to fetch products.");
      return await response.json();
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  }

  /**
   * Fetch a single product by ID.
   * @param {string} productId - The ID of the product to fetch.
   * @returns {Promise<Object>} A promise that resolves to the product object.
   */
  async getProductById(productId) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/products/${productId}`);
      if (!response.ok) throw new Error("Product not found.");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return null;
    }
  }

  /**
   * Fetch products based on a specific category.
   * @param {string} category - The category to filter products by.
   * @returns {Promise<Array>} A promise that resolves to an array of filtered products.
   */
  async getProductsByCategory(category) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/products?category=${category}`);
      if (!response.ok) throw new Error("Failed to fetch category products.");
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      return [];
    }
  }
}
