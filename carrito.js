class Producto{
    constructor(nombre, descripcion, precio, stock, img){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
        this.cant = 0;
    }
    getNombre(){
        return this.nombre;
    }
    getDescripcion(){
        return this.descripcion;
    }
    getPrecio(){
        return this.precio;
    }
    getStock(){
        return this.stock;
    }
    rebajarStock(){
        this.stock = this.stock - 1;
    }
    subirStock(){
        this.stock = this.stock + 1;
    }
    getImg(){
        return this.img;
    }
    aumentarCant(){
        this.cant += 1;
    }
    bajarCant(){
        this.cant -= 1;
    }
    getCant(){
        return this.cant;
    }

}

class Carrito{
    constructor(){
        this.productos = [];
        this.total = 0;
    }

    getProductos(){
        return this.productos;
    }

    agregarProductos(a){
        if( a instanceof Producto){
            if(a.getStock() > 0){
                if(this.productos.includes(a)){
                    a.rebajarStock();
                    a.aumentarCant();
                    this.total += a.getPrecio();
                }
                else{
                    this.productos.push(a);
                a.rebajarStock();
                this.total += a.getPrecio();
                a.aumentarCant();
                }
                
            }
            else{
                console.log("No hay stock suficiente");
            }
            
        }
        else{
            console.log("Hubo un problema al agregar el producto");
        }
    }

    eliminarProducto(a) {
        if (a instanceof Producto) {
            if (this.productos.includes(a)) {
                this.productos = this.productos.filter(aux => aux.getNombre() !== a.getNombre());
                console.log("Producto eliminado correctamente");
                a.subirStock();
                this.total -= a.getPrecio();
                a.bajarCant();
            } else {
                console.log("El producto no se encuentra en el carrito");
            }
        } else {
            console.log("Hubo un problema al eliminar el producto");
        }
    }
    vaciarCarrito(){
        this.productos.forEach(producto => {
            producto.stock += producto.getCant();
            producto.cant = 0;
        });
        this.productos = [];
        this.total = 0;
    }
   getTotal(){
    return this.total;
   } 
}

let producto1 = new Producto("Celular Iphone 11", "Muy buena camara.", 400, 10, "Media\\iPhone-11.jpg");
let producto2 = new Producto("Celular Iphone 12", "Muy buenos botones.", 500, 14, "Media\\iPhone-12.jpg");
let producto3 = new Producto("Celular Iphone 12 Pro max", "Muy buena pantalla.", 600, 4,"Media\\iPhone-12-Pro.jpg" );
let producto4 = new Producto("Celular Iphone 14 Pro", "Muy buen parlante.", 800, 3, "Media\\iPhone-14-Pro.jpg");
let producto5 = new Producto("Celular Iphone 15", "Muy buen procesador.", 900, 1, "Media\\iPhone-15.jpg");
let producto6 = new Producto("Celular Iphone 15 Pro", "Muy buena resolucion.", 1100, 2, "Media\\iPhone-15-Pro.jpg");

let carrito = new Carrito();
let productosTodos = [producto1, producto2,producto3,producto4,producto5, producto6];

console.log(carrito);

const productosHTML = document.getElementById("productos");

productosTodos.forEach((producto, index) => {
    productosHTML.innerHTML += `
    <div id="producto-${index}">
        <h1 id="name-pp"> ${producto.getNombre()} </h1>
        <img src="${producto.getImg()}" alt="${producto.getNombre()}" id="img-pp">
        <p id="desc-pp"> Descripcion: ${producto.getDescripcion()} </p>
        <h2 id="precio-pp"> Precio: ${producto.getPrecio()}</h2>
        <h2 id="stock-pp-${index}"> Stock: ${producto.getStock()} </h2>
        <button id="boton-pp-${index}" class="boton-comprar"> COMPRAR </button>
    </div>
    `;
});

document.querySelectorAll('.boton-comprar').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const productoSeleccionado = productosTodos[index];
        if (productoSeleccionado.getStock() > 0) {
            carrito.agregarProductos(productoSeleccionado);
            actualizarCarritoHTML();
            actualizarStockHTML(index, productoSeleccionado.getStock());
        } else {
            mostrarCartelSinStock();
        }
    });
});

function mostrarCartelSinStock() {

    const cartel = document.createElement('div');
    cartel.className = 'cartel-sin-stock';
    cartel.innerText = "No hay stock suficiente";

    const botonCerrar = document.createElement('button');
    botonCerrar.innerText = 'Cerrar';
    botonCerrar.className = 'boton-close';

    botonCerrar.addEventListener('click', () => {
        document.getElementById('carteles-sin-stock').removeChild(cartel);
    });

    cartel.appendChild(botonCerrar);

    document.getElementById('carteles-sin-stock').appendChild(cartel);

    setTimeout(() => {
        if (document.getElementById('carteles-sin-stock').contains(cartel)) {
            document.getElementById('carteles-sin-stock').removeChild(cartel);
        }
    }, 3000);
}

function actualizarStockHTML(index, nuevoStock) {
    const stockElement = document.getElementById(`stock-pp-${index}`);
    if (stockElement) {
        stockElement.textContent = `Stock: ${nuevoStock}`;
    }
}

const carritoH = document.getElementById("carrito");

function actualizarCarritoHTML() {
    carritoH.innerHTML = "";
    carrito.getProductos().forEach(producto => {
        carritoH.innerHTML += `
        <div id="carrito">
            <img src="${producto.getImg()}" alt="${producto.getNombre()}" id="img-pp">
            <div class="info-producto">
                <h1 id="name-cc"> Producto: ${producto.getNombre()} </h1>
                <p id="desc-cc"> Descripcion: ${producto.getDescripcion()} </p>
                <h2 id="precio-cc"> Precio: ${producto.getPrecio()}</h2>
                <h2 id="cant-cc"> Cantidad: ${producto.getCant()} </h2>
            </div>
        </div>
        `;
    });
    carritoH.innerHTML += `<h1 id="total-cc"> TOTAL: ${carrito.getTotal()} </h1> <button id="boton-vaciar"> VACIAR CARRITO </button> <button id="boton-comprar-carrito"> COMPRAR </button>`;
    
    const botonEliminar = document.getElementById("boton-vaciar");
    botonEliminar.addEventListener('click', () => {
        carrito.vaciarCarrito();
        actualizarCarritoHTML();
        actualizarTodosStockHTML(); 
    });
}

function actualizarTodosStockHTML() {
    productosTodos.forEach((producto, index) => {
        actualizarStockHTML(index, producto.getStock());
    });
}
