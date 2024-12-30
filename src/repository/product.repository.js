import ProductModel from "../dao/models/product.model.js";

class ProductRepository {

    async createProduct(productData) {
        const product = new ProductModel(productData);
        return await product.save();
    }

    async getProducts(query = {}, options = {}){
        return await ProductModel.paginate(query, {}, options);
    }

    async getProductById(id) {
        return await ProductModel.findById(id);
    }

    async updateProduct(id, updatedProductData) {
        return await ProductModel.findByIdAndUpdate(id, updatedProductData, { new: true });
    }

    async deleteProduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default new ProductRepository();