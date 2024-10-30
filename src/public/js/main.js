const socket = io();

//Conectamos mediante socket.io
socket.on("products", (data) => {
    //console.log(data);
    renderProductos(data);
});

//Funcion para renderizar productos desde el json
const renderProductos = (products) => {
    const contenedorProducts = document.getElementById("contenedorProducts");
    contenedorProducts.innerHTML = ""; // Limpia el contenedor antes de renderizar

    //Usamos foreach y creamos una vista de cada producto
    products.forEach(element => {
        const card = document.createElement("div");

        card.className = "product-card col-md-4 mb-4";

        card.innerHTML = 
        `   
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">"ID"${element._id}</p>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text"><strong>Código:</strong> ${element.code}</p>
                    <p class="card-text"><strong>Precio:</strong> $${element.price}</p>
                    <p class="card-text"><strong>Estado:</strong> ${element.status ? 'Activo' : 'Inactivo'}</p>
                    <p class="card-text"><strong>Stock:</strong> ${element.stock}</p>
                    <p class="card-text"><strong>Categoría:</strong> ${element.category}</p>
                    <p class="card-text"><strong>Thumbnails:</strong> ${element.thumbnails}</p>
                    <button class="btn btn-danger" onclick="eliminarProducto('${element._id}')">Eliminar</button>
                </div>
            </div>
        `;
        contenedorProducts.appendChild(card);
    });
}

//Función para eliminar un producto
const eliminarProducto = (id) => {
    socket.emit("deleteProduct", id);
};

//Funcion para agregar un producto
const agregarProducto = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = parseFloat(document.getElementById("price").value);
    const status = document.getElementById("status").checked;
    const stock = parseInt(document.getElementById("stock").value);
    const category = document.getElementById("category").value;
    const thumbnails = document.getElementById("thumbnails").value;

    const nuevoProducto = { title, description, code, price, status, stock, category, thumbnails };

    socket.emit("addProduct", nuevoProducto); // Enviamos el nuevo producto al servidor

    // Limpiar el formulario después de enviar
    document.getElementById("productForm").reset();
};

//Funcion para agregar un producto al carrito por ID
const agregarProductoAlCarrito =  () => {
    
}
