// El código va aquí -> 
let btnAgregar = document.getElementById ("btnAgregar");
let btnClear = document.getElementById ("btnClear");


let txtNombre = document.getElementById ("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidaciones");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

productosTotal

let tablaListaCompras = document.getElementById ("tablaListaCompras")
let cuerpoTabla = tablaListaCompras.getElementsByTagName ("tbody").item(0);

let isValid= true;
let precio;
let contador=0;
let costoTotal = 0;
let totalEnProductos =0;

let datos = new Array (); //aqui se alamacena la informacion de la tabla 

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }//IF length

    if (isNaN(txtNumber.value)){
        return false;
    } //IS NAN 

    if (Number(txtNumber.value) <= 0 ){
        return false;
    }//<=O


    return true;
}//validar cantidad

function getPrecio(){
    return Math.floor((Math.random()*10000))/100;
}//get precio 

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto, this.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    isValid = true;
    if (txtNombre.value.length<3){
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto";
        alertValidaciones.style.display="block";
        txtNombre.style.border="solid red medium";
        isValid =false
    } //solo se valida que el dato sea correcto y lo semarca con rojo 

    if(! validarCantidad()){
        alertValidacionesTexto.innerHTML+="El <strong>Número</strong> no es correcto";
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red medium";
        isValid= false 
    }//validar cantidad


    if (isValid){
        contador++;
        precio = getPrecio ();
        let row = ` <tr>
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;

                let elemento = `{"id": ${contador},
                                "nombre": "${txtNombre.value}",
                                "cantidad": "${txtNumber.value}",
                                "precio": ${precio}
                }`
                datos.push(JSON.parse(elemento));
                    localStorage.setItem("datos",JSON.stringify(datos));  
                        //este concatena los datos para gusrdarlos en el localStorage

                cuerpoTabla.insertAdjacentHTML("beforeend", row);
                contadorProductos.innerText= contador;
                totalEnProductos += parseFloat(txtNumber.value);
                costoTotal += precio * parseFloat(txtNumber.value);
                productosTotal.innerText=totalEnProductos;
                precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
                localStorage.setItem("contador", contador);
                localStorage.setItem("totalEnProductos", totalEnProductos);
                localStorage.setItem("costoTotal", costoTotal);

                txtNombre.value="";
                txtNumber.value="";
                txtNombre.focus();
    

    } //is valid
});
//boton de limpiar
btnClear.addEventListener("click", function(event){
    event.preventDefault();

    txtNombre.value = "";
    txtNumber.value = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    cuerpoTabla.innerHTML="";
    contador =0;
    totalEnProductos =0;
    costoTotal =0;
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);   
    localStorage.setItem("costoTotal", costoTotal);
    datos = new Array();
    localStorage.removeItem("datos");
    contadorProductos.innerText=contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=` $ ${costoTotal.toFixed(2)}`;
//esta parte del arreglo te ayuda a que al momnto de seleccionar el boton de limpiar se quite toda la inf
});

window.addEventListener("load",function(event){  //este es para alamcenar los datos 
    event.preventDefault();
    if (this.localStorage. getItem("contador")!=null){
        contador=Number (this.localStorage.getItem("contador"));
    } //if contador //el this aparece porque estas dentro de la venta y os otros estan en el documento

if (this.localStorage.getItem("totalEnProductos")!=null){
    totalEnProductos=Number (this.localStorage.getItem("totalEnProductos"));
    }//if totalen productos

    if (this.localStorage.getItem("costoTotal")!=null){
        costoTotal=Number (this.localStorage.getItem("costoTotal"));
    }
    if (this.localStorage.getItem("datos")!=null){
        datos =JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = ` <tr>
                    <td>${r.id}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
                </tr>`;
        
                cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
        

    }
     //if costo total
    

    contadorProductos.innerText=contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=` $ ${costoTotal.toFixed(2)}` ;


});//window load