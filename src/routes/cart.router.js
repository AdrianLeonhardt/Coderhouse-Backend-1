import { request, response, Router } from "express";
//import CartModel from "../models/cart.model.js";
import CartManager from "../dao/managers/cartManager.js";

const cartManager = new CartManager();//Creamos una variable para instanciar al CarManager()
const router = Router();

// // Ruta para obtener todos los carritos de nuestra base de datos
// router.get("/", async (request, response) => {
//     try {
//         const carritos = await CartModel.find();
//         response.send(carritos);
//     } catch (error) {
//         response.status(500).send("Error del servidor al buscar los carritos");
//     }
// })

// Ruta para obtener todos los carritos de nuestra base de datos
router.get("/", async (request, response) => {
    try {
        const carritos = await cartManager.getCarritos(); // Suponiendo que tienes un método getCarritos en tu CartManager
        response.status(200).send(carritos);
    } catch (error) {
        console.error("Error al obtener los carritos:", error); // Muestra el error en la consola
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});

// // Ruta para obtener un carrito específico por ID, usando populate
// router.get("/:cid", async (request, response) => {
//     const { cid } = request.params;
//     try {
//         const carritoBuscado = await CartModel.findById(cid).populate("products.product");
//         if (carritoBuscado) {
//             return response.send(carritoBuscado);
//         } else {
//             return response.status(404).send("No se encontró el carrito con ese ID");
//         }
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// });

// Ruta para obtener un carrito específico por ID
router.get("/:cid", async (request, response) => {
    const { cid } = request.params;
    try {
        const carritoBuscado = await cartManager.getCarritoById(cid);
        return response.send(carritoBuscado);
    } catch (error) {
        response.status(404).send(error.message);
    }
});

// // Ruta para agregar un nuevo carrito
// router.post("/", async (request, response) => {
//     try {
//         const nuevoCarrito = new CartModel(request.body);
//         await nuevoCarrito.save();
//         response.send({ message: "Carrito cargado con éxito", nuevoCarrito });
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// });

// Ruta para crear un nuevo carrito
router.post("/", async (request, response) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); // Llama al método de crear carrito
        response.status(201).send({ message: "Carrito creado con éxito", nuevoCarrito });
    } catch (error) {
        console.error("Error al crear el carrito:", error); // Agrega esta línea para ver el error en la consola
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});

// Ruta para agregar un producto al carrito
router.post("/:cid/products/:pid", async (request, response) => {
    const { cid, pid } = request.params;
    const { quantity } = request.body;
    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(cid, pid, quantity);
        response.send({ message: "Producto agregado al carrito con éxito", carritoActualizado });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
})

// // Ruta para actualizar todos los productos del carrito
// router.put("/:cid", async (request, response) => {
//     try {
//         const carritoActualizado = await CartModel.findByIdAndUpdate(
//             request.params.cid,
//             { products: request.body.products }, // actualiza todos los productos
//             { new: true }
//         );
//         if (!carritoActualizado) {
//             return response.status(404).send("Carrito no encontrado");
//         }
//         response.send({ message: "Carrito actualizado con éxito", carritoActualizado });
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// });

// Ruta para actualizar todos los productos del carrito
router.put("/:cid", async (request, response) => {
    const { cid } = request.params;
    const { products } = request.body;
    try {
        const carritoActualizado = await cartManager.actualizarProductosDelCarrito(cid, products);
        response.send({ message: "Carrito actualizado con éxito", carritoActualizado });
    } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});

// // Ruta para actualizar solo la cantidad de un producto en el carrito
// router.put("/:cid/products/:pid", async (request, response) => {
//     const { cid, pid } = request.params;
//     const { quantity } = request.body;
//     try {
//         const carrito = await CartModel.findById(cid);
//         if (!carrito) {
//             return response.status(404).send("Carrito no encontrado");
//         }
        
//         const producto = carrito.products.find(p => p.product.toString() === pid);
//         if (!producto) {
//             return response.status(404).send("Producto no encontrado en el carrito");
//         }

//         producto.quantity = quantity; // Actualiza la cantidad
//         await carrito.save();

//         response.send({ message: "Cantidad de producto actualizada con éxito", carrito });
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// });

// Ruta para actualizar solo la cantidad de un producto en el carrito
router.put("/:cid/products/:pid", async (request, response) => {
    const { cid, pid } = request.params;
    const { quantity } = request.body;
    try {
        const carritoActualizado = await cartManager.actualizarCantidadProducto(cid, pid, quantity);
        response.send({ message: "Cantidad de producto actualizada con éxito", carritoActualizado });
    } catch (error) {
        console.error("Error al actualizar la cantidad del producto:", error);
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});

// // Ruta para eliminar un producto del carrito
// router.delete("/:cid/products/:pid", async (request, response) => {
//     const { cid, pid } = request.params;
//     try {
//         const carrito = await CartModel.findById(cid);
//         if (!carrito) {
//             return response.status(404).send("Carrito no encontrado");
//         }

//         carrito.products = carrito.products.filter(p => p.product.toString() !== pid);
//         await carrito.save();

//         response.send({ message: "Producto eliminado del carrito con éxito", carrito });
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// });

// Ruta para eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (request, response) => {
    const { cid, pid } = request.params;
    try {
        const carritoActualizado = await cartManager.eliminarProductoDelCarrito(cid, pid);
        response.send({ message: "Producto eliminado del carrito con éxito", carritoActualizado });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});

// Ruta para eliminar todos los productos del carrito
// router.delete("/:cid", async (request, response) => {
//     const { cid } = request.params;
//     try {
//         const carrito = await CartModel.findById(cid);
//         if (!carrito) {
//             return response.status(404).send("Carrito no encontrado");
//         }

//         carrito.products = []; // Vacía el array de productos
//         await carrito.save();

//         response.send({ message: "Todos los productos han sido eliminados del carrito" });
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// });

// Ruta para eliminar todos los productos del carrito
router.delete("/:cid", async (request, response) => {
    const { cid } = request.params;
    try {
        const carritoVaciado = await cartManager.vaciarCarrito(cid);
        response.send({ message: "Todos los productos han sido eliminados del carrito", carritoVaciado });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});


export default router;