const busqueda = document.querySelector("#busqueda");
const btnBusqueda = document.querySelector("button.btnBusqueda");
const formulario = document.querySelector("#busqueda");
const cardTienda = document.getElementById("cardTienda");
let productos = [];


//traigo datos con fetch y promesas

fetch("bbdd/productos.json")
  .then(response => response.json())
  .then(data =>  productos.push(...data))
  .then(() => getCards(productos))
  .catch(error => {
    console.log(error)
  })

// genero cards shop y activo la el boton agregar si ya esta el producto en el carrito aumenta la cantidad

const getCards = (prod) => {
  let cargarPagina = "";
  if (prod.length > 0) {
    prod.forEach((producto) => {
      cargarPagina += cart(producto);
    });
    cardTienda.innerHTML = cargarPagina;
  }

  let botonesAdd = document.querySelectorAll(".btn-add");
  botonesAdd = [...botonesAdd];
  botonesAdd.forEach((boton) => {
    boton.addEventListener("click", event => {
      let actualId = parseInt(event.currentTarget.id);
      let productoAcual = productos.find(item => item.id == actualId);
      let repetido = carrito.some((prodRepetido) => prodRepetido.id === productoAcual.id)
      if (repetido) {
        carrito.map((prod) => {
          if (prod.id === productoAcual.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: productoAcual.id,
          imagen: productoAcual.imagen,
          nombre: productoAcual.nombre,
          precio: productoAcual.precio,
          cantidad: productoAcual.cantidad,
        });
      }
      alerta(`Agregaste '${productoAcual.nombre}' al carrito`, "#088170");
      saveLocal()
    });
  });
  ;
};

const saveLocal = () => {
  localStorage.setItem("prodCarrito", JSON.stringify(carrito));
};

//filtro de busqueda


btnBusqueda.addEventListener("click", () => {
  filter = formulario.value.toUpperCase();
  let getResult = productos.filter((producto) =>
    producto.nombre.toUpperCase().includes(filter)
  );
  if (getResult.length > 0) {
    getCards(getResult);
  } else {
    alerta('No se encontraron productos coincidentes!', "#d84949")
  }
});


