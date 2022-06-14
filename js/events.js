let cantCarrito = capturarStorage2() 

function capturarStorage(){
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorage(array){
    localStorage.setItem("carrito", JSON.stringify(array))
}

function capturarStorage2(){
    return JSON.parse(localStorage.getItem("cantCarrito")) || 0
}

function guardarStorage2(cantCarrito){
    localStorage.setItem("cantCarrito", JSON.stringify(cantCarrito))
}


function agregarAlCarrito(id) { // funcion para agregar productos al carrito
    let carrito = capturarStorage()
    if (estaEnCarrito(id)){
        incrementarCant(id)
    } else {
        let productoEncontrado = dataTelefonos.find(celular=>celular.id==id)
        carrito.push({...productoEncontrado, cantidad: 1})
        guardarStorage(carrito)
        aumentarEnCarrito()
        mostrarCarrito()
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            } // Callback after click
        }).showToast();
        
        
    }
    mostrarCarrito()
    console.log(carrito)
    console.log(cantCarrito)
    mostrarTotalCarrito()
}

function incrementarCant(id) { // Funcion para incrementar cantidad cada vez que se hace clic en el boton +
    let carrito = capturarStorage()
    const indice = carrito.findIndex(celular => celular.id==id)
    carrito[indice].cantidad++
    aumentarEnCarrito()
    guardarStorage(carrito)
    mostrarCarrito()
    mostrarTotalCarrito()
}

function restarCant(id) { //Funcion para restar cantidad cada vez que se presiona el boton -
    let carrito = capturarStorage();
    const index = carrito.findIndex((e) => e.id == id); // busco la posicion del objeto
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--; //segun la posicion le resto uno a cantidad
      guardarStorage(carrito);
      restarEnCarrito();
      mostrarCarrito();
      mostrarTotalCarrito();
    } else {
        Swal.fire({
            title: `¿Desea eliminar ${carrito[index].descripcion} del carrito de compras?`,
            icon: 'question',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = Swal.getConfirmButton() && eliminarProductoCarrito(id)
                Swal.fire(
                    'Su producto fue eliminado correctamente',
                )
            }
        }
    )}
}

function estaEnCarrito(id){ // verificacion de si esta en el carrito o no
    let carrito = capturarStorage()
    return carrito.some(e=>e.id==id)
}

function eliminarProductoCarrito(id) { // funcion para eliminar producto del carrito se filtra y hace que nos devuelva todo menos el id buscado
    let carrito = capturarStorage()
    let resultado = carrito.filter(celular => celular.id != id)
    const index = carrito.findIndex((e) => e.id == id);
    cantCarrito -= carrito[index].cantidad
    guardarStorage(resultado)
    guardarStorage2(cantCarrito)
    mostrarEnCarrito()
    console.log(resultado)
    mostrarCarrito()
    mostrarTotalCarrito()
}

botonPedidoRealizado.addEventListener('click', () => { // listener para realizar el pedido y borrar el carrito
    if (estaVacio()) {
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacío',
            text: 'Agrega al menos un producto para realizar un pedido',
        }) 
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Pedido realizado con éxito',
            confirmButtonText: 'Aceptar',
        })
        localStorage.clear();
        mostrarCarrito();
        mostrarTotalCarrito();
        borrarCarrito()
        mostrarEnCarrito()
    }
})



function estaVacio() {
    if (capturarStorage() == "") {
        return true
    } else {
        return false
    }
}
 // ----------- FUNCIONES PARA MODIFICAR EL NUMERO QUE SE ENCUENTRA AL LADO DEL CARRITO --------
function aumentarEnCarrito() {
    cantCarrito++
    mostrarEnCarrito()
    guardarStorage2(cantCarrito)
}

function restarEnCarrito(){
    cantCarrito--
    mostrarEnCarrito()
    guardarStorage2(cantCarrito)
}

function borrarCarrito(){
    cantCarrito = 0
}

function mostrarEnCarrito(){
    cartAmount.innerHTML=""
    cartAmount.innerHTML=`${cantCarrito}`
}

// -------------------------------------------------------------------------------------------------

const busqueda = () =>{ //funcion buscador
    const texto = formulario.value.toLowerCase();
    let encontro = false
    divCelulares.innerHTML=""
    for (let celular of dataTelefonos) {
        let descripcion = celular.descripcion.toLowerCase();
        if (descripcion.indexOf(texto) !== -1){
            encontro = true
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
        }   
    }
    if (encontro == false) {
        divCelulares.innerHTML=""
        divCelulares.innerHTML="<p>Producto no encontrado</p>"
    }  
}
botonBuscar.addEventListener('click', busqueda)
