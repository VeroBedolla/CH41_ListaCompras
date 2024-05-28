// El código va aquí -> 
let btnAgregar = document.getElementById ("btnAgregar");
let btnClear = document.getElementById ("btnClear");


let txtNombre = document.getElementById ("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidaciones");


function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }
    return true;
}//validar cantidad

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto, this.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    if (txtNombre.value.length<3){
        alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto<br/>";
        alertValidaciones.style.display="block";
        txtNombre.style.border="solid red medium";
    } //solo se valida que el dato sea correcto y lo semarca con rojo 

    if(! validarCantidad()){
        alertValidacionesTexto.innerHTML+="El <strong>Número</strong> no es correcto";
        alertValidaciones.style.display="block";
        txtNumber.style.border="solid red medium";
    }//validar cantidad
});

btnClear.addEventListener("click", function(event){
    event.preventDefault();

    txtNombre.value = "";
    txtNumber.value = "";

});

