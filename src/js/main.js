window.addEventListener("load", main);
function main(){
    ocultarAppCensista();    
    ocultarAppUsuario();    
    capturarClicks();
    app.precargarCensistas();
    app.precargarCensos()
}
let app = new App();

function capturarClicks(){
    //carga interfaz de la aplicación para el usuario censista
    document.querySelector("#btnUsuarioCensista").addEventListener("click", iniciarAppCensista);
    //botones para iniciar sesión y/o registrar un nuevo censista
    document.querySelector("#btnIniciarSesionCensista").addEventListener("click", iniciarSesionCensista);
    //muestra interfaz para registrar un nuevo censista
    document.querySelector("#btnRegistroCensista").addEventListener("click", registroCensista);
    //función que extrae datos de formulario, falta forma de invocar la aparición de dicho formulario y ocultar el resto
    document.querySelector("#btnRegistrarCensista").addEventListener("click", iniciarRegistroCensista);
    //checkbox "mostrar contraseña" en registro de nuevo censista 
    document.querySelector("#nuevoMostrarConseñaCensista").addEventListener("click", mostrarContraseñaRegistroCensista);
    //botón "cerrar sesión" de usuario censista
    document.querySelector("#btnCerrarSesionCensista").addEventListener("click", cerrarSesionCensista);
    //Botón "Realizar nuevo censo" de aplicación para censista
    document.querySelector("#btnRealizarCensoMenuCensista").addEventListener("click", mostrarInterfazCenso);
    //boton "terminar censo" de aplicación para censista
    document.querySelector("#btnTerminarCenso").addEventListener("click", terminarCenso);
    //Botón "A´tras" mostrado en sección "nuevo censo" de aplicación para censistas
    document.querySelector("#btnAtrasNuevoCenso").addEventListener("click", volverAtrasNuevoCenso);
    //botón "Validar censos pendientes" de aplicación para censistas
    document.querySelector("#btnValidarCensoMenuCensista").addEventListener("click", mostrarBusquedaValidacionDeCenso);
    //botón para buscar cédula en sección "validación de censo"
    document.querySelector("#btnBuscarCiValidarCenso").addEventListener("click", iniciarValidacionDeCenso);
    //botón "validar" en sección validar censo (app censista), funciones comprueban si hubo cambio en censo y lo validan
    document.querySelector("#btnFormValidarCensoPersona").addEventListener("click", finalizarValidacionDeCenso);
    //botón "Atrás" mostrado en sección de validación de censo en aplicación de censista
    document.querySelector("#btnVolverAtrasValidarCenso").addEventListener("click", volverAtrasValidarCenso);
    //botón "Atrás" mostrado en sección de login de aplicación de censistas
    document.querySelector("#btnVolverAtrasLoginCensista").addEventListener("click", volverAtrasLoginCensista);
    //botón "Atrás" mostrado en interfaz de registro de censistas
    document.querySelector("#btnAtrasRegistroCensista").addEventListener("click", volverAtrasRegistroCensista);
    //función que muestra interfaz de estadísticas en app de censista
    document.querySelector("#btnMostarInfoMenuCensista").addEventListener("click", estadisticasCensista);
    //muestra interfaz de la aplicación dedicada al usuario invitado
    document.querySelector("#btnUsuarioPersona").addEventListener("click", iniciarAppPersona);
    //cuadro de búsqueda de ci en aplicación invitado
    document.querySelector("#btnRealizarCensoMenuPersona").addEventListener("click", cuadroBusquedaCIPersona);
    document.querySelector("#btnBuscarCIPersona").addEventListener("click", buscarCiPersona);
    //btn para modificar datos de censo (app invitado)
    document.querySelector("#btnEditarCensoPersona").addEventListener("click", usuarioModificoCenso);
    //btn para finalizar censo (app invitado)
    document.querySelector("#btnFinalizarCensoPersona").addEventListener("click", usuariofinalizaCenso);
    //btn para volver atrás (app persona, formulario censo)
    document.querySelector("#btnVolverAtrasCensoPersona").addEventListener("click", volverAtrasPersonaNuevoCenso);
    //btn "reasignar censo" en app censista
    document.querySelector("#btnReasignarCensoMenuCensista").addEventListener("click", mostrarMenuReasignarCenso);
    //boton que invoca función para validar datos y reasignar censo
    document.querySelector("#btnReasignarCenso").addEventListener("click", reasignarCenso);
    //botón "Atrás" en reasignación de censo, app censista
    document.querySelector("#btnAtrasReasignarCenso").addEventListener("click", volverAtrasReasignarCenso);
    //boton "Eliminar datos" (de censo) en aplicación invitado
    document.querySelector("#btnEliminarCensoPersona").addEventListener("click", eliminarCensoPersona);
    //botón para mostrar interfaz de estadísticas en app invitado
    document.querySelector("#btnMostrarEstadisticasMenuPersona").addEventListener("click", estadisticasPersona);
    //btn de selección de departamento en sección "estadísticas" de app censista
    document.querySelector("#btnMostrarPorcentajesMenoresMayoresPorDepartamento").addEventListener("click", cargarPersonasMayoresYMenores);
    //btn "atrás" de la sección "estadísticas" de app censista
    document.querySelector("#btnVolverAtrasEstadisticasAppCensista").addEventListener("click", volverAtrasEstadisticasCensista);
    //btn "atrás" de la sección "estadísticas" de app invitado
    document.querySelector("#btnAtrasEstadisticasPersona").addEventListener("click", volverAtrasEstadisticasPersona);
    //cierra interfaz de aplicación invitado
    document.querySelector("#btnSalirAppPersona").addEventListener("click", salirAppPersona);
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
function ocultarCuadroBusquedaCiPersona(){
    document.querySelector("#cuadroBusquedaCIPersona").style.display = "none";
}
function ocultarFormCensoPersona(){
    document.querySelector("#formCensoPersona").style.display = "none";
}
function ocultarBtnFinalizarCensoPersona(){
    document.querySelector("#btnFinalizarCensoPersona").style.display = "none";
}
function ocultarBtnEditarCensoPersona(){
    document.querySelector("#contenedorBtnEliminarCensoPersona").style.display = "none";
}
function ocultarReasignarCenso(){
    document.querySelector("#reasignarCenso").style.display = "none";
}
function mostrarAppCensista(){
    ocultarSeleccionUsuario();
    document.querySelector("#aplicacionCensista").style.display = "block";
    mostrarLoginCensista();
    ocultarFormularioRegistroCensista();
    ocultarMenuOpcionesCensista();
    ocultarNuevoCensoCensista();
    ocultarValidarCenso();
    ocultarReasignarCenso();
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
function mostrarEstadisticasCensista(){
    document.querySelector("#visualizarEstadisticasCensista").style.display = "block";
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
function mostrarCuadroBusquedaCiPersona(){
    document.querySelector("#cuadroBusquedaCIPersona").style.display = "block";
}
function mostrarFormCensoPersona(){
    document.querySelector("#formCensoPersona").style.display = "block";
}
function mostrarBtnFinalizarCensoPersona(){
    document.querySelector("#btnFinalizarCensoPersona").style.display = "block";
}
function mostrarBtnEditarCensoPersona(){
    document.querySelector("#contenedorBtnEliminarCensoPersona").style.display = "block";
}
function mostrarReasignarCenso(){
    document.querySelector("#reasignarCenso").style.display = "block";
}





/* Interfaz */
function iniciarAppCensista(){
    ocultarAppUsuario();
    mostrarAppCensista();
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

function volverAtrasValidarCenso(){
    ocultarValidarCenso();
    document.querySelector("#ciValidarCenso").value = "";
    document.querySelector("#formValidarCensoCiPersona").value = "";
    document.querySelector("#formValidarCensoNombrePersona").value = "";
    document.querySelector("#formValidarCensoEdadPersona").value = "";
    document.querySelector("#formValidarCensoDepartamentoPersona").value = "";
    document.querySelector("#formValidarCensoOcupacionPersona").value = "";
    /* 
        finalizarValidacionDeCenso() usa el párrafo para mostrar mensajes al usuario, esto cubre caso en que se intenta validar censo y luego presiona botón "Atrás",
        de esta forma se evita que se muestre un mensaje de una ejecución previa. 
    */
    document.querySelector("#mjsFormValidarCenso").innerHTML = "";
    document.querySelector("#msjBusquedaValidarCenso").innerHTML = "";
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
    /* 
        Limpia mensajes de ejecuciones anteriores al volver atrás
    */
    document.querySelector("#msjLoginCensista").innerHTML = "";
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

/* 
    Función que muestra la sección "estadísticas" al usuario censista
*/
function estadisticasCensista(){
    ocultarMenuOpcionesCensista();
    mostrarEstadisticasCensista();
    cargarEstadisticasCensista();
}

/* 
    Función que muestra sección de validación de censos e invoca a función que popula combobox
    con censos pendientes.
*/
function mostrarBusquedaValidacionDeCenso(){
    ocultarMenuOpcionesCensista();
    cargarSelectorCensosPendientes("ciValidarCenso");
    mostrarValidarCenso();
    mostrarFormBusquedaValidacionCenso();
    ocultarFormValidacionCenso();
}

/* 
    Función que inicia la sección de la aplicación para el usuario inivitado
*/
function iniciarAppPersona(){
    ocultarAppCensista();
    ocultarSeleccionUsuario();
    mostrarAppUsuario();
    mostrarMenuOpcionesPersona();
    ocultarCuadroBusquedaCiPersona();
    ocultarFormCensoPersona();
    ocultarEstadisticasPersona();
}

/* 
    Función encargada de mostrar el cuadro de búsqueda previo a realizar un censo en la aplicación invitado
*/
function cuadroBusquedaCIPersona(){
    ocultarMenuOpcionesPersona();
    mostrarCuadroBusquedaCiPersona();
}

function volverAtrasPersonaNuevoCenso(){
    ocultarFormCensoPersona();
    ocultarBtnEditarCensoPersona();
    iniciarAppPersona();
    document.querySelector("#nombrePersonaCenso").value = "";
    document.querySelector("#edadPersonaCenso").value = "";
    document.querySelector("#ciPersonaCenso").value = "";
    document.querySelector("#departamentoPersonaCenso").value = "";
    document.querySelector("#ocupacionPersonaCenso").value = "";
    document.querySelector("#busquedaNroCIPersona").value = "";
    document.querySelector("#msjFormCensoPersona").innerHTML = "";
}

function mostrarMenuReasignarCenso(){
    ocultarMenuOpcionesCensista();
    cargarSelectorCensosPendientes("mostrarCensosPendientes");
    cargarSelectorCensistasDisponibles();
    mostrarReasignarCenso();
}

function volverAtrasReasignarCenso(){
    ocultarReasignarCenso();
    document.querySelector("#mostrarCensosPendientes").innerHTML = "";
    document.querySelector("#mostrarCensistasDisponibles").innerHTML = "";
    document.querySelector("#parrafoMsjReasignarCenso").innerHTML = "";
    mostrarMenuOpcionesCensista();
}

function volverAtrasEstadisticasCensista(){
    ocultarEstadisticasCensista();
    mostrarMenuOpcionesCensista();
}

function estadisticasPersona(){
    ocultarMenuOpcionesPersona();
    mostrarEstadisticasPersona();
    cargarEstadisticasPersona();
}

function volverAtrasEstadisticasPersona(){
    ocultarEstadisticasPersona();
    mostrarMenuOpcionesPersona();
}

function salirAppPersona(){
    ocultarAppUsuario();
    mostrarSeleccionUsuario();
}

/* 
    Función invocada desde buscarCiPersona().
    Usuario ingresa ci, no hay censo asociado a ella y esta se encarga de mostrar formulario
    popular campo de ci y mostrar funciones (botones) disponibles  
*/
function usuarioIniciaNuevoCenso(ci){
    mostrarFormCensoPersona();
    ocultarCuadroBusquedaCiPersona();
    ocultarBtnEditarCensoPersona();
    //popula selectores de departamento y ocupacion
    cargarSelectDeDepartamentos("departamentoPersonaCenso");
    cargarSelectDeOcupacion("ocupacionPersonaCenso");
    //popular cuadro de ci y deshabilitar edición
    document.querySelector("#ciPersonaCenso").value = ci;
    document.querySelector("#ciPersonaCenso").readOnly = "true";
}

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


/* 
    buscarCiPersona: función que verifica si la CI ingresada por el usuario tiene un censo asociado,
    si lo tiene (y aún no fue validado) muestra los datos para ser modificados, en caso contrario,
    muestra la interfaz para que el usuario genere un nuevo censo y se le adjudique a los censistas
    registrados.

    ciCenso almacena una copia "limpiada" de la ci del usuario, es utilizada en función usuarioModificoCenso.
    Es usada para precargar el campo "Cédula de indentidad" cuando el usuario invitado quiere modificar/eliminar sus
    datos de censo. 
*/
let ciCenso = -1;
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
            usuarioIniciaNuevoCenso(ciLimpia);
        } else {
            //existe censo asociado a esa CI
            
            //se puede modificar, obtiene índice y carga datos en campos de texto
            const indice = app.obtenerIndiceCenso(ciLimpia);
            const censo = app.baseDeDatosCensos[indice];

            //se muestra nombre de la persona en títutlo
            document.querySelector("#tituloCuadroCensoPersona").innerHTML = censo.nombre;
            
            //está validado?
            if (!app.censoEstaValidado(ciLimpia)) {
                ocultarCuadroBusquedaCiPersona();
                mostrarFormCensoPersona();
                //botón "Finalizar" solo se debe mostrar cuando la persona no haya hecho el censo previamente
                ocultarBtnFinalizarCensoPersona();
                //muestra botones "Editar" y "Eliminar datos"
                mostrarBtnEditarCensoPersona();
                //carga datos en formulario
                document.querySelector("#nombrePersonaCenso").value = censo.nombre;
                document.querySelector("#edadPersonaCenso").value = censo.edad;
                document.querySelector("#ciPersonaCenso").value = censo.ci;
                cargarSelectDeDepartamentos("departamentoPersonaCenso");
                document.querySelector("#departamentoPersonaCenso").selectedIndex = censo.departamento;
                cargarSelectDeOcupacion("ocupacionPersonaCenso");
                document.querySelector("#ocupacionPersonaCenso").selectedIndex = censo.ocupacion;
                ciCenso = ciLimpia;

                //El número de cédula de un censo no puede ser modificado
                document.getElementById("ciPersonaCenso").readOnly = true;
            } else {
                mensaje = "El censo asociado a esa cédula de indentidad ya fue validado por un censista";
                // si está validado se deshabilitan botones para modificar y eliminar datos
                document.querySelector("#btnFinalizarCensoPersona").disabled = true;
                document.querySelector("#btnEliminarCensoPersona").disabled = true;
            }
        }
    } else {
        mensaje = "El número de cédula no es válido";
        document.querySelector("#busquedaNroCIPersona").value = "";
    }
    document.querySelector("#mensajesCuadroBusquedaCIPersona").innerHTML = mensaje;
}

function usuariofinalizaCenso(){
    const nombre = document.querySelector("#nombrePersonaCenso").value;
    const edad = Number(document.querySelector("#edadPersonaCenso").value);
    const ci = document.querySelector("#ciPersonaCenso").value;
    const departamento = Number(document.querySelector("#departamentoPersonaCenso").value);
    const ocupacion = Number(document.querySelector("#ocupacionPersonaCenso").value);
    const ciLimpia = app.limpiarNroCI(ci)
    let mensaje = "";

    /* 
        Cubre caso en que usuario presiona varias veces botón "Finalizar censo", de esta forma se evita
        que se generen mútiples censos con datos repetidos.
    */
    if(!app.existeCenso(ciLimpia)){
        if(nombre!=""){
            //nombre no es string vacío
            if (edad>=0 && edad <=130) {
                if (app.validarDigitoVerificadorCI(ciLimpia)) {
                    //ci es válida
                    if (departamento != 0) {
                        //0 es valor por defecto en select
                        if (ocupacion != 0) {
                            //se crea el censo
                            const nombreAsignado = app.nuevoCenso(nombre, edad, ciLimpia, departamento, ocupacion);
                            mensaje = `Información guardada con éxito, el censista ${nombreAsignado} será el encargado de visitar su hogar`;
                        } else {
                            mensaje = "Seleccione una ocupación";
                        }
                    } else {
                        mensaje = "Seleccione un departamento";
                    }
                } else {
                    mensaje = "El número de cédula no es válido";
                }
                
            } else {
                mensaje = "La edad ingresada no está dentro del rango permitido";
            }
        } else {
            mensaje = "El nombre no puede estar vacío";
        }
    } else {
        mensaje = "El censo ya fue guardado";
    }
    document.querySelector("#msjFormCensoPersona").innerHTML = mensaje;
}


/* 
    Comprueba si usuario hizo cambios en datos de censo (antes de ser validado) y actualiza en caso de ser necesario, es invocada
    desde botón "Finalizar" en app usuario -> censo
*/

function usuarioModificoCenso(){
    const nombre = document.querySelector("#nombrePersonaCenso").value;
    const edad = Number(document.querySelector("#edadPersonaCenso").value);
    //No se extrae CI desde input ya que esta es el único dato de un censo que no puede ser modificado, de lo contrario
    //se convertiría en un nuevo censo
    const ci = ciCenso;
    const departamento = Number(document.querySelector("#departamentoPersonaCenso").value);
    const ocupacion = Number(document.querySelector("#ocupacionPersonaCenso").value);
    let mensaje ="";


    //SOLO se actualizan los cambios si los datos ingresados son válidos
    if(nombre!=""){
        if(edad>=0 && edad <=130 && edad != ""){
                if (departamento != 0) {
                    if (ocupacion != 0) {
                        //llamada a método para comprobar si hubo cambios
                        //si hubo, actualizo
                        if(app.censoFueModificado({nombre, edad, ci, departamento, ocupacion})){
                            //censo fue modificado
                            if (app.actualizarCenso({nombre, edad, ci, departamento, ocupacion})) {
                                mensaje = "Datos actualizados correctamente";
                            } else {
                                mensaje = "Error, no se pueden actualizar los datos";
                            }
                        } else {
                            mensaje = "No hubo cambios";
                        }
                    } else {
                        mensaje = "Seleccione una ocupación";
                    }
                } else {
                    mensaje = "Seleccione un departamento";
                }
        } else {
            mensaje = "La edad ingresada no está dentro del rango permitido";
        }
    } else {
        mensaje = "El nombre no puede estar vacío";
    }
    document.querySelector("#msjFormCensoPersona").innerHTML = mensaje;
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
            //si nombre de usuario es válido se invoca a función que valida contraseña
            if (app.validarContraseña(contraseña)) {
                //método que registra el censista
                if(app.registrarCensista(nombre, nombreDeUsuario, contraseña)){
                    //se muestra mensaje de confirmación y redirige al censista hacia panel de login después de 3 segundos
                    mensajeParaParrafo = "Registro exitoso, en 3 segundos será redirigido hacia la pantalla de inicio de sesión";
                    
                    setTimeout(() => {
                        document.querySelector("#nuevoNombreCensista").value = "";
                        document.querySelector("#nuevoUsuarioCensista").value = "";
                        document.querySelector("#nuevoContraseñaCensista").value = "";
                        ocultarFormularioRegistroCensista();
                        mostrarLoginCensista(); 
                    }, 3000);
                } else {
                    mensajeParaParrafo = "El registro no pudo ser completado";
                }
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
        if (edad>=0 && edad<=130 && edad!="") {
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
                                mensajeParrafo = "Error: compruebe la información";
                            }
                        } else {
                            mensajeParrafo = "Seleccione la ocupación";
                        }
                    } else {
                        mensajeParrafo = "Seleccione un departamento"
                    }
                } else {
                    mensajeParrafo = "Ya hay un censo asociado a esa cédula de identidad";
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
    Función que invoca método para reasignar censo a otro censista
*/
function reasignarCenso(){
    const ci = document.querySelector("#mostrarCensosPendientes").value;
    const censista = document.querySelector("#mostrarCensistasDisponibles").value;
    let mensaje = "";

    if (ci!="") {
        if (app.validarDigitoVerificadorCI(app.limpiarNroCI(ci))) {
            if(app.censistaLogueado.id != censista){
                if(app.reasignarCenso(app.limpiarNroCI(ci), censista)){
                    mensaje = "Censo reasignado correctamente";
                    //Se invoca función para actualizar la lista y ya no aparezcan censos asignados a otro censista
                    cargarSelectorCensosPendientes("mostrarCensosPendientes");
                } else {
                    mensaje = "No se pudo reasignar el censo";
                }
            } else {
                mensaje = "Ya tienes asignado este censo";
            }
        } else {
            mensaje = "El número de cédula de indentidad del censo no es correcto";
        }
    } else {
        mensaje = "No hay censos pendientes de validación";
    }
    document.querySelector("#parrafoMsjReasignarCenso").innerHTML = mensaje;
}

/* 
    Función que carga la sección de estadísticas en app censista 
*/
function cargarEstadisticasCensista(){
    const totalCensados = app.totalDePersonasCensadas();
    const censadosPorDepartamento = app.cantPersonasCensadasPorDepartamento();
    const porcentajePendientesDeValidacion = app.porcentajeCensosPendientesValidacion();
    const listaDepartamentos = app.baseDeDatosDepartamentos;

    //Genera tabla con cant de censados x departamento
    let tabla = `<h3>Cantidad de personas censadas por departamento:</h3><table border="1"><tr><th>Departamento</th><th>Cantidad de censados</th></tr>`;
    //i=1 porque index=0 es posición por defecto "Seleccione..."
    for (let i = 1; i < listaDepartamentos.length; i++) {
        const departamento = listaDepartamentos[i];
        const cantidad = censadosPorDepartamento[i]
        tabla +=`<tr><td>${departamento}</td><td>${cantidad}</td></tr>`;
    }
    tabla +=`</table>`;
    document.querySelector("#tablaDePersonasCensadasPorDepartamentoAppCensista").innerHTML = tabla;
    
    //Inyecta texto con total de censados
    document.querySelector("#totalPersonasCensadasAppCensista").innerHTML = `<h3>Total de censados:</h3>Hay ${totalCensados} personas censadas`;

    //Inyecta texto con % de censos pendientes de validar
    document.querySelector("#porcentajePendientesValidacionAppCensista").innerHTML = `<h3>Cantidad de censos pendientes de validación:</h3>El ${porcentajePendientesDeValidacion}% de los censos aún no fue validado`;

    //popula combo con lista de departamentos
    cargarSelectDeDepartamentos("selectorDepartamentosEstadisticasAppCensista");
}

/* 
    Función encargada de mostrar % de personas mayores y menores de edad de departamento seleccionado
    en combobox
*/
function cargarPersonasMayoresYMenores(){
    document.querySelector("#msjMostrarPorcentajesMenoresMayoresPorDepartamento").innerHTML= "";
    const listaDepartamentos = app.baseDeDatosDepartamentos;
    const mayores = app.porcentajePersonasMayoresDeEdad();
    const menores = app.porcentajePersonasMenoresDeEdad();
    const seleccionado = Number(document.querySelector("#selectorDepartamentosEstadisticasAppCensista").value);

    let mensaje = ``;
    if (seleccionado==0) {
        //opción por defecto
        mensaje = `Seleccione un departamento`;
    } else {
        mensaje = `${listaDepartamentos[seleccionado]}: El ${menores[seleccionado]}% de los censados es menor de edad y el ${mayores[seleccionado]}% es mayor de edad.`;
    }
    document.querySelector("#msjMostrarPorcentajesMenoresMayoresPorDepartamento").innerHTML=mensaje;
}

/* 
    Función que se ejecuta el presionar "Eliminar censo" en la app de usuario invitado
    Invoca a método que verifica si es posible eliminarlo (NO debe estar validado) y muestra mensaje
    en interfaz
*/

function eliminarCensoPersona(){
    const ci = document.querySelector("#ciPersonaCenso").value;
    const ciLimpia = app.limpiarNroCI(ci);
    let mensaje = "";

    if(app.validarDigitoVerificadorCI(ciLimpia)){
        if (!app.censoEstaValidado(ciLimpia)) {
            if(app.eliminarCenso(ciLimpia)){
                mensaje = "Datos eliminados correctamente";
            } else {
                mensaje = "Los datos no pudieron ser eliminados";
            }
        } else {
            mensaje = "Los datos no pueden ser eliminados porque el censo ya fue validado por un censista";
        }
    } else {
        mensaje = "El número de cédula ingresado no es válido";
    }

    document.querySelector("#msjFormCensoPersona").innerHTML = mensaje;
}

/* 
    Función que muestra los censistas disponibles excepto el logueado
*/
function cargarSelectorCensistasDisponibles(){
    const censistasDisponibles = app.obtenerListaDeCensistas();

    if (censistasDisponibles!=undefined) {
        let cargar = ``;
        for (let i = 0; i < censistasDisponibles.length; i++) {
            const censista = censistasDisponibles[i];
            cargar += `<option value="${censista.id}">${censista.nombre}</option>`;
        }
        document.querySelector("#mostrarCensistasDisponibles").innerHTML = cargar;
    } else {
        document.querySelector("#mostrarCensistasDisponibles").innerHTML = `No hay censistas disponibles`;
    }
}

/* 
    Función que muestra en <select> los censos pendientes del censista logueado,
    recibe como parámetro el id del select a cargar
*/
function cargarSelectorCensosPendientes(id){
    const censosPendientes = app.obtenerCensosPendientes();
    let cargar = ``;
    if (censosPendientes.length>0) {
        //hay censos, popular select
        for (let i = 0; i < censosPendientes.length; i++) {
            const censo = censosPendientes[i];
            cargar+=`<option value="${censo.ci}">${censo.ci}</option>`
        }
    } else {
        cargar = `<option value="">No hay censos pendientes</option>`;
    }
    document.querySelector(`#${id}`).innerHTML = cargar;        
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
    let mensaje = "";
    
    if(ci!=""){
        const ciLimpia = app.limpiarNroCI(ci);
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
    } else {
        mensaje = "Seleccione un censo";
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
                /* 
                    censoFueModificado puede retornar: true, false ó -1 (datos incorrectos)
                */
                const fueModificado = app.censoFueModificado({
                    nombre: nombre,
                    edad: edad,
                    ci: ci,
                    departamento: departamento,
                    ocupacion: ocupacion,
                });
                if (fueModificado == true) {
                    /* método para actualizar censo */
                    if (app.actualizarCenso({nombre, edad, ci, departamento, ocupacion})) {
                        mensaje = "Modificaciones guardadas correctamente";
                        if(app.confirmarCenso(ciValidacionCenso)){
                            mensaje = "<br> Censo confirmado con éxito";
                        } else {
                            mensaje = "<br> El censo no pudo ser confirmado";
                        }     
                    } else {
                        mensaje = "Datos no válidos, el censo no puede ser validado";
                    }
                    
                } else if (fueModificado == false) {
                    if(app.confirmarCenso(ciValidacionCenso)){
                        mensaje = "Censo confirmado con éxito";
                    }
                } else {
                    mensaje = "Datos incorrectos";
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

/* 
    Función encargada de crear tabla con estadísticas en app invitado
*/
function cargarEstadisticasPersona(){
    //se limpia párrafo para evitar conflictos con tablas presentes de ejecuciones anteriores
    document.querySelector("#tablaEstadisticasPersona").innerHTML=``;

    let estadisticas=``;
    const listaDepartamentos = app.baseDeDatosDepartamentos;
    const estudiantes = app.cantEstudiantesPorDepartamento();
    const noTrabajan = app.cantPersonasNoTrabajanPorDepartamento();
    const trabajadores = app.cantTrabajadoresPorDepartamento();
    const porcentaje = app.porcentajePersonasCensadasPorDepartamentoConRespectoAlTotal();

    estadisticas=`<table border="1"><tr><th>Departamento</th><th>Estudian</th><th>No trabajan</th><th>Dependientes o independientes</th><th>Porcentaje del total de censados</th></tr>`;

    //Itera "listaDepartamentos" ya que esta contiene un array con los 19 departamentos ordenados alfabéticamente.
    //Comienza en 1 porque index=0 es opción por defecto ("Seleccione...").
    for (let i = 1; i < listaDepartamentos.length; i++) {
        const depto = listaDepartamentos[i];
        estadisticas+=`<tr><td>${depto}</td><td>${estudiantes[i]}</td><td>${noTrabajan[i]}</td><td>${trabajadores[i]}</td><td>${porcentaje[i]}</td></tr>`
    }
    estadisticas+=`</table>`;
    document.querySelector("#tablaEstadisticasPersona").innerHTML=estadisticas;
}

//recibe por parámetro id de <select> y le agrega departamentos
function cargarSelectDeDepartamentos(id){
    const arrayDepartamentos = app.baseDeDatosDepartamentos;
    let cargar = ``;

    for (let i = 0; i < arrayDepartamentos.length; i++) {
        const departamento = arrayDepartamentos[i];
        cargar += `<option value="${i}">${departamento}</option>`;
    }
    document.querySelector(`#${id}`).innerHTML = cargar;
}

function cargarSelectDeOcupacion(id){
    const arrayOcupaciones = app.baseDeDatosOcupaciones;
    let cargar = ``;

    for (let i = 0; i < arrayOcupaciones.length; i++) {
        const ocupacion= arrayOcupaciones[i];
        cargar +=`<option value="${i}">${ocupacion}</option>`;
    }
    document.querySelector(`#${id}`).innerHTML = cargar;
}