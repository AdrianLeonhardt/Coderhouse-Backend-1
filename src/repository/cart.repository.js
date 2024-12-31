import mongoose from "mongoose";
import CartModel from "../dao/models/cart.model.js";

class CartRepository {

    async createCart() {
        const newCart = new CartModel();
        return await newCart.save();
    }

    async getAllCarts() {
        return await CartModel.find();
    }

    async getCartById(cartId) {
        return await CartModel.findById(cartId).populate("products.product");
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(item => item.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }

    async removeProductFromCart(cartId, productId) {

    if (!mongoose.isValidObjectId(productId)) {
        return Promise.reject(new Error("Product ID inválido"));
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    return this.getCartById(cartId)
        .then(cart => {
            const filteredProducts = cart.products.filter(item => {
                return item.product._id.toString() !== productObjectId.toString();
            });

            cart.products = filteredProducts;
            return cart.save();
        })
        .then(updatedCart => {
            return updatedCart;
        })
        .catch(error => {
            throw error; 
        });
    }

    async clearCart(cartId) {
        const cart = await this.getCartById(cartId);
        cart.products = [];
        return await cart.save();
    }

    async updateCartProducts(cartId, products) {
        const cart = await this.getCartById(cartId);
        cart.products = products;
        return await cart.save();
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId); 
    
        const productObjectId = new mongoose.Types.ObjectId(productId);

        const populatedCart = await this.getCartById(cartId);

        const product = populatedCart.products.find(item => item.product._id.toString() === productObjectId.toString());
    
        if (product) {
            product.quantity = quantity;
            return await populatedCart.save();
        }
    
        console.log("Producto no encontrado en el carrito:", productId);
        throw new Error("Producto no encontrado en el carrito");
    }
    
    
}

export default new CartRepository();