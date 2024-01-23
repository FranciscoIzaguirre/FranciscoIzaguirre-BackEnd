const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const products = await this.readProductsFile();
      product.id = this.generateProductId(products);
      products.push(product);
      await this.writeProductsFile(products);
      console.log("Producto agregado:", product);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  }

  async getProducts() {
    try {
      const products = await this.readProductsFile();
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.readProductsFile();
      const product = products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado con el ID:", id);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return null;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      let products = await this.readProductsFile();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        await this.writeProductsFile(products);
        console.log("Producto actualizado:", products[index]);
      } else {
        console.error("Producto no encontrado con el ID:", id);
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.readProductsFile();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        await this.writeProductsFile(products);
        console.log("Producto eliminado:", deletedProduct);
      } else {
        console.error("Producto no encontrado con el ID:", id);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  async readProductsFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          try {
            resolve(JSON.parse(data) || []);
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  }

  async writeProductsFile(products) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  generateProductId(products) {
    const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }
}


const productManager = new ProductManager('productos.json');


productManager.addProduct({
  title: "Producto 1",
  description: "Descripción 1",
  price: 20,
  thumbnail: "imagen1.jpg",
  code: "ABC123",
  stock: 10
});


productManager.getProducts().then(products => console.log("Todos los productos:", products));


productManager.getProductById(1).then(product => console.log("Producto por ID:", product));


productManager.updateProduct(1, { price: 25, stock: 15 });


productManager.deleteProduct(1);
