const divCelulares = document.getElementById("divCelulares")
const tablaCarrito = document.getElementById("tablaCarrito")
const totalCarrito = document.getElementById("totalCarrito")
const botonAgregar = document.getElementById("botonAgregar")
const formulario = document.getElementById("formulario")
const botonBuscar = document.getElementById("botonBuscar")
let cartAmount = document.getElementById("cartAmount")
let dataTelefonos


document.addEventListener('DOMContentLoaded', () => { //Cargamos funciones con DomContent
    traerJson()
    mostrarCarrito()
    mostrarTotalCarrito()
    mostrarEnCarrito()
    console.log('DOM fully loaded and parsed');
});

const traerJson = async() => { //Traemos Json local
    let response = await fetch("js/telefonos.json")
    let data = await response.json()
    dataTelefonos = data
    mostrarProductos(dataTelefonos)
}



function mostrarProductos(telefono){ //Funcion para mostrar productos en el html
    divCelulares.innerHTML=""
    telefono.forEach(celular => {
        divCelulares.innerHTML+=`
        <div class="card mb-4" style="width: 18rem;">
            <img src="${celular.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${celular.descripcion}</h5>
                <p class="card-text">$ ${celular.precio}</p>
                <button onclick="agregarAlCarrito(${celular.id})" id="botonAgregar" class="btn btn-success">Agregar al Carrito</button>
            </div>
        </div>
        `
    });
}

function mostrarCarrito() { //Mostramos carrito
    let carrito = capturarStorage()
    tablaCarrito.innerHTML =""
    carrito.forEach(element => {
        tablaCarrito.innerHTML+= `
        <tr>
            <td data-th="Product">
                <div class="row">
                <div class="col-sm-2 hidden-xs"><img src="${element.img}" width=32px alt="..."/></div>
                    <div class="col-sm-10">
                        <h5 class="nomargin">${element.descripcion}</h5>
                    </div>
                </div>
            </td>
            <td data-th="Cantidad">
                <div class="column d-flex align-items-center">
                    <button class="btn btn-sm" onclick="restarCant(${element.id})"><i class="fa-solid fa-square-minus"></i></button>
                    <p class="form-control text-center mb-0">${element.cantidad}</p>
                    <button class="btn btn-sm" onclick="incrementarCant(${element.id})"><i class="fa-solid fa-square-plus"></i></button>
                </div>
            </td>
            <td data-th="Subtotal" class="text-center">${element.precio * element.cantidad}</td>
            <td><button onclick="eliminarProductoCarrito(${element.id})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
        `
    });
}

function mostrarTotalCarrito() { //Funcion para mostrar el total del carrito
    //calculo el valor total
    const carrito = capturarStorage();
    const total = carrito.reduce(
      (acc, element) => acc + element.cantidad * element.precio,0
    );
    totalCarrito.innerHTML = total;
}

