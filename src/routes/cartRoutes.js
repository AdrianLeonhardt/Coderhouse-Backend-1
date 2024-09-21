import express from "express";
import CartManager from "../managers/cartManager.js"; // Asegúrate de que la ruta sea correcta
const cartManager = new CartManager("./src/data/carts.json");
const router = express.Router(); 

// La ruta raíz POST / deberá crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.status(201).json(nuevoCarrito); // Devuelve el nuevo carrito con estado 201
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});

// La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
router.get("/:cid", async (req, res) => {
    const carritoId = parseInt(req.params.cid); 

    try {
        const carritoBuscado = await cartManager.getCarritoById(carritoId); 
        res.json(carritoBuscado.products); // Devuelve los productos del carrito
    } catch (error) {
        console.error(error); // Imprime el error en la consola
        res.status(404).send("Carrito no encontrado");
    }
});

// La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado
router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = parseInt(req.params.cid); 
    const productId = parseInt(req.params.pid); 
    const quantity = req.body.quantity || 1; 

    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productId, quantity);
        res.json(carritoActualizado.products); // Devuelve los productos actualizados del carrito
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});

export default router;
