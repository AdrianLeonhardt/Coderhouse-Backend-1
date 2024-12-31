import CartRepository from "../repository/cart.repository.js";
import CartDTO from "../dto/cart.dto.js";

class CartService {
    constructor() {
        this.cartRepository = CartRepository;
    }

    async createCart() {
        const newCart = await this.cartRepository.createCart();
        return new CartDTO(newCart);
    }

    async getAllCarts() {
        const carts = await this.cartRepository.getAllCarts();
        return carts.map(cart => new CartDTO(cart));
    }

    async getCartById(cartId) {
        const cart = await this.cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        return new CartDTO(cart);
    }

    async addProductToCart(cartId, productId, quantity) {
        const updatedCart = await this.cartRepository.addProductToCart(cartId, productId, quantity);
        return new CartDTO(updatedCart);
    }

    async removeProductFromCart(cartId, productId) {
        const updatedCart = await this.cartRepository.removeProductFromCart(cartId, productId);
        return new CartDTO(updatedCart);
    }

    async clearCart(cartId) {
        const clearedCart = await this.cartRepository.clearCart(cartId);
        return new CartDTO(clearedCart);
    }

    async updateCartProducts(cartId, products) {
        const updatedCart = await this.cartRepository.updateCartProducts(cartId, products);
        return new CartDTO(updatedCart);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const updatedCart = await this.cartRepository.updateProductQuantity(cartId, productId, quantity);
        return new CartDTO(updatedCart);
    }
}

export default new CartService;