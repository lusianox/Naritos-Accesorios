let aritos = [];

fetch("./js/aritos.json")
    .then(response => response.json())
    .then(data => {
        aritos = data;
        cargarProductosAritos(aritos);
    })

const contenedorAritos = document.querySelector("#contenedor-aritos");

let collares = [];

fetch("./js/collares.json")
    .then(response => response.json())
    .then(data => {
        collares = data;
        cargarProductosCollares(collares);
    })

const contenedorCollares = document.querySelector("#contenedor-collares");



function agregarProducto(producto) {
    carrito.push(producto);
    console.log("Producto agregado al carrito:", producto);
}

function cargarProductosAritos(productosElegidos) {
    contenedorAritos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        if (producto.tipoImagen === "simple") {
            div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `;
        } else {
            div.innerHTML = `
                <div id="carousel-${producto.id}" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                    ${producto.imagenes.map((imagen, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img class="d-block w-100" id="aritos-nuevos" src="${imagen}" alt="${producto.titulo}">
                        </div>
                    `).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${producto.id}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${producto.id}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Siguiente</span>
                    </button>
                </div>
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `;
        }
        contenedorAritos.append(div);
    })
    actualizarBotonesAgregar();
  }

function cargarProductosCollares(productosElegidos) {
    contenedorCollares.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorCollares.append(div);
    })
    actualizarBotonesAgregar();
}

let carrito = [];


function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
    });
  }

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#f4c6a3",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    let productoAgregado;
    if (aritos.find(producto => producto.id === idBoton)) {
        productoAgregado = aritos.find(producto => producto.id === idBoton);
    } else {
        productoAgregado = collares.find(producto => producto.id === idBoton);
    }

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const productoActualizado = productosEnCarrito.map(producto =>
            producto.id === idBoton
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto
        );
        productosEnCarrito = productoActualizado;
    } else {
        productoAgregado = {...productoAgregado, cantidad: 1};
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    actualizarNumerito();
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}






