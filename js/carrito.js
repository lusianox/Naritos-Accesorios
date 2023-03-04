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
                    <h3 id="nombreProducto">${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p id="cantidadProducto">${producto.cantidad}</p>
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

function efectivo() {
    // Buscar todos los elementos con la clase "nombreProducto" y "cantidadProducto"
    const productos = document.querySelectorAll("#nombreProducto");
    const cantidades = document.querySelectorAll("#cantidadProducto");
  
    // Crear un array para almacenar todos los productos y cantidades
    const listaProductos = [];
  
    // Recorrer todos los elementos y agregar cada producto y cantidad al array
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i].innerHTML;
      const cantidad = cantidades[i].innerHTML;
      listaProductos.push({ producto, cantidad });
    }
  
    // Obtener el valor del campo "total"
    const total = document.getElementById("total").innerHTML;
  
    // Crear el mensaje con la lista de productos y el total
    let mensaje = "¡NUEVO PEDIDO!\n\n";
    for (let i = 0; i < listaProductos.length; i++) {
      const { producto, cantidad } = listaProductos[i];
      mensaje += `${producto} - Cantidad: ${cantidad}\n`;
    }
    mensaje += `\nPrecio total: ${total}\n\nPAGO EN EFECTIVO`;
  
    // Codificar el mensaje para incluirlo en la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
  
    // Redirigir a WhatsApp con el mensaje prellenado
    window.location.href = `https://api.whatsapp.com/send?phone=+5491168985455&text=${mensajeCodificado}`;
  }
  

// -------------------------------------------------------------------------------- PAGO CON MERCADO PAGO --------------------------------------------------------------------

function mp() {
    // Buscar todos los elementos con la clase "nombreProducto" y "cantidadProducto"
    const productos = document.querySelectorAll("#nombreProducto");
    const cantidades = document.querySelectorAll("#cantidadProducto");
  
    // Crear un array para almacenar todos los productos y cantidades
    const listaProductos = [];
  
    // Recorrer todos los elementos y agregar cada producto y cantidad al array
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i].innerHTML;
      const cantidad = cantidades[i].innerHTML;
      listaProductos.push({ producto, cantidad });
    }
  
    // Obtener el valor del campo "total"
    const total = document.getElementById("total").innerHTML;
  
    // Crear el mensaje con la lista de productos y el total
    let mensaje = "¡NUEVO PEDIDO!\n\n";
    for (let i = 0; i < listaProductos.length; i++) {
      const { producto, cantidad } = listaProductos[i];
      mensaje += `${producto} - Cantidad: ${cantidad}\n`;
    }
    mensaje += `\nPrecio total: ${total}\n\nPAGO POR MERCADO PAGO`;
  
    // Codificar el mensaje para incluirlo en la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
  
    // Redirigir a WhatsApp con el mensaje prellenado
    window.location.href = `https://api.whatsapp.com/send?phone=+5491168985455&text=${mensajeCodificado}` + ` ` + `link.mercadopago.com.ar/andreseloy`;
  }


// ------------------------------------------------------------------------ PAGO CON TRANSFERENCIA BANCARIA ----------------------------------------------------------------------

function banco() {
    // Buscar todos los elementos con la clase "nombreProducto" y "cantidadProducto"
    const productos = document.querySelectorAll("#nombreProducto");
    const cantidades = document.querySelectorAll("#cantidadProducto");
  
    // Crear un array para almacenar todos los productos y cantidades
    const listaProductos = [];
  
    // Recorrer todos los elementos y agregar cada producto y cantidad al array
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i].innerHTML;
      const cantidad = cantidades[i].innerHTML;
      listaProductos.push({ producto, cantidad });
    }
  
    // Obtener el valor del campo "total"
    const total = document.getElementById("total").innerHTML;
  
    // Crear el mensaje con la lista de productos y el total
    let mensaje = "¡NUEVO PEDIDO!\n\n";
    for (let i = 0; i < listaProductos.length; i++) {
      const { producto, cantidad } = listaProductos[i];
      mensaje += `${producto} - Cantidad: ${cantidad}\n`;
    }
    mensaje += `\nPrecio total: ${total}\n\nPAGO POR TRANSFERENCIA BANCARIA`;
  
    // Codificar el mensaje para incluirlo en la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
  
    // Redirigir a WhatsApp con el mensaje prellenado
    window.location.href = `https://api.whatsapp.com/send?phone=+5491168985455&text=${mensajeCodificado}` + ` ` + `link.mercadopago.com.ar/andreseloy`;
  }
