let productos;
var elements = document.getElementsByClassName("botonAgregarAlCarrito");
var cantidadProd = '';
var productosSeleccionados = "";
var productosSeleccionados2 = "";
var contadorID = "0";
let borrarRow = "";
let arrayProductos = [];
let precioFinal = 0;


fetch ("https://jmcubillas.github.io/Proyecto-JavaScript-22/js/productos.json")
.then ((response) => response.json())
.then(data=> {
 productos = data;

 console.log (productos);
 crearListaDeProductos ();
});

recuperarCarrito ();


// Borrar producto en particular.

function borrarProducto (id){

  borrarRow = document.getElementById(id).remove();
  let prodID = id.substring(3);
  arrayProductos.splice(prodID, 1);
  localStorage.setItem ("carrito",JSON.stringify(arrayProductos));

}

// Agregar lista de productos.

function crearListaDeProductos (){

  for (let i=0; i<productos.length;i++){
    let producto = productos[i];
    divGeneral.innerHTML += "<div class='descripcion' ><img src='"+producto.imagen+"'  class='prenda rounded'><div class='oculto'> <div class='textoPrenda'> <h3>"+producto.nombreProducto+"</h3> <p class='descPrendas'> $"+producto.precio+" en efectivo retirando en el showroom</p> <p>Color disponibles:</p> <ul class='textoColores'> <li>"+producto.colorDisponible+" </li> </ul> </div> </div> <button name='button' class='css-button-fully-rounded--grey botonAgregarAlCarrito' id='"+producto.idButton+"' onclick='agregarProductoAlCarrito("+producto.id+")'>Agregar Al Carrito</button> <select class='css-button-fully-rounded--grey selectProductos' id='"+producto.idSelect+"'> <option> 1 </option> <option> 2 </option> <option> 3 </option> </select> </div> ";
  }

}


// Agregar producto en particular.

function agregarProductoAlCarrito (id){

        let prodElegido = productos[id];
        productosSeleccionados = document.getElementById(prodElegido.idSelect);
        productosSeleccionados2 = productosSeleccionados.value;  
        cantidadProd =  productosSeleccionados2;
        tablitaEditable.innerHTML += "<tr id = 'tr-" +contadorID+"'> <td>"+contadorID+" </td>  <td>"+prodElegido.nombreProducto+ "</td> <td>"+cantidadProd+"</td> <td>$ "+(prodElegido.precio*cantidadProd)+".-</td> <td> <button onclick=borrarProducto('tr-" + contadorID +"')> X </button> </td> </tr>";
        contadorID ++;
        prodElegido.cantidadSeleccionada = cantidadProd;
        arrayProductos.push (prodElegido);
        localStorage.setItem ("carrito",JSON.stringify(arrayProductos));
        document.getElementById("finCompra").disabled = false;
        document.getElementById("borrarCompra").disabled = false;

}

// Llenado de datos a la tabla.

function construirCarritoGuardado (prodElegido){          

          tablitaEditable.innerHTML += "<tr id = 'tr-" +contadorID+"'> <td>"+contadorID+" </td>  <td>"+prodElegido.nombreProducto+ "</td> <td>"+prodElegido.cantidadSeleccionada+"</td> <td>$ "+(prodElegido.precio*prodElegido.cantidadSeleccionada)+".-</td> <td> <button onclick=borrarProducto('tr-" + contadorID +"')> X </button> </td> </tr>";
          contadorID ++;
          arrayProductos.push (prodElegido);  
          localStorage.setItem ("carrito",JSON.stringify(arrayProductos));

          if (arrayProductos.length>0){

            document.getElementById("finCompra").disabled = false;
            document.getElementById("borrarCompra").disabled = false;

          }
  
  }

// Al actualizar la p??gina, se recuperan los datos de la tabla. 

function recuperarCarrito (){

  let localLS = localStorage.getItem("carrito");
 
  if (localLS != null && localLS != "") {
  let carrito = JSON.parse(localLS);

  for (let i=0; i<carrito.length;i++){

    construirCarritoGuardado(carrito[i])

  }
  }
  }

// Opci??n de finalizar la compra.

function finalizarCompra (){

let costoTotal = 0 ;

  for (let i=0; i<arrayProductos.length;i++){

    let costoProducto = arrayProductos[i].cantidadSeleccionada*arrayProductos[i].precio;

    costoTotal+=parseInt(costoProducto);

  }
  console.log(costoTotal);

   swal({
    title: "Compra realizada!",
    text: "Tu Compra suma: $ " +costoTotal+".-",
    icon: "success",
    button: "Terminar",
  });
  limpiarCompra ();

}

// Opci??n de borrar carrito.

function vaciarCarrito (){

  swal({
    title: "Est??s seguro que quer??s borrar el carrito?",
    text: "Una vez que lo borres no se podr??n recuperar los productos que seleccionaste!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {

      limpiarCompra ();
      swal("Tu carrito ha sido borrado", {

        icon: "success",
        
      });

    } else {
      swal("Casi perd??s todo lo que hab??as elegido!");
    }
  });
 
}

// Borrado de tabla.

function limpiarCompra (){

  arrayProductos = [];
  localStorage.setItem ("carrito", arrayProductos);
  tablitaEditable.innerHTML = "";
  document.getElementById("finCompra").disabled = true;
  document.getElementById("borrarCompra").disabled = true;
}

