const vaciarCarrito = document.querySelector("#vaciarCarrito");
const tbody = document.querySelector("#tabla");
let mensaje = document.querySelector(".carrito-p");
let compra = new Compra();


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


const vaciarCarro = () => {
  vaciarCarrito.addEventListener("click", () => {
  carrito.length = [];
  localStorage.clear();
  mostrarCarrito();
});
}
vaciarCarro()

function btnEliminar() {
  const buttonsDelete = document.querySelectorAll("button.btn-delete-cart.btn-add");
  buttonsDelete.forEach(btn => {
    btn.addEventListener("click", () => {
      let pos = carrito.findIndex((prod) => prod.nombre === btn.id);
      if (pos > -1) {
        carrito.splice(pos, 1);
        localStorage.setItem("prodCarrito", JSON.stringify(carrito));
        // alerta(`Eliminaste '${pos.nombre}' al carrito`, "red");

        mostrarCarrito();
        btnEliminar();
      }
    });
  });
}
btnEliminar();


  const btnCompraCarrito = document.querySelector("#continuarCompra")
  let mostarTotalModal = document.querySelector('#mostrarTotalCompra')
    btnCompraCarrito.addEventListener("click", () =>{
      mostarTotalModal.innerHTML = `${compra.totalAPagar()}`
    })

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    let aceptarCompraModal = document.querySelector('#aceptarCompra')
    aceptarCompraModal.addEventListener('click', () =>{
      Toast.fire({
        icon: 'success',
        title: 'Gracias por su compra'
      })
      carrito.length = []
      localStorage.clear();
      mostrarCarrito()
    })

