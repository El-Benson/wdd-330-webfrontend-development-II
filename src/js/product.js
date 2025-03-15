import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Function to add product to cart
function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// Add to Cart button event handler
async function addToCartHandler(e) {
  try {
    const productId = e.target.dataset.id;
    const product = await dataSource.findProductById(productId);

    if (product) {
      addProductToCart(product);
      console.log("Product added to cart:", product);
    } else {
      console.error("Product not found.");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

// Add event listener to "Add to Cart" button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
