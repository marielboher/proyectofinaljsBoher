const vaciarCarrito = document.querySelector("#vaciarCarrito");
const tbody = document.querySelector("#tabla");
let mensaje = document.querySelector(".carrito-p");
let compra = new Compra();

//cargo  productos en carrito

const mostrarCarrito = () => {
  let tablaCarrito = "";
  if (carrito.length >= 0) {
    carrito.forEach((producto) =>
      (tablaCarrito += armarCarrito(producto)),
    );
    tbody.innerHTML = tablaCarrito;
  }
  if (carrito.length === 0) {
    let mostrarTotal = document.querySelector('#total');
    mostrarTotal.innerHTML = '0'
    mensaje.innerHTML = `
    <p>¡Aun no cargaste productos a tu carrito!</p>
    `;
  }
  compra.totalCompra()

};
mostrarCarrito()

//vacio productos del carrito

const vaciarCarro = () => {
  vaciarCarrito.addEventListener("click", () => {
      if(carrito.length > 0){
      carrito.length = [];
      localStorage.clear();
      mostrarCarrito();
     }else{
      Toast.fire({
        icon: 'info',
        title: 'Tu carrito esta vacio!'
      })
     }
  });
}
vaciarCarro()

//elimino productos del carrito

function actualizarBotonesDelete() {
  const buttonsDelete = document.querySelectorAll("button.btn-delete-cart.btn-add");
  buttonsDelete.forEach(btn => {
    btn.addEventListener("click", removeItems)
  })
}
actualizarBotonesDelete()

function removeItems(e) {
  let idBoton = e.currentTarget.id;
  let produtoEliminar = carrito.findIndex(producto => producto.nombre === idBoton);
  if (produtoEliminar > -1) {
    carrito.splice(produtoEliminar, 1);
    saveLocal()
    mostrarCarrito()
    actualizarBotonesDelete()
  }
}


//Finalizacion de la compra

const btnCompraCarrito = document.querySelector("#continuarCompra")
let mostarTotalModal = document.querySelector('#mostrarTotalCompra')
btnCompraCarrito.addEventListener("click", () => {
  mostarTotalModal.innerHTML = `${compra.totalAPagar()}`
})

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

let aceptarCompraModal = document.querySelector('#aceptarCompra')
aceptarCompraModal.addEventListener('click', () => {
  if (carrito.length > 0) {
    Toast.fire({
      icon: 'success',
      title: 'Gracias por su compra!'
    })
    carrito.length = []
    localStorage.clear();
    mostrarCarrito()
  } else {
    Toast.fire({
      icon: 'info',
      title: 'Tu carrito esta vacio!'
    })
  }
})



