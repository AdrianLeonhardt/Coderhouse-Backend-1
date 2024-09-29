import express from 'express';
import ProductManager from '../managers/productManager.js';

const router = express.Router();
const manager = new ProductManager('./src/data/products.json');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts(); 
        res.json(products); // 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' }); 
    }
});

// Ruta para obtener un producto específico por ID
router.get('/:pid', async (req, res) => {
    try {
        const product = await manager.getProductById(parseInt(req.params.pid)); //
        if (product === "Not found") return res.status(404).json({ error: "Not found" });
        res.json(product); // 
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' }); 
    }
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = await manager.addProduct(req.body); 
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

// Ruta para actualizar un producto existente
router.put('/:pid', async (req, res) => {
    try {
        await manager.updateProduct(parseInt(req.params.pid), req.body); 
        res.json({ message: "Producto actualizado" });
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
});

// Ruta para eliminar un producto
router.delete('/:pid', async (req, res) => {
    try {
        await manager.deleteProduct(parseInt(req.params.pid)); 
        res.json({ message: "Producto eliminado" }); 
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
});

export default router; // 

