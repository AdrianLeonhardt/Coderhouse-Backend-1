import { request, response, Router } from "express";
// import CartManager from "../dao/managers/cartManager.js";
//import { session } from "passport";
import CartController from "../controllers/cart.controller.js";

// const cartManager = new CartManager();
const router = Router();
const cartController = new CartController();

// // Ruta para obtener todos los carritos de nuestra base de datos
// router.get("/", async (request, response) => {
//     try {
//         const carritos = await cartManager.getCarritos(); 
//         response.status(200).send(carritos);
//     } catch (error) {
//         console.error("Error al obtener los carritos:", error);
//         response.status(500).send({ message: "Error interno del servidor", error: error.message });
//     }
// });

// // Ruta para obtener un carrito específico por ID
// router.get("/:cid", async (request, response) => {
//     const { cid } = request.params;
//     try {
//         const carritoBuscado = await cartManager.getCarritoById(cid);
//         return response.send(carritoBuscado);
//     } catch (error) {
//         response.status(404).send(error.message);
//     }
// });

// // Ruta para crear un nuevo carrito
// router.post("/", async (request, response) => {
//     try {
//         const nuevoCarrito = await cartManager.crearCarrito(); 
//         response.status(201).send({ message: "Carrito creado con éxito", nuevoCarrito });
//     } catch (error) {
//         console.error("Error al crear el carrito:", error);
//         response.status(500).send({ message: "Error interno del servidor", error: error.message });
//     }
// });

// // Ruta para agregar un producto al carrito
// router.post("/:cid/products/:pid", async (request, response) => {
//     const { cid, pid } = request.params;
//     const { quantity } = request.body;
//     try {
//         const carritoActualizado = await cartManager.agregarProductoAlCarrito(cid, pid, quantity);
//         response.send({ message: "Producto agregado al carrito con éxito", carritoActualizado });
//     } catch (error) {
//         console.error("Error al agregar el producto:", error);
//         response.status(500).send({ message: "Error interno del servidor", error: error.message });
//     }
// })

// // Ruta para actualizar todos los productos del carrito
// router.put("/:cid", async (request, response) => {
//     const { cid } = request.params;
//     const { products } = request.body;
//     try {
//         const carritoActualizado = await cartManager.actualizarProductosDelCarrito(cid, products);
//         response.send({ message: "Carrito actualizado con éxito", carritoActualizado });
//     } catch (error) {
//         console.error("Error al actualizar el carrito:", error);
//         response.status(500).send({ message: "Error interno del servidor", error: error.message });
//     }
// });

// // Ruta para actualizar solo la cantidad de un producto en el carrito
// router.put("/:cid/products/:pid", async (request, response) => {
//     const { cid, pid } = request.params;
//     const { quantity } = request.body;
//     try {
//         const carritoActualizado = await cartManager.actualizarCantidadProducto(cid, pid, quantity);
//         response.send({ message: "Cantidad de producto actualizada con éxito", carritoActualizado });
//     } catch (error) {
//         console.error("Error al actualizar la cantidad del producto:", error);
//         response.status(500).send({ message: "Error interno del servidor", error: error.message });
//     }
// });

// // Ruta para eliminar un producto del carrito
// router.delete("/:cid/products/:pid", async (request, response) => {
//     const { cid, pid } = request.params;
//     try {
//         const carritoActualizado = await cartManager.eliminarProductoDelCarrito(cid, pid);
//         response.send({ message: "Producto eliminado del carrito con éxito", carritoActualizado });
//     } catch (error) {
//         console.error("Error al eliminar el producto:", error);
//         response.status(500).send({ message: "Error interno del servidor", error: error.message });
//     }
// });

// // Ruta para eliminar todos los productos del carrito
// router.delete("/:cid", async (request, response) => {
//     const { cid } = request.params;
//     try {
//         const carritoVaciado = await cartManager.vaciarCarrito(cid);
//         response.send({ message: "Todos los productos han sido eliminados del carrito", carritoVaciado });
//     } catch (error) {
//         console.error("Error al vaciar el carrito:", error);
//         response.status(500).send({ message: "Error interno del servidor", error: error.message });
//     }
// });

// // Ruta para finalizar la compra del carrito (Terminar de crear el cartcontroller)
// ///router.post("/:cid/purchase", passpoort.authenticate("current", {session: false}), CartController.purchaseCart);

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

// Ruta para finalizar la compra del carrito // Falta terminarla
router.post("/:cid/purchase", (req, res) => cartController.purchaseCart(req, res));

export default router;