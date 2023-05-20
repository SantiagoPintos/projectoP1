window.addEventListener("load", main);
function main(){
    capturarEventosDeBotonesMenuInicial();
}
function capturarEventosDeBotonesMenuInicial(){
    document.querySelector("#btnUsuarioPersona").addEventListener("click", usuarioEsPersona);
    document.querySelector("#btnUsuarioCensista").addEventListener("click", usuarioEsCensista);
}
function ocultarMenuInicial(){
    document.querySelector("#seleccionUsuario").style.display = "none";
}
function usuarioEsPersona(){
    ocultarMenuInicial();
}
function usuarioEsCensista(){
    ocultarMenuInicial();
    capturarEventosMenuInicioSesionCensista();
    document.querySelector("#censistaNoEstaRegistrado").style.display = "none";
    document.querySelector("#menuCensista").style.display = "none";
    document.querySelector("#realizarNuevoCenso").style.display = "none";
    document.querySelector("#validarCenso").style.display = "none";
    document.querySelector("#CensosPendientesDeValidacion").style.display = "none";
    document.querySelector("#visualizarEstadisticasCensista").style.display = "none";
}
function registrarCensista(){
    console.log("registrarcensista")
    document.querySelector("#aplicacionCensista").style.display = "none";
    document.querySelector("#censistaNoEstaRegistrado").style.display = "block";
    
}
function capturarEventosMenuRegistroCensista(){
    document.querySelector("#btnRegistroCensista").addEventListener("click", registrarCensista);
}
function capturarEventosMenuInicioSesionCensista(){
    document.querySelector("#btnRegistrarCensista").addEventListener("click", mostrarMenuPrincipalCensistas);
}
function mostrarMenuPrincipalCensistas(){
    document.querySelector("#formularioRegistroCensista").style.display = "none";
    document.querySelector("#menuCensista").style.display = "block";
    
}

//TODO: validar mayus con acentos?
function validarContraseña(clave){
    let esValida = false;
    let tieneMayus = false;
    let tieneNumero = false;
    let tieneMayusYnumero = false;

    if(clave.length>=5){
        for (let i = 0; i < clave.length && !tieneMayusYnumero; i++) {
            console.log(clave.charCodeAt(i));
            //65=`A`, 90=`Z`, 209=Ñ
            if (clave.charCodeAt(i)>=65 && clave.charCodeAt(i)<=90 || clave.charCodeAt(i)==209 ) {
                tieneMayus=true;
            }
            //48=`0`, 57=`9`
            if (clave.charCodeAt(i)>=48 && clave.charCodeAt(i)<=57) {
                tieneNumero=true;
            }
            if (tieneMayus&&tieneNumero) {
                //detiene el loop si tiene mayus y num
                tieneMayusYnumero=true;
                esValida = true;
            }
        } 
    }
    return esValida;
}

// Comprueba longitud de número de cédula y quita cualquier cosa que no sea un nro
function limpiarNroCI(cedula){
    let nroCedulaEnLimpio = "";
    cedula=cedula.trim();
    if (cedula.length<7) {
        return -1;
    } else {
        for (let i = 0; i < cedula.length; i++) {
            const numero = cedula.charAt(i);
            if (numero.charCodeAt(0) >= 48 && numero.charCodeAt(0) <= 57) {
                nroCedulaEnLimpio+=numero;
            }
        }
        return nroCedulaEnLimpio;
    }
}

//valida digito verificador
function validarDigitoVerificadorCI(cedula){
    const multiplos = [8,1,2,3,4,7,6];
    //nro "mágico" obtenido de: https://ciuy.readthedocs.io/es/latest/about.html#calculating-the-validation-number
    const digitoVerificador = cedula.charAt(cedula.length-1);
    let acumulador = 0;
    let esValida = false;

    for (let i = 0; i<=(cedula.length-2); i++) {
        const nro = cedula.charAt(i);
        acumulador+=nro*multiplos[i];
    }
    acumulador=acumulador%10;
    if (acumulador==digitoVerificador) {
        esValida=true;
    }
    
    return esValida;
}

//recibe por parámetro id de <select> y le agrega departamentos
function cargarSelectDeDepartamentos(id){
    const arrayDepartamentos = ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", 
    "Flores", "Florida", "Lavalleja","Maldonado", "Montevideo", "Paysandú", "Río Negro", 
    "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Trés"];
    
    let cargar = `<option value="-1">Seleccione...</option>`;

    for (let i = 0; i < arrayDepartamentos.length; i++) {
        const departamento = arrayDepartamentos[i];
        cargar += `<option value="${i}">${departamento}</option>`;
    }
    //falta instrucción para popular select
}
