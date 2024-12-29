import CartModel from '../models/cart.model.js';

class CartManager {
    // Método para crear un carrito
    async crearCarrito() {
        const nuevoCarrito = new CartModel();
        await nuevoCarrito.save(); // Guarda en MongoDB
        return nuevoCarrito; 
    }

    // Método para obtener todos los carritos
    async getCarritos() {
        return await CartModel.find(); 
    }

    // Método para obtener un carrito por ID
    async getCarritoById(carritoId) {
        const carritoBuscado = await CartModel.findById(carritoId).populate("products.product");
        if (!carritoBuscado) {
            throw new Error("No existe un carrito con ese id");
        }
        return carritoBuscado;
    }

    // Método para agregar un producto al carrito
    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        const carrito = await this.getCarritoById(carritoId);
        const existeProducto = carrito.products.find(producto => producto.product.toString() === productoId);

        if (existeProducto) {
            existeProducto.quantity += quantity; 
        } else {
            carrito.products.push({ product: productoId, quantity }); // Agregar nuevo producto
        }

        await carrito.save(); 
        return carrito; 
    }

    // Método para eliminar un producto del carrito
    async eliminarProductoDelCarrito(carritoId, productoId) {
        const carrito = await this.getCarritoById(carritoId);
        carrito.products = carrito.products.filter(p => p.product.toString() !== productoId);
        await carrito.save(); 
        return carrito; 
    }

    // Método para vaciar el carrito
    async vaciarCarrito(carritoId) {
        const carrito = await this.getCarritoById(carritoId);
        carrito.products = []; 
        await carrito.save(); 
        return carrito; 
    }

    // Método para actualizar todos los productos del carrito
    async actualizarProductosDelCarrito(carritoId, productos) {
        const carrito = await CartModel.findById(carritoId);
        if (!carrito) {
            throw new Error("Carrito no encontrado");
        }

        carrito.products = productos; // Actualiza todos los productos
        await carrito.save(); 
        return carrito; 
    }

    // Método para actualizar solo la cantidad de un producto en el carrito
    async actualizarCantidadProducto(carritoId, productoId, quantity) {
        const carrito = await this.getCarritoById(carritoId);
        const producto = carrito.products.find(p => p.product.toString() === productoId);

        if (!producto) {
            throw new Error("Producto no encontrado en el carrito");
        }

        producto.quantity = quantity; 
        await carrito.save();
        return carrito; 
    }
}

export default CartManager;

