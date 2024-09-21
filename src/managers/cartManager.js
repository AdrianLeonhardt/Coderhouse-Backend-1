import { promises as fs } from "fs";

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.ultId = 0;

        // Cargar los carritos almacenados en el archivo
        this.cargarCarritos();
    }

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                // Calcular el último ID
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.log("Error al cargar el carrito", error);
            // Si no existe el archivo, lo voy a crear
            await this.guardarCarritos();
        }
    }

    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    // Método para crear un carrito
    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        };

        // Agregar el nuevo carrito al array
        this.carts.push(nuevoCarrito);
        await this.guardarCarritos(); // Guardar cambios en el archivo
        return nuevoCarrito; // Retornar el nuevo carrito
    }

    async getCarritoById(carritoId) {
        const carritoBuscado = this.carts.find(carrito => carrito.id === carritoId);
        if (!carritoBuscado) {
            throw new Error("No existe un carrito con ese id");
        }
        return carritoBuscado;
    }

    //Comentado para probar
    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        const carrito = await this.getCarritoById(carritoId);
        const existeProducto = carrito.products.find(producto => producto.product === productoId);

        // Verificar si el producto ya está en el carrito
        if (existeProducto) {
            existeProducto.quantity += quantity; // Incrementar la cantidad
        } else {
            carrito.products.push({ product: productoId, quantity }); // Agregar nuevo producto
        }

        // Guardar cambios en el archivo
        await this.guardarCarritos();
        return carrito; // Retornar el carrito actualizado
    }
}

export default CartManager;


//
// Crear un Carrito: Envía una solicitud POST a /api/carts para crear un nuevo carrito. Deberías ver el carrito en la respuesta y también en carts.json.

//Obtener Carrito por ID: Después de crear un carrito, utiliza el ID devuelto para hacer una solicitud GET a /api/carts/{id}. Deberías obtener los productos que contiene.

// Agregar Producto al Carrito: Envía una solicitud POST a /api/carts/{id}/product/{productId} con el cuerpo { "quantity": 1 }. Asegúrate de que el producto ya existe o simula su creación si es necesario.