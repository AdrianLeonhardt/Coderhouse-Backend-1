import { request, response, Router } from "express";
//import ProductModel from "../models/product.model.js";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager();
const router = Router();

// Ruta de prueba para verificar conexion
// router.get("/", (request, response)=>{
//     response.send ("todo ok");
// })

// // Ruta para obtener todos los productos de nuestra base de datos
// router.get("/", async (request, response) => {
//     try {
//         const productos = await ProductModel.find()
//         response.send(productos);
//     } catch (error) {
//         response.status(500).send("Error del servidor al buscar los clientes");
//     }
// })

// Ruta para obtener todos los productos de nuestra base de datos
router.get("/", async (request, response) => {
    try {
        const productos = await productManager.getProducts();
        response.status(200).send(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error); // Muestra el error en la consola
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});

// // Ruta para obtener un producto específico por ID
// router.get("/:id", async (request,response) => {
//     let {id} = request.params;
//     try {
//         const productBuscado = await ProductModel.findById(id);
//         if (productBuscado) {
//             return response.send(productBuscado);
//         } else {
//             return response.send("No se encontro el producto con ese ID");
//         } 
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// })

// Ruta para obtener un producto específico por ID
router.get("/:id", async (request, response) => {
     const { id } = request.params;
     try {
         const productBuscado = await productManager.getProductById(id);
         response.status(200).send(productBuscado);
     } catch (error) {
         response.status(404).send({ message: error.message });
    }
});

// // Ruta para agregar un nuevo producto
// router.post("/", async (request, response) => {
//     try {
//         const nuevoProducto = new ProductModel(request.body);
//         await nuevoProducto.save();
//         response.send({message: "Producto cargado con exito", nuevoProducto});
//     } catch (error) {
//         response.status(500).send("Error interno del servidor");
//     }
// })

// Ruta para agregar un nuevo producto
router.post("/", async (request, response) => {
    try {
        const nuevoProducto = await productManager.addProduct(request.body);
        response.status(201).send({ message: "Producto cargado con éxito", nuevoProducto });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        response.status(500).send({ message: "Error interno del servidor", error: error.message });
    }
});

// // Ruta para actualizar un producto por su ID
// router.put("/:id", async (request, response) => {
//     try {
//         const producto = await ProductModel.findByIdAndUpdate(request.params.id, request.body); 

//         response.status(200).send({message: "Producto actualizado con exito", producto});
//     } catch (error) {
//         response.status(500).send("Error interno del servidor"); 
//     }
// })

// Ruta para actualizar un producto por su ID
router.put("/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const productoActualizado = await productManager.updateProduct(id, request.body);
        response.status(200).send({ message: "Producto actualizado con éxito", productoActualizado });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        response.status(404).send({ message: error.message });
    }
});

// // Ruta para eliminar un producto por su ID
// router.delete("/:id", async (request, response) => {
//     try {
//         const producto = await ProductModel.findByIdAndDelete(request.params.id);
//         if(!producto){
//             return response.status(404).send("Producto no encontrado");
//         }
//         response.status(200).send({message: "Producto borrado con exito"});
//     } catch (error) {
//         response.status(500).send("Error interno del servidor: ", error);
//     }
// })

// Ruta para eliminar un producto por su ID
router.delete("/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const productoEliminado = await productManager.deleteProduct(id);
        response.status(200).send({ message: "Producto borrado con éxito", productoEliminado });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        response.status(404).send({ message: error.message });
    }
});

export default router;