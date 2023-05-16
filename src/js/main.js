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
    console.log("persona");
}

function usuarioEsCensista(){
    ocultarMenuInicial();
    console.log("censista");
}