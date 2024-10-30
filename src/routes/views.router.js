import { request, response, Router } from "express";
import ProductManager from "../managers/productManager.js";
import ProductModel from "../models/product.model.js";

const router = Router();
const manager = new ProductManager();

 //Renderizado con Handlebars

// router.get("/products", async (request, response) => {
//      //Recuperamos datos del manager
//      const products = await manager.getProducts();
//      response.render("index", { products });
//  })

router.get("/products", async (request, response) => {
    let page = request.query.page || 1;
    let limit = 3;
    try {
        const productosListado = await ProductModel.paginate({}, {limit, page});

        //Traemos el array de docs 
        const productosFinal = productosListado.docs.map(producto => {
            const {_id, ...rest} = producto.toObject();
            return rest;
        });

        response.render("index", {
            products: productosFinal,
            hasPrevPage: productosListado.hasPrevPage,
            hasNextPage: productosListado.hasNextPage,
            prevPage: productosListado.prevPage,
            nextPage: productosListado.nextPage,
            currentPage: productosListado.page,
            totalPages: productosListado.totalPages
        });

    } catch (error) {
        console.log(error);
        response.status(500).send("Error del servidor")
    }
})


//Renderizado Web socket

 router.get("/realtimeproducts", async (request, response)=>{
     response.render("realtimeproducts");
 })

 export default router;
