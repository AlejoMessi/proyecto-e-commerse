const contenedorProductos =  document.querySelector("#contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
// funcion para los botones de agregar
let botonesAgregar = document.querySelectorAll(".producto-agregar");
// funcion de actualizar numerito del carrito
const numerito = document.querySelector("#numerito ")


function cargarProductos (productosElegidos) {

    contenedorProductos.innerHTML = ""; 

    productosElegidos.forEach(producto => {

        // crea el html de la card de los productos
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                        <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalle">
                            <h3 class="producto-titulo">${producto.titulo}</h3>

                            <p class="producto-precio">${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}">Agregar</button>
                        </div>
                        `
        
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();

}

cargarProductos(productos);

botonesCategoria.forEach(boton =>{
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        // el current target es para modificar todos los elementos del div
        // el target solo, modifica uno solo
        if (e.currentTarget.id !="todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
      
    });
}

// esto es del carrito
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    //para agregar al array   
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    // para que el objeto sume la cantidad y no se cree otro objeto
    //el some, da como resultado un true o false
    //el index es la posicion en la que estan los objetos
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    //aca almacenamos en el local storage los productos
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    // suma todos los productos en carrito
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    //modifica el numerito del carrito
    numerito.innerText = nuevoNumerito;
}

