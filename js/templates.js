const carrito = JSON.parse(localStorage.getItem("prodCarrito")) || [];

const saveLocal = () => {
  localStorage.setItem("prodCarrito", JSON.stringify(carrito));
};

const cart = (producto) => {
  const {imagen, marca, nombre, color, precio, id} = producto
  return `
  <div class="prod">
  <div class="cont-img">
  <img src=${imagen}>
  </div>
  <div class="des">
      <span>${marca}</span>
      <h5>${nombre}</h5>
      <p>${color}</p>
      <div class="estrellas">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
      </div>
      <h4>$${precio.toFixed(2)}</h4>
  </div>
  <button class="btn-add" id="${id}" title="Clic para agregar '${nombre}' al carrito"><i class="fa-solid fa-bag-shopping carro"></i></button>
</div>
  `;
}

const armarCarrito = (producto) => {
  const {imagen, nombre, precio, cantidad} = producto
  return `<tr>
    <td><button class="btn-delete-cart btn-add" id="${nombre}"><i class="far fa-times-circle"></i></button></td>
    <td><img src="${imagen}" class="imgtable"/></td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>$${precio}</td>
  </tr>`;
}

const alerta = (text, bgcolor) => {
  Toastify({
    text: text,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    style: { background: bgcolor || "CornFlowerBlue", fontSize: "14px" },
  }).showToast();
};
