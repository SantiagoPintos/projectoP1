window.addEventListener("load", main);
function main(){
    ocultarAppCensista();    
    ocultarAppUsuario();    
    capturarClicks();
    app.precargarCensistas();
    app.precargarCensos()
}
function capturarClicks(){
    document.querySelector("#btnUsuarioCensista").addEventListener("click", mostrarAppCensista);

    document.querySelector("#btnIniciarSesionCensista").addEventListener("click", iniciarSesionCensista);
    document.querySelector("#btnRegistroCensista").addEventListener("click", registroCensista);
    

    //función que extrae datos de formulario, falta forma de invocar la aparición de dicho formulario y ocultar el resto
    document.querySelector("#btnRegistrarCensista").addEventListener("click", iniciarRegistroCensista);

    //checkbox "mostrar contraseña" en registro de nuevo censista 
    document.querySelector("#nuevoMostrarConseñaCensista").addEventListener("click", mostrarContraseñaRegistroCensista);

    document.querySelector("#btnCerrarSesionCensista").addEventListener("click", cerrarSesionCensista);

    //debe ser una función intermedia que muestra la interfaz del censo, y luego "terminar censo" debe generar el censo
    document.querySelector("#btnRealizarCensoMenuCensista").addEventListener("click", mostrarInterfazCenso);

    //boton "terminar censo" que pushea datos de censo a bdd
    document.querySelector("#btnTerminarCenso").addEventListener("click", terminarCenso);

    document.querySelector("#btnAtrasNuevoCenso").addEventListener("click", volverAtrasNuevoCenso);
    
    //botón para buscar cédula en sección "validación de censo"
    document.querySelector("#btnBuscarCiValidarCenso").addEventListener("click", iniciarValidacionDeCenso);

    //botón "validar" en sección validar censo, funciones comprueban si hubo cambio en censo y lo validan
    document.querySelector("#btnFormValidarCensoPersona").addEventListener("click", finalizarValidacionDeCenso);

}

/* 
    Funciones para mostrar/ocultar diferentes interfaces
*/
function ocultarSeleccionUsuario(){
    document.querySelector("#seleccionUsuario").style.display = "none";
}
function ocultarAppUsuario(){
    document.querySelector("#aplicacionPersona").style.display = "none";
}
function ocultarAppCensista(){
    document.querySelector("#aplicacionCensista").style.display = "none";
}
function ocultarFormularioRegistroCensista(){
    document.querySelector("#formularioRegistroCensista").style.display = "none";
}
function ocultarMenuOpcionesCensista(){
    document.querySelector("#menuCensista").style.display = "none";
}
function ocultarNuevoCensoCensista(){
    document.querySelector("#realizarNuevoCenso").style.display = "none";
}
function ocultarValidarCenso(){
    document.querySelector("#validarCenso").style.display = "none";
}
function ocultarPendientesValidacion(){
    document.querySelector("#CensosPendientesDeValidacion").style.display = "none";
}
function ocultarEstadisticasCensista(){
    document.querySelector("#visualizarEstadisticasCensista").style.display = "none";
}
function ocultarLoginCensista(){
    document.querySelector("#loginCensista").style.display = "none";
}
function mostrarAppCensista(){
    ocultarSeleccionUsuario();
    document.querySelector("#aplicacionCensista").style.display = "block";
    mostrarLoginCensista();
    ocultarFormularioRegistroCensista();
    ocultarMenuOpcionesCensista();
    ocultarNuevoCensoCensista();
    ocultarValidarCenso();
    ocultarPendientesValidacion();
    ocultarEstadisticasCensista();
}
function mostrarSeleccionUsuario(){
    document.querySelector("#seleccionUsuario").style.display = "block";
}
function mostrarLoginCensista(){
    document.querySelector("#loginCensista").style.display = "block";
}
function mostrarMenuOpcionesCensista(){
    document.querySelector("#menuCensista").style.display = "block";
}
function mostrarFormularioRegistroCensista(){
    document.querySelector("#formularioRegistroCensista").style.display = "block";
}
function mostrarNuevoCensoCensista(){
    document.querySelector("#realizarNuevoCenso").style.display = "block";
}



//aplicacion tiene dos arrays ("baseDeDatosCensos" y "baseDeDatosCensistas") y métodos para operar sobre estos 
let app = new App();


/* Interfaz */


//función que controla el inicio de sesión del censista
function iniciarSesionCensista(){
    //usuario se pasa a minúscula porque en bddcensistas de guardan en minúscula
    const usuario = document.querySelector("#usuarioCensista").value.toLowerCase();
    const clave = document.querySelector("#contraseñaCensista").value;
    /* 
        Perfil puede almacenar true o false
    */
    const perfil = app.verificarCredenciales(usuario, clave);
    if (perfil) {
        //Mostrar menú censista
        ocultarLoginCensista();
        mostrarMenuOpcionesCensista();
        document.querySelector("#parrafoNombreCensista").innerHTML = `Bienvenido ${app.censistaLogueado.nombre}`;
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

function cerrarSesionCensista(){
    app.cerrarSesion();
    ocultarAppCensista();
    ocultarAppUsuario();
    mostrarSeleccionUsuario();
}

function registroCensista(){
    ocultarLoginCensista();
    mostrarFormularioRegistroCensista();
}

/* 
    Funcion que extrae datos de formulario para registrar censista
*/
function iniciarRegistroCensista(){
    const nombre = document.querySelector("#nuevoNombreCensista").value;
    const nombreDeUsuario = document.querySelector("#nuevoUsuarioCensista").value.toLowerCase();
    const contraseña = document.querySelector("#nuevoContraseñaCensista").value;
    let mensajeParaParrafo = "";
    const validacionUsuario = app.validarNombreUsuario(nombreDeUsuario);
 
    if (nombre!="") {
        if(validacionUsuario==true){
            //si nombre de usuario es válido se llama a función que valida contraseña
            if (app.validarContraseña(contraseña)) {
                //se llama a función que registra usuario
                app.registrarCensista(nombre, nombreDeUsuario, contraseña);
                //se muestra mensaje de confirmación y redirige al censista hacia panel de login después de 5 segundos
                console.log("registro exitoso");

                //NO FUNCIONA(?)
                document.querySelector("#msjRegistroCensista").innerHTML = "Registro exitoso, en 5 segundos será redirigido hacia la pantalla de inicio de seesión";
                
                //detiene la ejecución durante 5 segundos para mostrar mensaje
                setTimeout(() => {
                    document.querySelector("#nuevoNombreCensista").value = "";
                    document.querySelector("#nuevoUsuarioCensista").value = "";
                    document.querySelector("#nuevoContraseñaCensista").value = "";
                    ocultarFormularioRegistroCensista();
                    mostrarLoginCensista(); 
                }, 5000);
            } else {
                mensajeParaParrafo = "La contraseña debe tener al mínimo 5 caracteres, al menos una mayúscula, una minúscula y un número";
            }
        } else if (validacionUsuario == -1){
            mensajeParaParrafo="El nombre de usuario no es válido";
        } else {
            mensajeParaParrafo="El nombre de usuario no está disponible";
        }
    } else {
        mensajeParaParrafo = "El nombre no puede estar vacío"
    }

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
    Función que se ejecuta al iniciar nuevo censo desde app censista
*/
function mostrarInterfazCenso(){
    ocultarMenuOpcionesCensista();
    mostrarNuevoCensoCensista();
    //popular el selectores de ocupación y departamento
    cargarSelectDeDepartamentos("departamentoNuevoCenso");
    cargarSelectDeOcupacion("ocupacionNuevoCenso");
}

/* 
    Función que permite al censista volver hacia el menú principal desde "Realizar nuevo censo"
*/
function volverAtrasNuevoCenso(){
    ocultarNuevoCensoCensista();
    document.querySelector("#nombreNuevoCenso").value = "";    
    document.querySelector("#edadNuevoCenso").value = "";    
    document.querySelector("#cedulaNuevoCenso").value = "";   
    document.querySelector("#departamentoNuevoCenso").selectedIndex = 0;
    document.querySelector("#ocupacionNuevoCenso").selectedIndex = 0;
    mostrarMenuOpcionesCensista();
}


/* 
    Función que extrae datos
*/
function terminarCenso(){
    const nombre = document.querySelector("#nombreNuevoCenso").value;
    const edad = document.querySelector("#edadNuevoCenso").value;
    const ci = document.querySelector("#cedulaNuevoCenso").value;
    const departamento = Number(document.querySelector("#departamentoNuevoCenso").value);
    const ocupacion = Number(document.querySelector("#ocupacionNuevoCenso").value);
    let mensajeParrafo = "";

    if (nombre != "") {
        if (edad>=0 && edad<=130) {
            if (app.validarDigitoVerificadorCI(app.limpiarNroCI(ci))) {
                if (!app.existeCenso(app.limpiarNroCI(ci))) {
                    if (departamento!=0) {
                        if (ocupacion!=0) {
                            if(app.realizarCenso(nombre,edad,ci,departamento,ocupacion)){
                                mensajeParrafo = "Censo finalizado correctamente"
                                document.querySelector("#nombreNuevoCenso").value = "";    
                                document.querySelector("#edadNuevoCenso").value = "";    
                                document.querySelector("#cedulaNuevoCenso").value = "";   
                                document.querySelector("#departamentoNuevoCenso").selectedIndex = 0;
                                document.querySelector("#ocupacionNuevoCenso").selectedIndex = 0;
                            } else {
                                console.warn(`app.realizar censo retornó false!`);
                                mensajeParrafo = "Algo salió mal";
                            }
                        } else {
                            mensajeParrafo = "Seleccione la ocupación";
                        }
                    } else {
                        mensajeParrafo = "Seleccione un departamento"
                    }
                } else {
                    mensajeParrafo = "Ya hay un censo asociado a ";
                }
            } else {
                mensajeParrafo = "El número de cédula no es válido";
            }
        } else {
            mensajeParrafo = "La edad ingresada no está dentro del rango permitido";
        }
    } else {
        mensajeParrafo = "El nombre no puede estar vacío";
    }

    document.querySelector("#msjRealizarNuevoCenso").innerHTML = mensajeParrafo;
}

/*  
    funcion que extrae ci de sección "validar censo" y llama a función que la procesa 
*/
function iniciarValidacionDeCenso(){
    const ci = document.querySelector("#ciValidarCenso").value;
    const ciLimpia = app.limpiarNroCI(ci);
    let mensaje = "";
    if (app.validarDigitoVerificadorCI(ciLimpia)) {
        //si ci es válida se procede a buscar su existencia en bdd
        if (app.censoEstaValidado(ciLimpia) == false) {
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
        } else if (app.censoEstaValidado(ciLimpia) == true){
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