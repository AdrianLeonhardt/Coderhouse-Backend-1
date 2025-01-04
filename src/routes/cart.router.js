import { request, response, Router } from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();
const cartController = new CartController();

// Ruta para obtener todos los carritos
router.get("/", (req, res) => cartController.getAllCarts(req, res));

// Ruta para obtener un carrito por ID
router.get("/:cid", (req, res) => cartController.getCartById(req, res));

// Ruta para crear un nuevo carrito
router.post("/", (req, res) => cartController.createCart(req, res));

// Ruta para agregar un producto al carrito
router.post("/:cid/products/:pid", (req, res) => cartController.addProductToCart(req, res));

// Ruta para eliminar un producto del carrito
router.delete("/:cid/products/:pid", (req, res) => cartController.removeProductFromCart(req, res));

// Ruta para vaciar el carrito
router.delete("/:cid", (req, res) => cartController.clearCart(req, res));

// Ruta para actualizar la cantidad de un producto en el carrito
router.put("/:cid/products/:pid", (req, res) => cartController.updateProductQuantity(req, res));

// Ruta para actualizar todos los productos del carrito
router.put("/:cid", (req, res) => cartController.updateCartProducts(req, res));

// Ruta para finalizar la compra del carrito
router.post('/:cid/purchase', async (req, res) => {
    console.log("Ruta /carts/:cid/purchase recibida");
    try {
        const cartId = req.params.cid;
        console.log("Cart ID:", cartId);
        await cartController.purchaseCart(req, res); 
    } catch (error) {
        console.error("Error en la compra:", error);
        res.status(500).send("Error al procesar la compra");
    }
});




export default router;