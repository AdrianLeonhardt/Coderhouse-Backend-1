import { request, response, Router } from "express";
const router = Router();
import ProductManager from "../managers/productManager.js";


const manager = new ProductManager("./src/data/products.json");

//Punto 1 

router.get("/products", async (request, response) => {

    //Recuperamos datos del manager
    const productos = await manager.getProducts();


    response.render("index", { productos });
})


// Punto 2 Web socket

router.get("/realtimeproducts", async (request, response)=>{
    response.render("realtimeproducts");
})

export default router;