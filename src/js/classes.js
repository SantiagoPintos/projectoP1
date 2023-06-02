class App {
    constructor(){
        this.baseDeDatosCensos = [];
        this.baseDeDatosCensistas = [];

        this.censistaLogueado = null;
    }

    /* 
        Método que se ejecuta al comenzar un nuevo censo, completa todos los datos excepto la propiedad "censado"
        ya que un censo puede quedar pendiente de validación y por lo tanto solo debe modificarse una vez que este haya 
        sido confirmado por un censista.
    */
    nuevoCenso(nombre, edad, ci, departamento, ocupacion, idCensista){
        let generarCenso = new Censo();
        generarCenso.nombre = nombre;
        generarCenso.edad = edad;
        generarCenso.ci = ci;
        generarCenso.departamento = departamento;
        generarCenso.ocupacion = ocupacion;
        generarCenso.idCensista = idCensista;
        //no se incluye propiedad "censado" porque está declarada como falsa por defecto
        
        this.baseDeDatosCensos.push(generarCenso);
    }

    /* 
    Función que precarga censistas al inicar la aplicación
*/
    precargarCensistas(){
        this.crearCensista("Pedro Rodríguez", "pedror", "123aA", this.generarIdCensista());
        this.crearCensista("Enzo Hernández", "hernandeze", "Hernandez21", this.generarIdCensista());
        this.crearCensista("Julián Pérez", "juliancitop", "Hola45", this.generarIdCensista());
    }
    precargarCensos(){
        this.nuevoCenso("Usuario Prueba", 20, 11111111, 2, 3, 2);
        this.confirmarCenso(11111111);
    }

    /* 
        Método que comprueba si existe censo y retorna true(existe)/false(no existe)
    */
    existeCenso(ci){
        let existe = false;
        for (let i = 0; i < this.baseDeDatosCensos.length && !existe; i++) {
            const ciAcomparar = this.baseDeDatosCensos[i].ci;
            if (ci==ciAcomparar) {
                existe = true;
            }
        }
        return existe;
    }

    /* 
        Método que recibe la ci de un censo y devuelve su indice en bdd,
        asume que este ya existe
    */
    obtenerIndiceCenso(ci){
        let indice = 0;
        let encontrado = false;
        for (let i = 0; i < this.baseDeDatosCensos.length && !encontrado; i++) {
            const elemento = this.baseDeDatosCensos[i].ci;
            if (elemento==ci) {
                indice=i;
                encontrado=true;
            }
        }
        return indice;
    }

    /* 
        Método que recibe ci y comprueba si el censo asociado está validado.
        Si censo está validado retorna true, si está pendiente retorna false
    */
    censoEstaValidado(ci){
        //Se obtiene índice de censo en bdd y se verifica estado de prop "censado"
        const indice = this.obtenerIndiceCenso(ci);
        if (this.baseDeDatosCensos[indice].censado == false) {
            //aún no está validado
            return false;
        } else {
            //censo ya fue validado
            return true;
        }
    }

    /* 
        Método para crear un nuevo censista y agregaro a su array correspondiente
    */
    crearCensista(nombre, usuario, contraseña, id){
        let nuevoCensista = new Censista();
        nuevoCensista.nombre = nombre;
        nuevoCensista.usuario = usuario;
        nuevoCensista.contraseña = contraseña;
        nuevoCensista.id = id;

        this.baseDeDatosCensistas.push(nuevoCensista)
    }
    /* 
        Método usado en inicio de sesión
    */
    verificarCredenciales(usuario, contraseña){
         let credencialesCorrectas = false;
         for (let i = 0; i < this.baseDeDatosCensistas.length && !credencialesCorrectas; i++) {
            const censista = this.baseDeDatosCensistas[i];
            if (censista.usuario==usuario && censista.contraseña == contraseña) {
                credencialesCorrectas = true;
                this.censistaLogueado = this.baseDeDatosCensistas[i];
            }
        }   

        return credencialesCorrectas;
    }

    cerrarSesion(){
        this.censistaLogueado = null;
    }

    /* 
        Comprueba si el nombre de usuario elegido por el censista durante el proceso de registro está disponible
        en baseDeDatosCensistas, retorna true, false ó -1 en caso de ser inválido
    */
    validarNombreUsuario(usuario){
        let disponible = true;
        //Elimina posibles espacios al inicio/final
        usuario=usuario.trim();
        //maneja caso en que usuario está compuesto SOLO por espacios y queda vacío después del trim
        if (usuario) {
            //no puede contener espacios en ninguna posición, ejemplo: "hola mundo" no es válido
            if (!usuario.includes(" ")) {
                for (let i = 0; i < this.baseDeDatosCensistas.length && disponible; i++) {
                    const nombre = this.baseDeDatosCensistas[i].usuario;
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
    validarContraseña(clave){
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

    /* 
        Verifica que nombre ingresado en censo no tenga números 
    */
    validarNombre(nombre){
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
            }
        } else {
            esValido = false;
        }
        
        return esValido;
    }

    /* 
        Valida edad de persona ingresada en censo
    */
    validarEdad(edad){
        if (edad != "" && !isNaN(edad)) {
            if (edad<=130 && edad>=0) {
                return true;
            } else {
                return false;
            }
        }
        return false
    }

    // Comprueba longitud de número de cédula y quita cualquier cosa que no sea un nro
    limpiarNroCI(cedula){
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
    validarDigitoVerificadorCI(cedula){
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

    /* 
        Método que se llama una vez que un censo fue confirmado por un censista, este cambia la propiedad
        "censado" a "true" y da por finalizado el mismo.
        Recibe como parámetro la ci de la persona (asume que el num ya fue "limpiado" y validado desede main.js).
    */ 
    confirmarCenso(ci){
        let confirmado = false;
        for (let i = 0; i < this.baseDeDatosCensos.length && !confirmado; i++) {
            const ciAcomparar = this.baseDeDatosCensos[i].ci;
            if (ci == ciAcomparar) {
                this.baseDeDatosCensos[i].censado = true;
                confirmado = true;
            }            
        }
    
        return confirmado;
    }

    /* 
        Método que hace todas las verificaciones llamando a otros métodos específicos para cada 
        cada elemento, crea el nuevo censo y luego lo confirma. 
        retorna booleano 
    */
    realizarCenso(nombre,edad,ci,departamento,ocupacion){
        //nro ci sin puntos ni guiones
        let nroCiLimpio = this.limpiarNroCI(ci);
        let censado = false;
        
        //validar datos
        if (this.validarNombre(nombre)) {
            //validar edad
            if(this.validarEdad(edad)){
                //validar ci
                if(this.validarDigitoVerificadorCI(nroCiLimpio)){
                    //valida que no exista censo con esa ci
                    if (!this.existeCenso(nroCiLimpio)) {
                        //validar que departamento y ocupación no tengan valores por defecto
                        if (departamento!=0) {
                            if (ocupacion!=0) {
                                //crea censo
                                this.nuevoCenso(nombre, edad, nroCiLimpio, departamento, ocupacion, this.censistaLogueado.id);
                                //confima censo cambiando la propiedad "censado" a "true"
                                if (this.confirmarCenso(nroCiLimpio)) {
                                    censado = true;
                                }
                            } 
                        }
                    }
                }
            }
        }

        return censado;
    }

    /* 
        El ID de censista se genera de forma incremental
    */
    generarIdCensista(){
        return this.baseDeDatosCensistas.length;
    }

    registrarCensista(nombre, usuario, contraseña){
        const nuevaId = this.generarIdCensista();
        this.crearCensista(nombre, usuario, contraseña, nuevaId);
    }

}

class Censo {
    constructor(){
        this.nombre = "";
        this.edad = 0;
        this.ci = 0;
        this.departamento = "";
        this.ocupacion = "";
        this.censado = false;
        this.idCensista = 0;
    }
}

class Censista {
    constructor(){
        this.nombre = "";
        this.usuario = "";
        this.contraseña = "";
        this.id = 0;
    }
}