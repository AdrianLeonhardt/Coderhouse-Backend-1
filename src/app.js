import express from "express";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

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

//Rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

//Iniciamos el servidor

//Inicia el servidor Express y hace que escuche en el puerto especificado, mostrando un mensaje en la consola cuando el servidor está funcionando.
app.listen(puerto, ()=>{
    console.log(`Servidor funcionando en ${puerto}`);
})