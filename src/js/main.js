window.addEventListener("load", main);
function main(){
    capturarClicks();
    precargarCensistas();
    precargarCensos()
}
function capturarClicks(){
    document.querySelector("#btnIniciarSesionCensista").addEventListener("click", iniciarSesionCensista);

    //función que extrae datos de formulario, falta forma de invocar la aparición de dicho formulario y ocultar el resto
    document.querySelector("#btnRegistrarCensista").addEventListener("click", iniciarRegistroCensista);

    //checkbox "mostrar contraseña" en registro de nuevo censista 
    document.querySelector("#nuevoMostrarConseñaCensista").addEventListener("click", mostrarContraseñaRegistroCensista);

    //debe ser una función intermedia que muestra la interfaz del censo, y luego "terminar censo" debe generar el censo
    document.querySelector("#btnRealizarCensoMenuCensista").addEventListener("click", mostrarInterfazCenso);

    //boton "terminar censo" que pushea datos de censo a bdd
    document.querySelector("#btnTerminarCenso").addEventListener("click", iniciarCenso);
    
    //botón para buscar cédula en sección "validación de censo"
    document.querySelector("#btnBuscarCiValidarCenso").addEventListener("click", iniciarValidacionDeCenso);

    //botón "validar" en sección validar censo, funciones comprueban si hubo cambio en censo y lo validan
    document.querySelector("#btnFormValidarCensoPersona").addEventListener("click", finalizarValidacionDeCenso);
}

//aplicacion tiene dos arrays ("baseDeDatosCensos" y "baseDeDatosCensistas") y métodos para operar sobre estos 
let app = new App();
/* 
    Función que precarga censistas al inicar la aplicación
*/
function precargarCensistas(){
    app.crearCensista("Pedro Rodríguez", "pedror", "123aA", generarIdCensista());
    app.crearCensista("Enzo Hernández", "hernandeze", "Hernandez21", generarIdCensista());
    app.crearCensista("Julián Pérez", "juliancitop", "Hola45", generarIdCensista());
}
function precargarCensos(){
    app.nuevoCenso("Usuario Prueba", 20, 49915228, 2, 3, 2);
    //app.confirmarCenso(49915228);
}


/* Interfaz */


let idCensistaLogueado = -1;
//función que controla el inicio de sesión del censista
function iniciarSesionCensista(){
    //usuario se pasa a minúscula porque en bddcensistas de guardan en minúscula
    const usuario = document.querySelector("#usuarioCensista").value.toLowerCase();
    const clave = document.querySelector("#contraseñaCensista").value;
    /* 
        Perfil puede almacenar un objeto (contiene el nombre del censista y su id,
        este último es usado al momento de terminar/validar un censo) o "false"
    */
    const perfil = verificarCredenciales(usuario, clave);

    if (perfil) {
        //Parsear objeto y mostrar datos
        document.querySelector("#parrafoNombreCensista").innerHTML = `Bienvenido ${perfil.nombre}`;
        //TODO: buscar mejor forma de almacenar id de censista fuera de la función
        idCensistaLogueado = perfil.id;
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
    const validacionUsuario = validarNombreUsuarioCensista(nombreDeUsuario);
    
    if(validacionUsuario==true){
        //si nombre de usuario es válido se llama a función que valida contraseña
        if (validarContraseña(contraseña)) {
            //se llama a función que registra usuario
            registrarCensista(nombre, nombreDeUsuario, contraseña);
        } else {
            mensajeParaParrafo = "La contraseña debe tener al mínimo 5 caracteres, al menos una mayúscula, una minúscula y un número";
        }
    } else if (validacionUsuario == -1){
        mensajeParaParrafo="El nombre de usuario no es válido";
    } else {
        mensajeParaParrafo="El nombre de usuario no está disponible";
    }

    //mensaje de error/confirmación
    document.querySelector("#msjRegistroCensista").innerHTML = mensajeParaParrafo;
}


/* 
    Función que controla el checkbox "Mostrar contraseña" de registro de nuevo censista
*/
function mostrarContraseñaRegistroCensista(){
    let estado=document.querySelector("#nuevoContraseñaCensista");

    if (estado.type=="password") {
        estado.type = "text";
    } else {
        estado.type = "password";
    }
}

/* 
    Llama a funciones que cargan los valores de <select> departamento y ocupación
*/
function mostrarInterfazCenso(){
    //popular el selectores de ocupación y departamento
    cargarSelectDeDepartamentos("departamentoNuevoCenso");
    cargarSelectDeOcupacion("ocupacionNuevoCenso");
}


/* 
    Función que extrae datos
*/
function iniciarCenso(){
    const nombre = document.querySelector("#nombreNuevoCenso").value;
    const edad = document.querySelector("#edadNuevoCenso").value;
    const ci = document.querySelector("#cedulaNuevoCenso").value;
    const departamento = Number(document.querySelector("#departamentoNuevoCenso").value);
    const ocupacion = Number(document.querySelector("#ocupacionNuevoCenso").value);

    let mensajeParrafo = realizarCenso(nombre,edad,ci,departamento,ocupacion);

    document.querySelector("#msjRealizarNuevoCenso").innerHTML = mensajeParrafo;
}

/*  
    funcion que extrae ci de sección "validar censo" y llama a función que la procesa 
*/
function iniciarValidacionDeCenso(){
    const ci = document.querySelector("#ciValidarCenso").value;
    const ciLimpia = limpiarNroCI(ci);
    let mensaje = "";
    if (validarDigitoVerificadorCI(ciLimpia)) {
        //si ci es válida se procede a buscar su existencia en bdd
        if (censoEstaValidado(ciLimpia) == false) {
            //censo aún no está validado
            //se tiene que llamar a función que muestre formulario, otra que traiga los datos asociados a c/u de los campos
            //y se agregue el eventlistener del botón para validar
            console.log("censo no está validado, cargando datos a formulario");
            //obtener y mostrar en formulario datos de censo
            const indiceCenso = app.obtenerIndiceCenso(ciLimpia);
            const censo = app.baseDeDatosCensos[indiceCenso];

            document.querySelector("#formValidarCensoNombrePersona").value += censo.nombre;
            document.querySelector("#formValidarCensoEdadPersona").value += censo.edad;
            document.querySelector("#formValidarCensoCiPersona").value += censo.ci;
            //popular select departamento y edad

            //carga select con departamentos y muestra opción por defecto
            cargarSelectDeDepartamentos("formValidarCensoDepartamentoPersona");
            //selectedIndex establece la opción por defecto en select
            //referencia: https://www.w3schools.com/jsref/prop_select_selectedindex.asp
            document.querySelector("#formValidarCensoDepartamentoPersona").selectedIndex = censo.departamento;
            
            cargarSelectDeOcupacion("formValidarCensoOcupacionPersona");
            document.querySelector("#formValidarCensoOcupacionPersona").selectedIndex = censo.ocupacion;

            //TODO: Pasar a finalizarValidacionDeCenso() que se ejecuta al presionar boton validar, 
            //buscar forma de pasarle indice y/o ciLimpia
            //llamada a función que verifica si hubo modificaciones, valida y guarda en bdd
            if (censoFueModificado({
                nombre: document.querySelector("#formValidarCensoNombrePersona").value,
                edad: document.querySelector("#formValidarCensoEdadPersona").value,
                departamento: document.querySelector("#formValidarCensoDepartamentoPersona").value,
                ocupacion: document.querySelector("#formValidarCensoOcupacionPersona").value,
            }, indiceCenso)) {
                //censo fue modificado
                
            } else {
                //censo no fue modificado
                console.log("Censo no fue modificado!")
            }
        } else if (censoEstaValidado(ciLimpia) == true){
            //censo ya fue validado
            mensaje = "El censo asociado a esta cédula de indentidad ya fue validado";
        } else {
            //censo no existe 
            mensaje = "No hay censo asociado a la cédula de indentidad";
        }
    } else {
        mensaje = "El número de cédula no es válido";
    }
    document.querySelector("#msjBusquedaValidarCenso").innerHTML = mensaje;
}

/* 
    Función que se ejecuta al presionar botón "Validar" en sección "Validar Censo",
    extrae datos desde campos de texto e invoca a censoFueModificado()
*/
function finalizarValidacionDeCenso(){

}


                    /* Funciones de lógica */

/* 
    Función que comprueba si hubo modificaciones en datos de censo, es llamada desde iniciarValidacionDeCenso()
    recibe como parámetro un objeto (datos de censo) e índice y retorna true (hubo cambios) false (no hubo cambios)
*/

function censoFueModificado({nombre, edad, departamento, ocupacion}, indice){
    const nuevosDatos = {
        //es lo mismo que nombre: nombre,
        nombre,
        edad,
        departamento,
        ocupacion,
    }
    //datosOriginales es objeto
    const datosOriginales = app.baseDeDatosCensos[indice];

    if(nuevosDatos.departamento == datosOriginales.nombre
        && nuevosDatos.edad == datosOriginales.edad
        && nuevosDatos.departamento == datosOriginales.departamento
        && nuevosDatos.ocupacion == datosOriginales.ocupacion){
            //no hay modificaciones en el censo
            return false;
    } else {
        //hay modificaciones en el censo, crear método para agregarlas
    }
}


/* 
    Función que recibe ci de formulario de validación de censo y comprueba si el censo asociado está validado.
    Si censo está validado retorna true, si está pendiente retorna false y si no hay censo
    asociado a esa ci retorna -1
*/
function censoEstaValidado(ci){
    if (app.existeCenso(ci)) {
        //Se obtiene índice de censo en bdd y se verifica estado de prop "censado"
        const indice = app.obtenerIndiceCenso(ci);
        if (app.baseDeDatosCensos[indice].censado == false) {
            //aún no está validado
            //mostrar UI y completar campos
            return false;
        } else {
            //censo ya fue validado
            return true;
        }
    } else {
        //no hay censo asociado a esa ci
        return -1;
    }
}

/* 
    Función intermedia que hace todas las verificaciones llamando a funciones específicas para cada 
    cada elemento y retorna string con mensaje de aprobación/error 
*/
function realizarCenso(nombre,edad,ci,departamento,ocupacion){
    //nro ci sin puntos ni guiones
    let nroCiLimpio = limpiarNroCI(ci);
    let mensaje = "";
    
    //validar datos
    if (validarNombre(nombre)) {
        //validar edad
        if(validarEdad(edad)){
            //validar ci
            if(validarDigitoVerificadorCI(nroCiLimpio)){
                //valida que no exista censo con esa ci
                if (!app.existeCenso(nroCiLimpio)) {
                    //validar que departamento y ocupación no tengan valores por defecto
                    if (departamento!=0) {
                        if (ocupacion!=0) {
                            //crea censo
                            app.nuevoCenso(nombre, edad, nroCiLimpio, departamento, ocupacion, idCensistaLogueado);
                            //confima censo cambiando la propiedad "censado" a "true"
                            if (app.confirmarCenso(nroCiLimpio)) {
                                mensaje = "Censo finalizado correctamente"
                            } else {
                                mensaje = "Algo salió mal";
                            }
                        } else {
                            mensaje = "La ocupación no es válida";
                        }
                    } else {
                        mensaje = "El departamento no es válido";
                    }
                } else {
                    mensaje = "Ya existe un censo asociado a la cédula de indentidad";
                }
            } else {
                mensaje = "El número de cédula ingresado no es correcto";
            }
        } else {
            mensaje = "La edad ingresada no es válida";
        }
    } else {
        mensaje = "El nombre ingresado no es válido";
    }

    return mensaje
}

/* 
    Función que valida edad de personas, para el censo
*/
function validarEdad(edad){
    /* 
        Cubre caso en que el usuario no ingrese nada en el campo "Edad" 
        la variable edad tendrá un string vacío
    */
    if (edad != "" && !isNaN(edad)) {
        //verificar si es entero?
        if (edad<=130 && edad>=0) {
            return true;
        } else {
            return false;
        }
    }
    return false
}


/* 
    Función que valida nombre ingresado
    verifica que no tenga números 
    TODO: verificar otros caracteres no-letras
*/
function validarNombre(nombre){
    let esValido = true;
    nombre = nombre.trim();

    //controla caso en que nombre sea un string de espacios y quede vacío después de trim
    if (nombre) {
        //validar si tiene números
        for (let i = 0; i < nombre.length && esValido; i++) {
            const caracter = nombre.charAt(i);
            //si el caracter encontrado es un número se detiene el loop
            if (Number(caracter)) {
                esValido = false;
            }
            //TODO:controlar caracteres diferentes a letras (!.-+)
        }
    } else {
        esValido = false;
    }
    
    return esValido;
}





/* 
    Función que adjunta id a los datos extraídos del formulario y llama a método que lo pushea a base de datos
*/
function registrarCensista(nombre, usuario, contraseña){
    let nuevaId = generarIdCensista();
    app.crearCensista(nombre, usuario, contraseña, nuevaId);
}

/* 
    Función que se encarga de generar el id único de cada censista al momento de su registro
    en la aplicación, retorna un número incremental basado en la cantidad de ids registrados 
    previamente
*/
function generarIdCensista(){
    return app.baseDeDatosCensistas.length;
}

/* 
    Comprueba si el nombre de usuario elegido por el censista durante el proceso de registro está disponible
    en array baseDeDatosCensistas, retorna true, false ó -1 en caso de ser inválido
*/
function validarNombreUsuarioCensista(usuario){
    let disponible = true;
    //Elimina posibles espacios al inicio/final
    usuario=usuario.trim();
    
    //maneja caso en que usuario está compuesto SOLO por espacios y queda vacío después del trim
    if (usuario) {
        //no puede contener espacios en ninguna posición, ejemplo: "hola mundo" no es válido
        if (!usuario.includes(" ")) {
            for (let i = 0; i < app.baseDeDatosCensistas.length && disponible; i++) {
                const nombre = app.baseDeDatosCensistas[i].usuario;
                if (nombre==usuario) {
                    disponible = false;
                }
            }
            return disponible;
        }
    } 
    return -1;
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

//valida digito verificador y retorna true o false
function validarDigitoVerificadorCI(cedula){
    /*
        Referencia obtenida de: https://ciuy.readthedocs.io/es/latest/about.html#calculating-the-validation-number ,
        diferente al mostrado en clase pero pasa todos los casos proporcionados en práctico 5 ejercicio 16
    */
   let multiplos = [8,1,2,3,4,7,6];
   let acumulador = 0;
   let esValida = false;
   
   if(cedula.length>6 && cedula.length<10){
        //variable declarada dentro de if para evitar fallo en caso de que ci sea un string vacío
        const digitoVerificador = cedula.charAt(cedula.length-1);

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
    }
    
    return esValida;
}

//recibe por parámetro id de <select> y le agrega departamentos
function cargarSelectDeDepartamentos(id){
    const arrayDepartamentos = ["Seleccione...", "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", 
    "Flores", "Florida", "Lavalleja","Maldonado", "Montevideo", "Paysandú", "Río Negro", 
    "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Trés"];
    let cargar = ``;

    for (let i = 0; i < arrayDepartamentos.length; i++) {
        const departamento = arrayDepartamentos[i];
        cargar += `<option value="${i}">${departamento}</option>`;
    }
    document.querySelector(`#${id}`).innerHTML = cargar;
}

function cargarSelectDeOcupacion(id){
    const arrayOcupaciones = ["Seleccione...", "Dependiente", "Independiente", "Estudiante", "No trabaja"];
    let cargar = ``;

    for (let i = 0; i < arrayOcupaciones.length; i++) {
        const ocupacion= arrayOcupaciones[i];
        cargar +=`<option value="${i}">${ocupacion}</option>`;
    }
    document.querySelector(`#${id}`).innerHTML = cargar;
}

/* 
    verifica si usuario y contraseña de censista son correctos, es llamada desde iniciarSesionCensista,
    retorna objeto con datos o false
*/
function verificarCredenciales(usuario, contraseña){
   /* 
        usuario y contraseña se deben verificar ante "baseDeDatosCensistas"
        cada elemento es un objeto con usuario y contraseña como propiedades
        por lo tanto: usuario == (recorrer array)app.baseDeDatosCensistas.usuario 
    */
    let usuarioEncontrado = false;
    let posicionUsuarioEnArray = 0;

    for (let i = 0; i < app.baseDeDatosCensistas.length && !usuarioEncontrado; i++) {
        const usuarioAlmacenado = app.baseDeDatosCensistas[i].usuario;
        if (usuarioAlmacenado==usuario) {
            usuarioEncontrado = true;
            posicionUsuarioEnArray = i;
        }
    }

    //Solo se debe comprobar la contraseña si el usuario existe
    if (usuarioEncontrado) {
        if (contraseña==app.baseDeDatosCensistas[posicionUsuarioEnArray].contraseña) {
            /* 
                Si contraseña coincide se retorna el objeto con los datos a parsear en ui.

                Se retorna nuevo objeto con propiedades necesarias para la interfaz, ej:
                no tiene sentido enviar contraseña si no se va a mostrar en ninguna parte 
             */
            return {
                nombre: app.baseDeDatosCensistas[posicionUsuarioEnArray].nombre,
                id: app.baseDeDatosCensistas[posicionUsuarioEnArray].id,
            };
        }
    }

    return false;
}