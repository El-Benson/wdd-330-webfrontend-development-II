export class ExternalServices {
    constructor() {
      this.baseUrl = "https://wdd330-backend.onrender.com";
    }
  
    async getProducts(category) {
      const response = await fetch(`${this.baseUrl}/products?category=${category}`);
      return await response.json();
    }
  
    async getProductById(id) {
      const response = await fetch(`${this.baseUrl}/products/${id}`);
      return await response.json();
    }
  
    async submitOrder(order) {
      const response = await fetch(`${this.baseUrl}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) throw new Error("Order submission failed.");
      return await response.json();
    }
  }
  