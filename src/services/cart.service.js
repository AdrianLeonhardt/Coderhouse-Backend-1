import CartRepository from "../repository/cart.repository.js";
import CartDTO from "../dto/cart.dto.js";
import CartModel from "../dao/models/cart.model.js";
import UserModel from "../dao/models/user.model.js";

import TicketModel from "../dao/models/ticket.model.js";

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

    //CODIGO OK
    async purchaseCart(cartId, purchaseData) {
    console.log("Procesando compra para el carrito ID:", cartId);
    console.log("Datos de la compra:", purchaseData);

    const cart = await CartModel.findById(cartId).populate('products.product');
    if (!cart) {
        throw new Error("Carrito no encontrado");
    }

    let totalAmount = 0;
    cart.products.forEach(item => {

        const product = item.product;
        if (product && product.price && item.quantity) {
            totalAmount += product.price * item.quantity;
        } else {
            console.log("Error con un producto en el carrito:", item);
        }
    });

    if (isNaN(totalAmount) || totalAmount <= 0) {
        throw new Error("El monto total de la compra no es válido");
    }

    const purchaserName = purchaseData.purchaser ? purchaseData.purchaser : "Desconocido";

    const newTicket = new TicketModel({
        cart: cartId,  
        amount: totalAmount,  
        purchaser: purchaserName,  
    });

    await newTicket.save();

    cart.status = "comprado";
    await cart.save();

    return { success: true, ticket: newTicket };  
    }

    
    
}

 export default new CartService;
