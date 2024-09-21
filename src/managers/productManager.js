import { promises as filesystem } from "fs";

class ProductManager {
    static ultimoId = 0;

    // Constructor que inicializa el array de productos y la ruta
    constructor(path) {
        this.products = [];
        this.path = path;
        this.cargarArray(); // Carga los productos al iniciar
    }

    // Carga los productos desde el archivo al array this.products
    async cargarArray() {
        try {
            this.products = await this.leerArchivo();
        } catch (error) {
            console.error("Error al inicializar el product manager", error);
        }
    }

    // Lee el archivo y retorna los datos
    async leerArchivo() {
        try {
            const data = await filesystem.readFile(this.path, "utf-8");
            return JSON.parse(data); // Devuelve el contenido como objeto
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return []; // Retorna un array vacío en caso de error
        }
    }

    // Guarda los productos en el archivo JSON
    async guardarArchivo(products) {
        try {
            await filesystem.writeFile(this.path, JSON.stringify(products, null, 2)); // Guarda en formato JSON
        } catch (error) {
            console.error("Error al guardar el archivo:", error);
        }
    }

    // Agrega un nuevo producto al array y guarda los cambios
    async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
        // Validamos que se ingresen todos los campos
        if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnails) {
            console.log("Necesitamos que completes todos los campos");
            return;
        }

        // Validamos que no se repita el campo código
        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
        }

        // Creamos el nuevo producto
        const nuevoProducto = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1, // ID autoincrementable
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        // Guardamos el nuevo producto en el array
        this.products.push(nuevoProducto);

        // Lo guardamos en el archivo
        await this.guardarArchivo(this.products);
        return nuevoProducto; // Retorna el nuevo producto
    }

    // Devuelve todos los productos
    async getProducts() {
        return this.products; // Retorna el array de productos
    }

    // Busca un producto por ID
    async getProductById(id) {
        const product = this.products.find(item => item.id === id);
        return product || "Not found"; // Retorna el producto o un mensaje de error
    }

    // Actualiza un producto existente
    async updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) throw new Error("Not found"); // Error si el producto no existe

        // Actualiza los campos sin cambiar el ID
        this.products[index] = { ...this.products[index], ...updatedProduct };
        await this.guardarArchivo(this.products); // Guarda los cambios en el archivo
    }

    // Elimina un producto por ID
    async deleteProduct(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) throw new Error("Not found"); // Error si el producto no existe

        this.products.splice(index, 1); // Elimina el producto del array
        await this.guardarArchivo(this.products); // Guarda los cambios en el archivo
    }
}

export default ProductManager; // Exporta la clase para su uso en otras partes
