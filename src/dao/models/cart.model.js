import mongoose from "mongoose";

const productInCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo de producto
        ref: "products", // Nombre de la colección de productos
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // cantidad mínima debe ser 1
    }
});

const cartSchema = new mongoose.Schema({
    products: [productInCartSchema] // Array de productos en el carrito
});

// Definimos el modelo:
const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;
