let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3 id="caca1">${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p id="caca2">${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Desea vaciar el carrito?',
        icon: 'question',
        html: `Se eliminarán ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

// ------------------------------------------------------------------------------ PAGO EN EFECTIVO ----------------------------------------------------------------------

function efectivo(){
    let inputProducto = { valor: document.getElementById("caca1").innerHTML, id: document.getElementById("caca1").id };
    let inputCantidad = { valor: document.getElementById("caca2").innerHTML, id: document.getElementById("caca2").id };
    let inputTotal = { valor: document.getElementById("total").innerHTML, id: document.getElementById("total").id };

    function ConstructorPedido(producto, cantidad, total) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.total = total;
    }

    let producto = inputProducto.valor;
    let cantidad = inputCantidad.valor;
    let total = inputTotal.valor;

    
    const nuevoPedido = new ConstructorPedido(inputProducto, inputCantidad, inputTotal);

    console.log(nuevoPedido);

    window.location.href = 'https://api.whatsapp.com/send?phone=+5491168985455&text=%20Web:' + ' ¡NUEVO PEDIDO! ' + ' Producto: ' + JSON.stringify(inputProducto.valor) + ' ' + '- Cantidad: ' + JSON.stringify(inputCantidad.valor) + ' ' + '- Precio final: ' + JSON.stringify(inputTotal.valor) + ' ' + '- PAGO EN EFECTIVO ';
}

// -------------------------------------------------------------------------------- PAGO CON MERCADO PAGO --------------------------------------------------------------------

function mp(){
    let inputProducto = { valor: document.getElementById("caca1").innerHTML, id: document.getElementById("caca1").id };
    let inputCantidad = { valor: document.getElementById("caca2").innerHTML, id: document.getElementById("caca2").id };
    let inputTotal = { valor: document.getElementById("total").innerHTML, id: document.getElementById("total").id };

    function ConstructorPedido(producto, cantidad, total) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.total = total;
    }

    let producto = inputProducto.valor;
    let cantidad = inputCantidad.valor;
    let total = inputTotal.valor;

    
    const nuevoPedido = new ConstructorPedido(inputProducto, inputCantidad, inputTotal);

    console.log(nuevoPedido);

    window.location.href = 'https://api.whatsapp.com/send?phone=+5491168985455&text=%20Web:' + ' ¡NUEVO PEDIDO! ' + ' Producto: ' + JSON.stringify(inputProducto.valor) + ' ' + '- Cantidad: ' + JSON.stringify(inputCantidad.valor) + ' ' + '- Precio final: ' + JSON.stringify(inputTotal.valor) + ' ' + '- TRANSFERENCIA MERCADO PAGO';
}


// ------------------------------------------------------------------------ PAGO CON TRANSFERENCIA BANCARIA ----------------------------------------------------------------------

function banco(){
    let inputProducto = { valor: document.getElementById("caca1").innerHTML, id: document.getElementById("caca1").id };
    let inputCantidad = { valor: document.getElementById("caca2").innerHTML, id: document.getElementById("caca2").id };
    let inputTotal = { valor: document.getElementById("total").innerHTML, id: document.getElementById("total").id };

    function ConstructorPedido(producto, cantidad, total) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.total = total;
    }

    let producto = inputProducto.valor;
    let cantidad = inputCantidad.valor;
    let total = inputTotal.valor;

    
    const nuevoPedido = new ConstructorPedido(inputProducto, inputCantidad, inputTotal);

    console.log(nuevoPedido);

window.location.href = 'https://api.whatsapp.com/send?phone=+5491168985455&text=%20Web:' + ' ¡NUEVO PEDIDO! ' + ' Producto: ' + JSON.stringify(inputProducto.valor) + ' ' + '- Cantidad: ' + JSON.stringify(inputCantidad.valor) + ' ' + '- Precio final: ' + JSON.stringify(inputTotal.valor) + ' ' + '- TRANSFERENCIA BANCARIA ';

}
