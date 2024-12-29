import { request, response, Router } from "express";
import ProductModel from "../dao/models/product.model.js";
import CartModel from "../dao/models/cart.model.js";

import { role } from "../middleware/auth.js";
import passport from "passport";

const router = Router();

router.get("/products", passport.authenticate("current", {session:false}), role("user"), async (request, response) => {
    let page = request.query.page || 1;
    let limit = 3;
    try {
        const productosListado = await ProductModel.paginate({}, { limit, page });

        //Traemos el array de docs 
        const productosFinal = productosListado.docs.map(producto => {
            const { _id, ...rest } = producto.toObject();
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

router.get("/realtimeproducts", passport.authenticate("current", {session:false}), role("admin") , async (request, response) => {
    
    try {
        response.render("realtimeproducts");
    } catch (error) {
        console.error(error);
        response.status(500).send("Error al cargar productos");
    }
    
    
})

router.get("/carts/:cid", async (request, response) => {
    try {
        const cartId = request.params.cid; // Obtenemos el ID del carrito desde la URL
        const cart = await CartModel.findById(cartId).populate("products.product").lean();
        
        if (!cart) {
            return response.status(404).send("Carrito no encontrado");
        }

        response.render("carts", { cart });
    } catch (error) {
        console.log(error);
        response.status(500).send("Error del servidor");
    }
});

//Vista de rutas de login y register
router.get("/login", async (request, response)=>{
    response.render("login");
});

router.get("/register", async (request, response)=>{
    response.render("register");
});


export default router;
