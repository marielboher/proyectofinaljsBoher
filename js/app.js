const busqueda = document.querySelector("#busqueda");
const btnBusqueda = document.querySelector("button.btnBusqueda");
const formulario = document.querySelector("#busqueda");
let productos = [];
let resultadoBusqueda = [];


document.addEventListener("DOMContentLoaded", () => {
  traerDatos();
});

async function traerDatos() {
  try {
    const response = await fetch("bbdd/productos.json");
    const data = await response.json();
    if (data.length > 0) {
      productos.push(...data);
      getCards(productos);
      // getBtn();
    }
  } catch (error) {
    console.error(error);
  }
}

// generar cards shop

const cardTienda = document.getElementById("cardTienda");

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
      if(repetido){
        carrito.map((prod) => {
          if(prod.id === productoAcual.id){
            prod.cantidad++;
          }
        });
      }else{
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

// function getBtn(prodId){
//   let botonesAdd = document.querySelectorAll(".btn-add");
//   botonesAdd.forEach((boton) => {
//     const item = productos.find(prod => prod.id === prodId)
//     boton.addEventListener("click", () => {
//       console.log(carrito)
//       console.log(item)

//         carrito.push(item);
//         localStorage.setItem("prodCarrito", JSON.stringify(carrito));
//         alerta(`Agregaste '${productoAcual.nombre}' al carrito`, "#088170");

//     });
//   })
// }
      // let existe = false;
      // carrito.map((auri) => {
      //   if (actualId == auri.id) {
      //     existe = true;
      //   }
      // });
      // if (existe) {
      //   productoAcual.cantidad += 1;
      //   console.log(productoAcual);
      //   localStorage.setItem("prodCarrito", JSON.stringify(carrito));
      //   alerta(`Agregaste '${productoAcual.nombre}' al carrito`, "#088170");
      // } else {



btnBusqueda.addEventListener("click", () => {
  filter = formulario.value.toUpperCase();
  let getResult = productos.filter((producto) =>
    producto.nombre.toUpperCase().includes(filter)
  );
  if (getResult.length > 0) {
    getCards(getResult);
  } else {
    console.log("producto no encontrado");
  }
});
