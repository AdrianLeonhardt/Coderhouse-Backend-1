import express from "express";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/viewsRouter.js";
import ProductManager from "./managers/productManager.js";

const app = express();
const puerto = 8080;

//Verificamos que este funcionando el servidor
//Configura una ruta GET en la raíz ("/") que responde con el texto "probando servidor".
app.get("/", (request, response)=>{
    response.send("probando servidor");
})

//Middleware
//Le decimos al servidor que vamos a trabajar con JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));


//Express-Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


//Rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRouter);


//Inicia el servidor Express y hace que escuche en el puerto especificado, mostrando un mensaje en la consola cuando el servidor está funcionando.
const httpServer = app.listen(puerto, ()=>{
    console.log(`Servidor funcionando en ${puerto}`);
})


//Iniciamos el servidor Socket.io
const io = new Server(httpServer);


//Obtenemos el array de productos
const manager = new ProductManager("./src/data/products.json");

io.on("connection", async (socket)=>{
    console.log(`Un cliente ${socket.id} se conecto`);

    //Pasamos el array de productos por socket
    socket.emit("products", await manager.getProducts());

    // Manejamos la eliminación de productos
    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id); 
        const updatedProducts = await manager.getProducts();
        io.emit("products", updatedProducts); 
    });

    // Manejamos la creación de productos
    socket.on("addProduct", async (product) => {
        await manager.addProduct(product);
        const updatedProducts = await manager.getProducts();
        io.emit("products", updatedProducts);
    });

})