import { fetchProductData, getUrlParam, renderWithTemplate } from "./utils.mjs";
import { addToCart } from "./cart.mjs";

const productDetailElement = document.querySelector("#product-details");
const addToCartButton = document.querySelector("#add-to-cart");

// Get product ID from URL parameters
const productId = getUrlParam("id");

/**
 * Loads product details dynamically based on product ID.
 */
async function loadProductDetails() {
    try {
        if (!productId) {
            throw new Error("No product ID provided in the URL.");
        }

        const apiUrl = `${import.meta.env.VITE_SERVER_URL}/products/${productId}`;
        const product = await fetchProductData(apiUrl);

        if (!product) {
            throw new Error("Product not found.");
        }

        // Load product details template
        const productTemplate = await fetch("/partials/product-detail.html").then(res => res.text());

        // Render product details on the page
        renderWithTemplate(productTemplate, product, productDetailElement);

        // Set event listener for Add to Cart button
        if (addToCartButton) {
            addToCartButton.addEventListener("click", () => {
                addToCart(product);
                alert(`${product.name} has been added to your cart.`);
            });
        }
    } catch (error) {
        console.error("Error loading product details:", error);
        productDetailElement.innerHTML = `<p class="error">Failed to load product details. Please try again later.</p>`;
    }
}

// Initialize product details page
loadProductDetails();
