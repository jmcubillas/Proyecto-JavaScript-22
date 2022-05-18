let productos = [{
		"id": "0",
    "nombreProducto": "Pant. de Gabardina",
		"precio": "5900",
    "colorDisponible": "Verde Militar",
    "imagen": "imagenes/pantalongabardina.png",
    "idSelect":"pantGabardina",
    "idButton":"pantalonGabardina"
	}, {
		"id": "1",
    "nombreProducto": "Pantalon Jogger",
		"precio": "4900",
    "colorDisponible": "Gris Oscuro",
    "imagen": "imagenes/pantalonjogger.png",
    "idSelect":"pantJogger",
    "idButton":"pantalonJogger"
	},{
		"id": "2",
    "nombreProducto": "Pantalon Palazo",
		"precio": "3900",
    "colorDisponible": "Verde Militar",
    "imagen": "imagenes/pantalonpalazo.png",
    "idSelect":"pantPalazo",
    "idButton":"pantalonPalazo"
	},{
		"id": "3",
    "nombreProducto": "Pantalon Engomado",
		"precio": "4900",
    "colorDisponible": "Negro",
    "imagen": "imagenes/pantalonengomado.png",
    "idSelect":"pantEngomado",
    "idButton":"pantalonEngomado"
	}];


let tablaEditada = '';
let productoSeleccionadoNombre ='';
let productoSeleccionadoColor ='';
let productoSeleccionadoPrecio ='';
var elements = document.getElementsByClassName("botonAgregarAlCarrito");
var cantidadProd = '';
var productosSeleccionados = "";
var productosSeleccionados2 = "";
var contadorID = "0";
let borrarRow = "";
let arrayProductos = [];
let precioFinal = 0;

crearListaDeProductos ();
recuperarCarrito ();



function borrarProducto (id){

  borrarRow = document.getElementById(id).remove();
  let prodID = id.substring(3);
  arrayProductos.splice(prodID, 1);
  localStorage.setItem ("carrito",JSON.stringify(arrayProductos));

}

function crearListaDeProductos (){

  for (let i=0; i<productos.length;i++){

    let producto = productos[i];
    divGeneral.innerHTML += "<div class='descripcion' ><img src='"+producto.imagen+"'  class='prenda rounded'><div class='oculto'> <div class='textoPrenda'> <h3>"+producto.nombreProducto+"</h3> <p class='descPrendas'> $"+producto.precio+" en efectivo retirando en el showroom</p> <p>Color disponibles:</p> <ul class='textoColores'> <li>"+producto.colorDisponible+" </li> </ul> </div> </div> <button name='button' class='css-button-fully-rounded--grey botonAgregarAlCarrito' id='"+producto.idButton+"' onclick='agregarProductoAlCarrito("+producto.id+")'>Agregar Al Carrito</button> <select class='css-button-fully-rounded--grey selectProductos' id='"+producto.idSelect+"'> <option> 1 </option> <option> 2 </option> <option> 3 </option> </select> </div> ";

  }
}

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

function recuperarCarrito (){

let carrito = JSON.parse (localStorage.getItem ("carrito"));

for (let i=0; i<carrito.length;i++){

  construirCarritoGuardado (carrito[i])

}

// console.log (carrito);
}


function finalizarCompra (){

   swal({
    title: "Compra realizada!",
    text: "Que lo disfrutes",
    icon: "success",
    button: "Terminar",
  });
  limpiarCompra ();
 
}


function vaciarCarrito (){

  swal({
    title: "Estás seguro que querés borrar el carrito?",
    text: "Una vez que lo borres no se podrán recuperar los productos que seleccionaste!",
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
      swal("Casi perdés todo lo que habías elegido!");
    }
  });
 
}

function limpiarCompra (){

  arrayProductos = [];
  localStorage.setItem ("carrito", arrayProductos);
  tablitaEditable.innerHTML = "";
  document.getElementById("finCompra").disabled = true;
  document.getElementById("borrarCompra").disabled = true;
}

