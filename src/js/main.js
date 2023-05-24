window.addEventListener("load", main);
function main(){
    capturarClicks();
}
function capturarClicks(){
    document.querySelector("#btnIniciarSesionCensista").addEventListener("click", iniciarSesionCensista);

    //función que extrae datos de formulario, falta forma de invocar la aparición de dicho formulario y ocultar el resto
    document.querySelector("#btnRegistrarCensista").addEventListener("click", iniciarRegistroCensista);
}

let baseDeDatosCensistas = new Array();
let baseDeDatosPersona = new Array();
let censistaRandom = {
    nombre: "pedro",
    usuario: "pedrito75",
    contraseña: "123452",
    id: 0,
}
baseDeDatosCensistas.push(censistaRandom);



//función que controla el inicio de sesión del censista
function iniciarSesionCensista(){
    const usuario = document.querySelector("#usuarioCensista").value;
    const clave = document.querySelector("#contraseñaCensista").value;
    const perfil = verificarCredenciales(usuario, clave);

    if (perfil) {
        //Parsear objeto y mostrar datos
        document.querySelector("#parrafoNombreCensista").value = `Bienvenido ${perfil.nombre}`;
    } else {
        document.querySelector("#msjLoginCensista").innerHTML = "Nombre de usuario y/o contraseña incorrectas";
    }
    /* 
        Limpiar campos de texto incluso después de iniciar sesión 
        en caso de que usuario intente ir hacia atrás
     */

    document.querySelector("#usuarioCensista").value = "";
    document.querySelector("#contraseñaCensista").value = "";
}

/* 
    Funcion que extrae datos de formulario para registrar censista
*/
function iniciarRegistroCensista(){
    const nombre = document.querySelector("#nuevoNombreCensista").value;
    const nombreDeUsuario = (document.querySelector("#nuevoUsuarioCensista").value).toLowerCase();
    const contraseña = document.querySelector("#nuevoContraseñaCensista").value;
    let mensajeParaParrafo = "";
    //Desde HTML se valida que no estén vacíos, pero ser verifica nuevamente por seguridad 
    if (!nombre || !nombreDeUsuario || !contraseña) {
        mensajeParaParrafo = "Todos los campos deben ser completados!"
    } else {
        /* 
            Elegí esta de verificación en "cascada" para modularizar código y obtener
            el punto de fallo específico y mostrar un error acorde
        */
        if(validarNombreUsuarioCensista(nombreDeUsuario)){
            //si nombre de usuario es válido se llama a función que valida contraseña
            if (validarContraseña(contraseña)) {
                //se llama a función que registra usuario
                registrarCensista(nombre, nombreDeUsuario, contraseña);
            } else {
                mensajeParaParrafo = "La contraseña debe tener al mínimo 5 caracteres, al menos una mayúscula, una minúscula y un número";
            }
        } else {
            mensajeParaParrafo="El nombre de usuario no está disponible!";
        }
    }

    /* 
        Flujo: extraer datos de form, validar que no estén vacíos, pasar contraseña y nombre de usuario
        a funciones auxiliares que los validen, y luego hacer el registro de usuario
    */

    //mensaje de error/confirmación
    document.querySelector("#msjRegistroCensista").innerHTML = mensajeParaParrafo;
}

function registrarCensista(nombre, usuario, contraseña){
    let nuevaId = generarIdCensista();
    let nuevoCensista = new Censista();
    nuevoCensista.cargarDatos(nombre, usuario, contraseña, nuevaId);
    baseDeDatosCensistas.push(nuevoCensista);
    console.log("nuevo usuario registrado")
    console.log(baseDeDatosCensistas[nuevaId]);
}

/* 
    Función que se encarga de generar el id único de cada censista al momento de su registro
    en la aplicación, retorna un número incremental basado en el valor previo 
*/
function generarIdCensista(){
    let ultimoIdRegistrado = 0;
    if (baseDeDatosCensistas[baseDeDatosCensistas.length-1].id >= 0) {
        ultimoIdRegistrado = Number(baseDeDatosCensistas[baseDeDatosCensistas.length-1].id);
    }
    return ultimoIdRegistrado+1
}

/* 
    Comprueba si el nombre de usuario elegido por el censista durante el proceso de registro está disponible
    en array baseDeDatosCensistas, retorna true o false
*/
function validarNombreUsuarioCensista(usuario){
    let disponible = true;
    for (let i = 0; i < baseDeDatosCensistas.length && disponible; i++) {
        const nombre = baseDeDatosCensistas[i].usuario;
        if (nombre==usuario) {
            disponible = false;
        }
    }
    return disponible;
}

/* 
    Verifica que la contraseña cumpla con los siguientes requisitos:
    - Mínimo 5 caracteres
    - Al menos 1 mayúscula
    - Al menos 1 minúscula
    - Al menos 1 número
*/
function validarContraseña(clave){
    let esValida = false;
    let tieneNumero = false;
    let tieneMayus = false;
    let tieneMinuscula = false;
    let tieneMayusNumeroYMinuscula = false;

    if(clave.length>=5){
        for (let i = 0; i < clave.length && !tieneMayusNumeroYMinuscula; i++) {
            //65=`A`, 90=`Z`, 209=Ñ
            if (clave.charCodeAt(i)>=65 && clave.charCodeAt(i)<=90 || clave.charCodeAt(i)==209 ) {
                tieneMayus=true;
            }
            if (clave.charCodeAt(i)>=97 && clave.charCodeAt(i)<=122 || clave.charCodeAt(i)==241) {
            //97=`a`, 122=`z`, 241=`ñ`
                tieneMinuscula=true;
            }
            //48=`0`, 57=`9`
            if (clave.charCodeAt(i)>=48 && clave.charCodeAt(i)<=57) {
                tieneNumero=true;
            }
            if (tieneMayus&&tieneNumero&&tieneMinuscula) {
                //detiene el loop si tiene mayus y num
                tieneMayusNumeroYMinuscula=true;
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
    /*
        Referencia obtenida de: https://ciuy.readthedocs.io/es/latest/about.html#calculating-the-validation-number ,
        diferente al mostrado en clase pero pasa todos los casos proporcionados en práctico 5 ejercicio 16
    */
    let multiplos = [8,1,2,3,4,7,6];
    const digitoVerificador = cedula.charAt(cedula.length-1);
    let acumulador = 0;
    let esValida = false;

    if (cedula.length<8) {
        /* 
            Si CI<1.000.000 no se debe multiplicar por multiplos[0] (8) 
            
            .slice() retorna array con posiciones a elección, por lo tanto se usa
            1-array.length para "descartar" la primera posición            
         */
        multiplos=multiplos.slice(1,multiplos.length);
    }

    for (let i = 0; i<(cedula.length-1); i++) {
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

/* 
    verifica si usuario y contraseña de censista son correctos, es llamada desde iniciarSesionCensista,
    retorna objeto con datos o false
*/
function verificarCredenciales(usuario, contraseña){
   /* 
        usuario y contraseña se deben verificar ante array "baseDeDatosCensistas"
        cada elemento es un objeto con usuario y contraseña como propiedades
        por lo tanto: usuario == (recorrer array)baseDeDatosCensistas.usuario 
    */
    let usuarioEncontrado = false;
    let posicionUsuarioEnArray = 0;

    for (let i = 0; i < baseDeDatosCensistas.length && !usuarioEncontrado; i++) {
        const usuarioAlmacenado = baseDeDatosCensistas[i].usuario;
        if (usuarioAlmacenado==usuario) {
            usuarioEncontrado = true;
            posicionUsuarioEnArray = i;
        }
    }

    //Solo se debe comprobar la contraseña si el usuario existe
    if (usuarioEncontrado) {
        if (contraseña==baseDeDatosCensistas[posicionUsuarioEnArray].contraseña) {
            /* 
                Si contraseña coincide se retorna el objeto con los datos a parsear en ui.

                Se retorna nuevo objeto con propiedades necesarias para la interfaz, ej:
                no tiene sentido enviar contraseña si no se va a mostrar en ninguna parte 
             */
            return {
                nombre: baseDeDatosCensistas[posicionUsuarioEnArray].nombre,
                id: baseDeDatosCensistas[posicionUsuarioEnArray].id,
            };
        }
    }

    return false;
}