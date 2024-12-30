import productRepository from "../repository/product.repository.js";
import ProductDTO from "../dto/product.dto.js";

class ProductService {
    async addProduct(productData) {
        return await productRepository.createProduct(productData);
    }

    async getProducts() {
        const products = await productRepository.getProducts({}, { limit: 10, page: 1 });
        return products.docs.map(product => new ProductDTO(product));
    }

    async getProductById(id) {
        const product = await productRepository.getProductById(id);
        if (!product) throw new Error("Producto no encontrado");
        return new ProductDTO(product);
    }

    async updateProduct(id, updatedProductData) {
        const updatedProduct = await productRepository.updateProduct(id, updatedProductData);
        if (!updatedProduct) throw new Error("Producto no encontrado");
        return new ProductDTO(updatedProduct);
    }

    async deleteProduct(id) {
        const deletedProduct = await productRepository.deleteProduct(id);
        if (!deletedProduct) throw new Error("Producto no encontrado");
        return new ProductDTO(deletedProduct);
    }
}

export default new ProductService;