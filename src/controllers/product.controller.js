import productService from "../services/product.service.js";

class ProductController {
    async addProduct(request, response) {
        try {
            const newProduct = await productService.addProduct(request.body);
            response.status(201).send({ message: "Producto agregado con éxito", product: newProduct });
        } catch (error) {
            console.error("Error al agregar producto:", error);
            response.status(500).send({ message: "Error interno del servidor", error: error.message });
        }
    }

    async getProducts(request, response) {
        try {
            const products = await productService.getProducts();
            response.status(200).send(products);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            response.status(500).send("Error al obtener los productos");
        }
    }

    async getProductsById(request, response) {
        const {id} = request.params;
        try {
            const product = await productService.getProductById(id);
            response.status(200).send(product);
        } catch (error) {
            console.error("Error al obtener producto:", error);
            response.status(404).send({ message: error.message });
        }
    }

    async updateProduct (request, response) {
        const {id} = request.params;
        try {
            const updatedProduct = await productService.updateProduct(id, request.body);
            response.status(200).send({ message: "Producto actualizado con éxito", updatedProduct });
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            response.status(404).send({ message: error.message });
        }
    }

    async deleteProduct(request, response) {
        const {id} = request.params;
        try {
            const deletedProduct = await productService.deleteProduct(id);
            response.status(200).send({ message: "Producto eliminado con éxito", deletedProduct });
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            response.status(404).send({ message: error.message });
        }
    }
}

export default new ProductController();

