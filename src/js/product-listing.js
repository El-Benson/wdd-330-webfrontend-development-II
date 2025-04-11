import { fetchProductData, renderListWithTemplate, getUrlParam } from "./utils.mjs";

const productListElement = document.querySelector("#product-list");
const categoryTitleElement = document.querySelector("#category-title");

// Fetch category from URL parameters
const category = getUrlParam("category");

// Set page title dynamically based on category
if (categoryTitleElement) {
    categoryTitleElement.textContent = category ? `${category} Collection` : "All Products";
}

/**
 * Loads products based on the selected category and renders them on the page.
 */
async function loadProducts() {
    try {
        const apiUrl = import.meta.env.VITE_SERVER_URL + "/products";
        const products = await fetchProductData(apiUrl);

        // Filter products by category if a category is provided
        const filteredProducts = category ? products.filter(p => p.category === category) : products;

        // Load product card template
        const productTemplate = await fetch("/partials/product-card.html").then(res => res.text());

        // Render products on the page
        renderListWithTemplate(productTemplate, filteredProducts, productListElement);
    } catch (error) {
        console.error("Error loading products:", error);
        productListElement.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
    }
}

// Initialize product listing page
loadProducts();
