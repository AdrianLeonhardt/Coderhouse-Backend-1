import ProductModel from "../models/product.model.js";

class ProductManager {
    async addProduct(productData) {
        const nuevoProducto = new ProductModel(productData);
        await nuevoProducto.save();
        return nuevoProducto;
    }

    async getProducts() {
        return await ProductModel.find().lean(); // Retorna todos los productos de la base de datos
    }

    async getProductById(id) {
        const product = await ProductModel.findById(id);
        if (!product) throw new Error("Producto no encontrado");
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const productoActualizado = await ProductModel.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!productoActualizado) throw new Error("Producto no encontrado");
        return productoActualizado;
    }

    async deleteProduct(id) {
        const productoEliminado = await ProductModel.findByIdAndDelete(id);
        if (!productoEliminado) throw new Error("Producto no encontrado");
        return productoEliminado;
    }
}

export default ProductManager;
