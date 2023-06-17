class App {
    constructor(){
        this.baseDeDatosCensos = [];
        this.baseDeDatosCensistas = [];
        /* 
            Array que contiene lista de departamentos
        */
        this.baseDeDatosDepartamentos = ["Seleccione...", "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", 
        "Flores", "Florida", "Lavalleja","Maldonado", "Montevideo", "Paysandú", "Río Negro", 
        "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Trés"];
       /* 
            Array que contiene lista de ocupaciones
       */
        this.baseDeDatosOcupaciones = ["Seleccione...", "Dependiente", "Independiente", "Estudiante", "No trabaja"];

        /* 
            Objeto que guarda el censista logueado actualmente
        */
        this.censistaLogueado = null;
    }
    /* 
        Método que precarga censistas al inicar la aplicación
    */
    precargarCensistas(){
        this.crearCensista("Pedro Rodríguez", "pedror", "123aA");
        this.crearCensista("Enzo Hernández", "hernandeze", "Hernandez21");
        this.crearCensista("Julián Pérez", "juliancitop", "Hola45");
    }
    /* 
        Números de ci válidos generados aleatoriamente usando: 
        * https://github.com/picandocodigo/ci_js 
    */
    precargarCensos(){
        this.nuevoCenso("Pepito Hernández", 20, 56536112, 2, 3);
        this.confirmarCenso(56536112);
        this.nuevoCenso("Roberto Pérez", 30, 33269613, 2, 3);
        this.confirmarCenso(33269613);
        this.nuevoCenso("José Rodríguez", 40, 94202155, 2, 3);
        this.confirmarCenso(94202155);
        this.nuevoCenso("Santiago Sosa", 50, 23530252, 2, 3);
        this.confirmarCenso(23530252);
        this.nuevoCenso("Marcelo Núñez", 10, 3761156, 2, 3);
        this.confirmarCenso(3761156);
        this.nuevoCenso("Josefina Pérez", 10, 73152098, 2, 3);
        this.confirmarCenso(73152098);
        this.nuevoCenso("Andrés Andrés", 10, 98839948, 2, 3);
        this.confirmarCenso(98839948);
        this.nuevoCenso("Martín Pintos", 10, 26155924, 2, 3);
        this.confirmarCenso(26155924);
        this.nuevoCenso("Gonzalo Rodríguez", 10, 30138950, 2, 3);
        this.confirmarCenso(30138950);
        this.nuevoCenso("Felipe Estrada", 98, 76149820, 19, 4);
        this.confirmarCenso(76149820);
        this.nuevoCenso("Rodrigo Pérez", 26, 40499633, 5, 2);
        this.confirmarCenso(40499633);
        this.nuevoCenso("Enzo Arocha", 38, 84714506, 2, 1);
        this.confirmarCenso(84714506);
        this.nuevoCenso("Lucía Rodríguez", 23, 27539434, 10, 2);
        this.confirmarCenso(27539434);
        this.nuevoCenso("Gimena Aída", 30, 47137810, 1, 7);
        this.confirmarCenso(47137810);
        this.nuevoCenso("Ivanna Pereira", 21, 1918010, 18, 4);
        this.confirmarCenso(1918010);
        this.nuevoCenso("Marcelo Fernández", 50, 4152253, 5, 2);
        this.nuevoCenso("Gabriela Hernández", 37, 29926376, 11, 1);
        this.nuevoCenso("Bruno Rossi", 29, 29598515, 10, 1);
        this.nuevoCenso("Gabriel Fernández", 61, 45686938, 19, 4);
        this.nuevoCenso("Victoria Miños", 22, 46733677, 2, 1);
        this.nuevoCenso("Gonzalo Marrero", 45, 36573774, 9, 2);
        this.nuevoCenso("Anna Rodríguez", 39, 36228698, 4, 4);
        this.nuevoCenso("Pedro Barboza", 80, 14931326, 17, 4);
        this.nuevoCenso("Ignacio Romero", 30, 52392978, 12, 2);
        this.nuevoCenso("Gimena Castro", 29, 4503686, 14, 1);
        this.nuevoCenso("Yolanda Pérez", 70, 967270, 1, 4);
        this.nuevoCenso("Diego Pereira", 1, 27136650, 17, 4);
        this.nuevoCenso("Rita Castelli", 40, 27469378, 9, 1);
        this.nuevoCenso("Fernando Mauricio", 22, 55723314, 14, 2);
        this.nuevoCenso("Andrea Zapata", 49, 40378039, 16, 2);
    }

    /* 
        Método para crear un nuevo censista y agregaro a su array correspondiente
    */
    crearCensista(nombre, usuario, contraseña){
        let nuevoCensista = new Censista();
        nuevoCensista.nombre = nombre;
        nuevoCensista.usuario = usuario;
        nuevoCensista.contraseña = contraseña;
        nuevoCensista.id = this.generarIdCensista();

        this.baseDeDatosCensistas.push(nuevoCensista)
    }
    
    /* 
        El ID de censista se genera de forma incremental
    */
    generarIdCensista(){
        return this.baseDeDatosCensistas.length;
    }

    /* 
        Método que asigna un censista al azar (Según su id) a censo (realizado por usuario invitado) para que este lo valide posteriormente,
    */
    asignarCensista(){
        const min = 0;
        const max = this.baseDeDatosCensistas.length-1;
    
        /* 
            Cubre caso en el que no hay censistas registrados
        */
        if (max>0) {
            /* 
                ej: Math.random retorna 0,2, min=0 y max=10
                0,2*(10-0+1) + 0 = 2,2 => num: 2
            */
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
    

    /* 
        Método que retorna la lista de censistas registrados en el sistema excepto el logueado
        en forma de objeto (sin incluir su contraseña)
    */
    obtenerListaDeCensistas(){
        let listaDeCensistas = [];

        if(this.censistaLogueado!= null){
            for (let i = 0; i < this.baseDeDatosCensistas.length; i++) {
                if(this.baseDeDatosCensistas[i].id != this.censistaLogueado.id){
                    const censista = {
                        nombre: this.baseDeDatosCensistas[i].nombre,
                        id: this.baseDeDatosCensistas[i].id,
                    };
                    listaDeCensistas.push(censista);
                }   
            }
    
            return listaDeCensistas;
        }
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

    /* 
        Método usado para cerrar sesión
    */
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

    /* 
        Comprueba longitud de número de cédula y quita cualquier cosa que no sea un nro 
    */
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

    /* 
        Valida digito verificador de ci, retorna true o false
    */
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
                                //invoca a método que crea censo
                                this.nuevoCenso(nombre, edad, nroCiLimpio, departamento, ocupacion, this.censistaLogueado.id);
                                //valida censo cambiando la propiedad "censado" a "true"
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
        Método que se llama una vez que un censo fue confirmado por un censista, este cambia la propiedad
        "censado" a "true" y da por finalizado el mismo.
        Recibe como parámetro la ci de la persona (asume que el num ya fue "limpiado" y validado con métodos anteriores).
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
        Método que se ejecuta al comenzar un nuevo censo, completa todos los datos excepto la propiedad "censado"
        ya que un censo puede quedar pendiente de validación y por lo tanto solo debe modificarse una vez que este haya 
        sido confirmado por un censista.
    */
    nuevoCenso(nombre, edad, ci, departamento, ocupacion){
        let generarCenso = new Censo();
        generarCenso.nombre = nombre;
        generarCenso.edad = edad;
        generarCenso.ci = ci;
        generarCenso.departamento = departamento;
        generarCenso.ocupacion = ocupacion;
        //no se incluye propiedad "censado" porque está declarada como false por defecto
        
        /*  
            Si censista está logueado se guarda su id, en caso contrario asume que está siendo registrado por el
            usuario invitado, e invoca método que asigna un id al azar entre todos los disponibles (asigna un censista para
            validar censo posteriormente) 
        */
        if (this.censistaLogueado!=null) {
            generarCenso.idCensista = this.censistaLogueado.id;
        } else {
            generarCenso.idCensista = this.asignarCensista();
        }
        this.baseDeDatosCensos.push(generarCenso);

        /* 
            Si usuario está haciendo censo se retorna nombre de censista asignado
        */
        if (this.censistaLogueado==null) {
            return this.baseDeDatosCensistas[generarCenso.idCensista].nombre;
        }
    }

    /* 
        Método que comprueba si existe censo y retorna true(existe) o false(no existe)
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
        Método que retorna los censos pendientes de validación asociados al censista
        logueado    
    */
    obtenerCensosPendientes(){
        if(this.censistaLogueado!=null){
            const id = this.censistaLogueado.id;
            let listaDeCensosSinValidar = [];
    
            for (let i=0; i<this.baseDeDatosCensos.length; i++) {
                const censoActual = this.baseDeDatosCensos[i];
                if(censoActual.censado==false && censoActual.idCensista==id){
                    //si censo no está validado y el censista asignado es el logueado actualmente
                    listaDeCensosSinValidar.push(censoActual);
                }
            }

            return listaDeCensosSinValidar;
        }
    }

    /* 
        Método que reasigna un censo (sin validar) a otro censista, retorna true o false
    */
    reasignarCenso(ciCenso, idCensista){
        let reasignado = false;
        // ci es válida
        if (this.validarDigitoVerificadorCI(this.limpiarNroCI(ciCenso))) {
            const indice = this.obtenerIndiceCenso(this.limpiarNroCI(ciCenso));
            //censo está sin validar
            if (this.baseDeDatosCensos[indice].censado == false) {
                //censista seleccionado no está logueado
                if (this.censistaLogueado.id != idCensista) {
                    //reasignar censo cambiando propiedad idCensista
                    this.baseDeDatosCensos[indice].idCensista = idCensista;
                    reasignado = true;
                }
            }
        }
        return reasignado;
    }

    /* 
        Método que recibe la ci de un censo y devuelve su indice en bdd, si este no existe retorna -1
    */
    obtenerIndiceCenso(ci){
        let indice = -1;
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
        let validado;
        if (indice!=-1) {
            if (this.baseDeDatosCensos[indice].censado == true) {
                validado = true;
            } else {
                validado = false;
            }
        } else {
            validado = -1;
        }
        return validado;
    }

    /* 
        Método que comprueba si hubo modificaciones en datos de censo,
        recibe como parámetro un objeto (datos de censo) e índice y retorna true (hubo cambios), false (no hubo cambios)
        ó -1 (El dígito verificador de la CI no es válido)
    */
    censoFueModificado({nombre, edad, ci, departamento, ocupacion}){
        let fueModificado=true;

        const nuevosDatos = {
            //es lo mismo que nombre: nombre,
            nombre,
            edad,
            ci,
            departamento,
            ocupacion,
        }

        if(this.validarDigitoVerificadorCI(this.limpiarNroCI(ci))){
            const indice = this.obtenerIndiceCenso(ci);
            const datosOriginales = this.baseDeDatosCensos[indice];
    
            if(nuevosDatos.nombre == datosOriginales.nombre
                && nuevosDatos.edad == datosOriginales.edad
                && nuevosDatos.departamento == datosOriginales.departamento
                && nuevosDatos.ocupacion == datosOriginales.ocupacion){
                    //no hay modificaciones en el censo
                    fueModificado=false;
            }
            
            return fueModificado;
        } else { 
            return -1; 
        }

    }

    /* 
        Método que modifica datos de censo 
        (es usado cuando censista o usuarios realizan modificaciones al censo previo a ser validado).
    */
    actualizarCenso({nombre, edad, ci, departamento, ocupacion}){
        let actualizado = false; 
        let nuevosDatos = {
            nombre,
            edad, 
            ci,
            departamento,
            ocupacion,
        }

        /* 
            censistaLogueado es un objeto con los datos del censista que inició sesión, por lo tanto esta propiedad solo es
            accesible cuando un censista es quien está modificando los datos del censo, en caso contrario se asume que un 
            usuario es quien está editando sus datos
        */
        if (this.censistaLogueado != null) {
            nuevosDatos.idCensista = this.censistaLogueado.id 
        }

        if(edad >= 0 && edad <= 130 && edad != ""){
            if(this.validarDigitoVerificadorCI(ci)){
                let indice = this.obtenerIndiceCenso(ci);
                //departamento y ocupacion se extrae de select(s) donde
                //value = 0 es opción "Seleccione..."
                if(departamento != 0 && ocupacion != 0){
                    this.baseDeDatosCensos[indice] = nuevosDatos;
                    actualizado = true;
                }
            }
        }

        return actualizado;        
    }
    
    /* 
        Método encargado de eliminar censo (si no está validado).
    */
    eliminarCenso(ci){
        let eliminado = false;
        const cedula = this.limpiarNroCI(ci);

        if (this.validarDigitoVerificadorCI(cedula)) {
            //si nro de ci es válido
            if (this.existeCenso(cedula)) {
                if (!this.censoEstaValidado(cedula)) {
                    //si censo NO está validado
                    const indice = this.obtenerIndiceCenso(cedula);
                    this.baseDeDatosCensos.splice(indice, 1);
                    eliminado = true;
                }
            }
        }

        return eliminado;
    }

    /* 
        Método que retorna cantidad de censos validados
    */
    totalDePersonasCensadas(){
        let cantidad = 0;

        for (let i=0; i < this.baseDeDatosCensos.length; i++) {
            const validado = this.baseDeDatosCensos[i].censado;
            if (validado) {
                cantidad++;
            }
        }
        return cantidad
    }

    /* 
        Método que retorna objeto con cantidad de personas censadas para cada departamento
    */
    cantPersonasCensadasPorDepartamento(){
        let cantCensados = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
        };

        for (let i = 0; i < this.baseDeDatosCensos.length; i++) {
            const deptoDeCenso = this.baseDeDatosCensos[i];
            if (deptoDeCenso.censado) {
                cantCensados[deptoDeCenso.departamento] = cantCensados[deptoDeCenso.departamento]+1;
            }           
        }

        return cantCensados;
    }

    /* 
        Método que retorna el porcentaje de censos pendientes de validación
    */
    porcentajeCensosPendientesValidacion(){
        const cantCensos=this.baseDeDatosCensos.length;
        let censosSinValidar=0;
        
        for (let i = 0; i < this.baseDeDatosCensos.length; i++) {
            const validado = this.baseDeDatosCensos[i].censado;
            if (!validado) {
                censosSinValidar++;
            }
        }

        if (cantCensos!=0) {
            return (censosSinValidar*100)/cantCensos;
        } else {
            return 0;
        }
    }

    /* 
        Método que retorna el porcentaje de personas (Censos validados) mayores de edad
    */
    porcentajePersonasMayoresDeEdad(){
        let porcentajes = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
        };

        //recorre lista de censos, cuenta y almacena los mayores de edad por cada dpto
        for (let i = 0; i < this.baseDeDatosCensos.length; i++) {
            const censo = this.baseDeDatosCensos[i];
            if (censo.edad>=18 && censo.censado) {
                porcentajes[censo.departamento]=porcentajes[censo.departamento]+1; 
            }
        }

        /*  Invoca a método cantPersonasCensadasPorDepartamento, itera sobre la cantidad de propiedades que retorna 
            (cada una corresponde a un dpto, 1=Artigas), y calcula el % de mayores de edad basado en la diferencia
            de valores que hay en objeto "porcentaje". 
            Ejemplo: cantidad de censos en dpto 1:10, cant de mayores en dpto 1:5, => % de mayores de edad en dpto 1:50% 
        */
        const total = this.cantPersonasCensadasPorDepartamento();
        for (let i = 1; i<=19; i++) {
            const totalEdadesDepartamento = total[i];
            const mayoresEdadDepartamento = porcentajes[i];
            if (totalEdadesDepartamento!=0) {
                //evita posible división entre 0
                porcentajes[i] = (mayoresEdadDepartamento*100)/totalEdadesDepartamento;
            } else {
                porcentajes[i]=0;
            }
        }
        return porcentajes;
    }

    /* 
        Método que retorna el porcentaje de personas (Censos validados) menores de edad
    */
    porcentajePersonasMenoresDeEdad(){
        let porcentajes = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
        };
        const mayores = this.porcentajePersonasMayoresDeEdad();
        const total = this.cantPersonasCensadasPorDepartamento();

        /* 
            Itera sobre propiedades de mayores (objeto retornado de porcentajePersonasMayoresDeEdad), si
            la propiedad tiene como valor 0 accede a la propiedad de "total" en el mismo índice y verifica 
            si esta es igual a 0, en caso de ser verdadero setea 0 como valor, en caso contrario resta el
            valor de la primer propiedad a 100, y esa diferencia es el porcentaje de menores por departamento.

            Esto se hace así para cubrir el siguiente caso: departamento NO tiene personas censadas, el porcentaje
            de mayores es 0%, por lo tanto este método no puede asumir que el porcentaje de menores es 100-mayores, 
            ya que esto significaría que el porcentaje de menores es 100%, lo cual es falso. 
        */

        for (let i=1; i<=19; i++) {
            const edad = mayores[i];
            if (edad==0) {
                if (total[i]==0) {
                    porcentajes[i]=0;
                } else {
                    //No hay mayores de edad, pero el departamento SI tiene personas censadas
                    porcentajes[i]=100;
                }
            } else {
                porcentajes[i]=100-edad;
            }
        }
        return porcentajes;
    }

    /* 
        Método que retorna objeto con la cantidad de estudiantes por departamento (tiene en cuenta censos
        validados).
    */
    cantEstudiantesPorDepartamento(){
        let estudiantes = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
        };

        for (let i = 0; i < this.baseDeDatosCensos.length; i++) {
            const censo = this.baseDeDatosCensos[i];
            if (censo.ocupacion==3 && censo.censado) {
                estudiantes[censo.departamento] = estudiantes[censo.departamento]+1; 
            }
        }

        return estudiantes;
    }

    /* 
        Método que retorna objeto con la cantidad de trabajadores por departamento
        (Tiene en cuenta censos validados).
    */

    cantTrabajadoresPorDepartamento(){
        let trabajadores = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
        };

        for (let i = 0; i < this.baseDeDatosCensos.length; i++) {
            const censo = this.baseDeDatosCensos[i];
            if (censo.censado) {
                if (censo.ocupacion==1 || censo.ocupacion==2) {
                    trabajadores[censo.departamento] = trabajadores[censo.departamento]+1; 
                }
            }
        }

        return trabajadores;
    }

    /* 
        Método que retorna objeto con la cantidad de personas que NO trabajan en cada departamento
        (Tiene en cuenta censos validados).    
    */
    cantPersonasNoTrabajanPorDepartamento(){
        let noTrabajan = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
        };

        for (let i = 0; i < this.baseDeDatosCensos.length; i++) {
            const censo = this.baseDeDatosCensos[i];
            if (censo.ocupacion==4 && censo.censado) {
                noTrabajan[censo.departamento] = noTrabajan[censo.departamento]+1; 
            }
        }

        return noTrabajan;
    }

    /* 
        Método que retorna en porcentaje de personas censadas en cada departamento con respecto al total
        (Tiene en cuenta censos validados y no validados).
    */
    porcentajePersonasCensadasPorDepartamentoConRespectoAlTotal(){
        let porcentajeCensadosPorDepartamento = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
            15: 0,
            16: 0,
            17: 0,
            18: 0,
            19: 0,
        };
        const cantCensos = this.baseDeDatosCensos.length;
        //let sumatoria = 0;

        //recorre lista de censos, los cuenta y almacena en el objeto
        for (let i = 0; i < this.baseDeDatosCensos.length; i++) {
            const censo = this.baseDeDatosCensos[i];
            porcentajeCensadosPorDepartamento[censo.departamento] = porcentajeCensadosPorDepartamento[censo.departamento] +1;
        }
        //recorre el objeto y convierte los contadores de censo x departamento y porcentajes
        for (let j = 1; j <= 19; j++) {
            porcentajeCensadosPorDepartamento[j]=Math.round((porcentajeCensadosPorDepartamento[j]*100)/cantCensos);
            //sumatoria=sumatoria+porcentajeCensadosPorDepartamento[j];
        }
        //console.log(sumatoria);
        return porcentajeCensadosPorDepartamento;
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