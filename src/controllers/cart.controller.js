import CartService from "../services/cart.service.js";

class CartController {
    constructor() {
        this.cartService =  CartService;
    }

    // Crear un carrito
    async createCart(req, res) {
        try {
            const newCart = await this.cartService.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ message: "Error al crear el carrito", error: error.message });
        }
    }

    // Obtener todos los carritos
    async getAllCarts(req, res) {
        try {
            const carts = await this.cartService.getAllCarts();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
        }
    }

    // Obtener un carrito por ID
    async getCartById(req, res) {
        const { cid } = req.params;
        try {
            const cart = await this.cartService.getCartById(cid);
            res.status(200).json(cart);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Agregar un producto al carrito
    async addProductToCart(req, res) {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        try {
            const updatedCart = await this.cartService.addProductToCart(cid, pid, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: "Error al agregar un producto al carrito", error: error.message });
        }
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(req, res) {
        const { cid, pid } = req.params;
        try {
            const updatedCart = await this.cartService.removeProductFromCart(cid, pid);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: "Error al borrar un producto", error: error.message });
        }
    }

    // Vaciar el carrito
    async clearCart(req, res) {
        const { cid } = req.params;
        try {
            const clearedCart = await this.cartService.clearCart(cid);
            res.status(200).json(clearedCart);
        } catch (error) {
            res.status(500).json({ message: "Error al vaciar el carrito", error: error.message });
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProductQuantity(req, res) {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        try {
            const updatedCart = await this.cartService.updateProductQuantity(cid, pid, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar la cantidad del producto", error: error.message });
        }
    }

    // Actualizar los productos del carrito
    async updateCartProducts(req, res) {
        const { cid } = req.params;
        const { products } = req.body;
        try {
            const updatedCart = await this.cartService.updateCartProducts(cid, products);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar los productos del carrito", error: error.message });
        }
    }

    // // Método para finalizar la compra
    async purchaseCart(req, res) {
        const { cid } = req.params;  
        try {
            const result = await this.cartService.purchaseCart(cid, req.body); 
            res.status(200).json({
                message: "Compra realizada con éxito",
                ticket: result.ticket  
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al procesar la compra",
                error: error.message
            });
        }
    }
}

export default CartController;