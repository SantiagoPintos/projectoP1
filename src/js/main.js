window.addEventListener("load", main);
function main(){
    ocultarAppCensista();    
    ocultarAppUsuario();    
    capturarClicks();
    app.precargarCensistas();
    app.precargarCensos()
}
function capturarClicks(){
    document.querySelector("#btnUsuarioCensista").addEventListener("click", iniciarAppCensista);

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
    
    document.querySelector("#btnValidarCensoMenuCensista").addEventListener("click", mostrarBusquedaValidacionDeCenso);
    
    
    //botón para buscar cédula en sección "validación de censo"
    document.querySelector("#btnBuscarCiValidarCenso").addEventListener("click", iniciarValidacionDeCenso);

    //botón "validar" en sección validar censo, funciones comprueban si hubo cambio en censo y lo validan
    document.querySelector("#btnFormValidarCensoPersona").addEventListener("click", finalizarValidacionDeCenso);

    document.querySelector("#btnVolverAtrasValidarCenso").addEventListener("click", volverAtrasValidarCenso);

    document.querySelector("#btnAtrasRegistroCensista").addEventListener("click", volverAtrasRegistroCensista);

    document.querySelector("#btnVolverAtrasLoginCensista").addEventListener("click", volverAtrasLoginCensista);


    document.querySelector("#btnUsuarioPersona").addEventListener("click", iniciarAppPersona);

    document.querySelector("#btnRealizarCensoMenuPersona").addEventListener("click", cuadroBusquedaCIPersona);


    document.querySelector("#btnBuscarCIPersona").addEventListener("click", buscarCiPersona);

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
function ocultarFormBusquedaValidacionCenso(){
    document.querySelector("#formBusquedaCiValidarCenso").style.display = "none";
}
function ocultarFormValidacionCenso(){
    document.querySelector("#formValidarCenso").style.display = "none";
}
function ocultarMenuOpcionesPersona(){
    document.querySelector("#menuPersona").style.display = "none";
}
function ocultarEstadisticasPersona(){
    document.querySelector("#mostrarEstadisticasPersona").style.display = "none";
}
function ocultarCensoPersona(){
    document.querySelector("#realizarCensoPersona").style.display = "none";
}
function ocultarCuadroBusquedaCiPersona(){
    document.querySelector("#cuadroBusquedaCIPersona").style.display = "none";
}
function ocultarFormCensoPersona(){
    document.querySelector("#formCensoPersona").style.display = "none";
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
function mostrarValidarCenso(){
    document.querySelector("#validarCenso").style.display = "block";
}
function mostrarFormBusquedaValidacionCenso(){
    document.querySelector("#formBusquedaCiValidarCenso").style.display = "block";
}
function mostrarFormValidacionCenso(){
    document.querySelector("#formValidarCenso").style.display = "block";
}
function mostrarAppUsuario(){
    document.querySelector("#aplicacionPersona").style.display = "block";
}
function mostrarMenuOpcionesPersona(){
    document.querySelector("#menuPersona").style.display = "block";
}
function mostrarEstadisticasPersona(){
    document.querySelector("#mostrarEstadisticasPersona").style.display = "block";
}
function mostrarCensoPersona(){
    document.querySelector("#realizarCensoPersona").style.display = "block";
}
function mostrarCuadroBusquedaCiPersona(){
    document.querySelector("#cuadroBusquedaCIPersona").style.display = "block";
}
function mostrarFormCensoPersona(){
    document.querySelector("#formCensoPersona").style.display = "block";
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

function iniciarAppCensista(){
    ocultarAppUsuario();
    mostrarAppCensista();
}

function registroCensista(){
    ocultarLoginCensista();
    mostrarFormularioRegistroCensista();
}

function volverAtrasValidarCenso(){
    ocultarValidarCenso();
    document.querySelector("#ciValidarCenso").value = "";
    mostrarMenuOpcionesCensista();
}

function volverAtrasRegistroCensista(){
    ocultarFormularioRegistroCensista();
    document.querySelector("#nuevoNombreCensista").value = "";
    document.querySelector("#nuevoUsuarioCensista").value = "";
    document.querySelector("#nuevoContraseñaCensista").value = "";
    mostrarLoginCensista();
}

function volverAtrasLoginCensista(){
    ocultarLoginCensista();
    mostrarSeleccionUsuario();
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

function mostrarBusquedaValidacionDeCenso(){
    ocultarMenuOpcionesCensista();
    mostrarValidarCenso();
    mostrarFormBusquedaValidacionCenso();
    ocultarFormValidacionCenso();
}

function iniciarAppPersona(){
    ocultarAppCensista();
    ocultarSeleccionUsuario();
    mostrarAppUsuario();
    mostrarMenuOpcionesPersona();
    ocultarCuadroBusquedaCiPersona();
    ocultarFormCensoPersona();
    ocultarEstadisticasPersona();
}

function cuadroBusquedaCIPersona(){
    ocultarMenuOpcionesPersona();
    mostrarCuadroBusquedaCiPersona();
}

function buscarCiPersona(){
    //buscar censo asociado a ci (limpiar & validar CI)
    //si no hay censo asociado=mostrar cuadro para hacer censo
    //si hay censo asociado - verificar validación - si no está validado=mostrar campos con info - verificar si hubo cambios
    const ci=document.querySelector("#busquedaNroCIPersona").value;
    const ciLimpia = app.limpiarNroCI(ci);
    let mensaje = "";

    //Validación de ci
    if (app.validarDigitoVerificadorCI(ciLimpia)) {
        //existe censo asociado a esa ci?
        // existe=está validado?
        // no existe= nuevo censo
        if (!app.existeCenso(ciLimpia)) {
            //nuevo censo
        } else {
            //está validado?
            if (!app.censoEstaValidado(ciLimpia)) {
                console.log("no está validado");
                //se puede modificar, obtiene índice y carga datos en campos de texto
                const indice = app.obtenerIndiceCenso(ciLimpia);
                const censo = app.baseDeDatosCensos[indice];
                console.log(censo)
                ocultarCuadroBusquedaCiPersona();
                mostrarFormCensoPersona();
                //cambia h2 por nombre de la persona
                document.querySelector("#tituloCuadroCensoPersona").innerHTML = censo.nombre;
                //carga datos en formulario
                document.querySelector("#nombrePersonaCenso").value = censo.nombre;
                document.querySelector("#edadPersonaCenso").value = censo.edad;
                document.querySelector("#ciPersonaCenso").value = censo.ci;
                cargarSelectDeDepartamentos("departamentoPersonaCenso");
                document.querySelector("#departamentoPersonaCenso").selectedIndex = censo.departamento;
                cargarSelectDeOcupacion("ocupacionPersonaCenso");
                document.querySelector("#ocupacionPersonaCenso").selectedIndex = censo.ocupacion;

                //TODO: comprobar cambios y pushear si es necesario

            } else {
                mensaje = "El censo asociado a esa cédula de indentidad ya fue validado por un censista";
            }
        }
    } else {
        mensaje = "El número de cédula no es válido";
    }
    document.querySelector("#mensajesCuadroBusquedaCIPersona").innerHTML = mensaje;
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
    funcion que extrae ci de sección "validar censo" y llama a función que la procesa.

    "indiceValidacionCenso" es usada para almacenar el índice del censo a validar ya que
    es requerido por "iniciarValidacionDeCenso()" y "finalizarValidacionDeCenso()" no tiene
    sentido realizar dos veces la validación de dígito verificador, censoEstaValidado y 
    obtenerIndiceCenso.

    validacionDatosCenso es usado en "finalizarValidacionDeCenso()" para comprobar que
    "finalizarValidacionDeCenso()" se haya ejecutado con anterioridad, es decir,
    la app verificó si hubo un proceso de validación de datos.
*/
let indiceValidacionCenso=-1;
let validacionDatosCenso = false;
let ciValidacionCenso = 0;
function iniciarValidacionDeCenso(){
    const ci = document.querySelector("#ciValidarCenso").value;
    const ciLimpia = app.limpiarNroCI(ci);
    let mensaje = "";
    if (app.validarDigitoVerificadorCI(ciLimpia)) {
        //si ci es válida se procede a buscar su existencia en bdd
        if (app.censoEstaValidado(ciLimpia) == false) {
            mostrarValidarCenso()
            ocultarFormBusquedaValidacionCenso();
            mostrarFormValidacionCenso();
            
            //obtener y mostrar en formulario datos de censo
            const indiceCenso = app.obtenerIndiceCenso(ciLimpia);
            const censo = app.baseDeDatosCensos[indiceCenso];
            document.querySelector("#formValidarCensoNombrePersona").value += censo.nombre;
            document.querySelector("#formValidarCensoEdadPersona").value += censo.edad;
            document.querySelector("#formValidarCensoCiPersona").value += censo.ci;

            //carga select con departamentos y muestra opción por defecto
            cargarSelectDeDepartamentos("formValidarCensoDepartamentoPersona");
            //selectedIndex establece la opción por defecto en select
            //referencia: https://www.w3schools.com/jsref/prop_select_selectedindex.asp
            document.querySelector("#formValidarCensoDepartamentoPersona").selectedIndex = censo.departamento;            
            cargarSelectDeOcupacion("formValidarCensoOcupacionPersona");
            document.querySelector("#formValidarCensoOcupacionPersona").selectedIndex = censo.ocupacion;

            //variables usadas por finazarValidacionDeCenso
            validacionDatosCenso = true;
            indiceValidacionCenso=indiceCenso;
            ciValidacionCenso=ciLimpia;

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

function finalizarValidacionDeCenso(){
    //TODO: Preguntar si es posible utilizar closures para anidar esta función dentro de 
    //iniciarValidacionDeCenso().
    const nombre = document.querySelector("#formValidarCensoNombrePersona").value;
    const edad = document.querySelector("#formValidarCensoEdadPersona").value;
    const ci = ciValidacionCenso;
    const departamento = document.querySelector("#formValidarCensoDepartamentoPersona").value;
    const ocupacion = document.querySelector("#formValidarCensoOcupacionPersona").value;

    let mensaje = "";
    if(validacionDatosCenso){
        //índice del primer censo siempre debe ser 0, si es -1 signfica que función anterior
        //no se ejecutó y por lo tanto los datos del formulario estarán vacíos
        if (indiceValidacionCenso>-1) {
            //comprueba si censo está validado para que validación solo se ejecute una vez 
            if (!app.censoEstaValidado(ci)) {
                if (app.censoFueModificado({
                    nombre: nombre,
                    edad: edad,
                    departamento: departamento,
                    ocupacion: ocupacion,
                }, indiceValidacionCenso)) {
                    //censo fue modificado
                    //TODO: PUSHEAR CAMBIOS

                    /* método para actualizar censo */

                    if (app.actualizarCenso({nombre, edad, ci, departamento, ocupacion}, indiceValidacionCenso)) {
                        mensaje = "Modificaciones guardadas correctamente";
                    } else {
                        mensaje = "Datos no válidos, el censo no puede ser validado";
                    }
                    
                    if(app.confirmarCenso(ciValidacionCenso)){
                        mensaje = "<br> Censo confirmado con éxito";
                    } else {
                        mensaje = "<br> El censo no pudo ser confirmado";
                    }     
                } else {
                    if(app.confirmarCenso(ciValidacionCenso)){
                        mensaje = "Censo confirmado con éxito";
                    }
                }
            } else {
                mensaje = "El censo ya fue validado";
            }
        } else {
            mensaje = "El censo no pudo ser encontrado en la base de datos";
        }
    } else {
        mensaje = "No se pudo validar el censo";
    }
    document.querySelector("#mjsFormValidarCenso").innerHTML = mensaje;
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