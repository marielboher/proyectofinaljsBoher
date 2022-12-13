class Compra {
  constructor(carrito) {
    this.carrito = carrito;
  }
    totalAPagar() {
    return carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0).toFixed(2);
  }
  totalCompra(){
    let precioTotal = document.querySelector("#total");
    precioTotal.innerHTML = `${this.totalAPagar()}`
  }
}
