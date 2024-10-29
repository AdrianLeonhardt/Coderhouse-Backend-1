import mongoose from "mongoose";

// const nombreCollection = "products";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: String
})

//Definimos el modelo: 
//Le pasamos el nombre de la colección como primer parametro y el segundo el schema donde se configura el documento. 
const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;