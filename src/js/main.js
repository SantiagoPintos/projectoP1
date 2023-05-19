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
