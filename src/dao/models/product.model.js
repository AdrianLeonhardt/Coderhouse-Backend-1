import mongoose from "mongoose";
import moongoosePaginate from "mongoose-paginate-v2";

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

//Primero ponemos el plugin para instanciar Paginate
productSchema.plugin(moongoosePaginate);

//Definimos el modelo: 
//Le pasamos el nombre de la colección como primer parametro y el segundo el schema donde se configura el documento. 
const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;