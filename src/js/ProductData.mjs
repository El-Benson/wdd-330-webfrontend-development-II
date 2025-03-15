function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    try {
      const response = await fetch(`${baseURL}products/search/${this.category}`);
      const data = await convertToJson(response);
      return data.Result; // Assuming API response has a `Result` key
    } catch (error) {
      console.error("Error fetching product data:", error);
      return [];
    }
  }

  async findProductById(id) {
    try {
      const products = await this.getData();
      return products.find((item) => item.Id === id);
    } catch (error) {
      console.error("Error finding product by ID:", error);
      return null;
    }
  }
}
