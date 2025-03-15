export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    async init() {
      const products = await this.dataSource.getData(this.category);
      this.renderList(products);
    }
  
    renderList(products) {
      this.listElement.innerHTML = products.map(this.renderProduct).join('');
    }
  
    renderProduct(product) {
      return `
        <div class="product-card">
          <a href="product_detail.html?productId=${product.Id}">
            <img src="${product.PrimaryMedium}" alt="${product.Name}">
            <h3>${product.Name}</h3>
            <p>${product.FinalPrice}</p>
          </a>
        </div>
      `;
    }
  }
  