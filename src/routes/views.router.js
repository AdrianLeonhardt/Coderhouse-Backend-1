import { request, response, Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const manager = new ProductManager();

 //Renderizado con Handlebars

router.get("/products", async (request, response) => {

     //Recuperamos datos del manager
     const products = await manager.getProducts();


     response.render("index", { products });
 })


//Renderizado Web socket

 router.get("/realtimeproducts", async (request, response)=>{
     response.render("realtimeproducts");
 })

 export default router;
