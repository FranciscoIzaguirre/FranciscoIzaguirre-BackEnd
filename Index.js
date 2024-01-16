class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      
      if (this.products.some(product => product.code === code)) {
        console.error("Ya existe un producto con ese código");
        return;
      }
  
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
      console.log("Producto agregado:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado");
      }
    }
  }
  
 
  const productManager = new ProductManager();
  
  productManager.addProduct("Producto 1", "Descripción 1", 20, "imagen1.jpg", "ABC123", 10);
  productManager.addProduct("Producto 2", "Descripción 2", 30, "imagen2.jpg", "XYZ456", 15);
  
  console.log("Todos los productos:", productManager.getProducts());
  
  const productIdToFind = 2;
  const foundProduct = productManager.getProductById(productIdToFind);
  
  if (foundProduct) {
    console.log(`Producto encontrado con ID ${productIdToFind}:`, foundProduct);
  }
  