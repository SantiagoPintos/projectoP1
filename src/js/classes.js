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
        Método que se llama una vez que un censo fue confirmado por un censista, este cambia la propiedad
        "censado" a "true" y da por finalizado el mismo.
        Recibe como parámetro la ci de la persona (asume que el num ya fue "limpiado" y validado desede main.js).
    */ 
    confirmarCenso(ci){
        let encontrado = false;
        for (let i = 0; i < this.baseDeDatosCensos.length && !encontrado; i++) {
            const ciAcomparar = this.baseDeDatosCensos[i].ci;
            if (ci == ciAcomparar) {
                this.baseDeDatosCensos[i].censado = true;
                encontrado = true;
            }            
        }

        //retorna encontrado para validar desde main.js
        return encontrado;
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

    verificarCredenciales(usuario, contraseña){
         let credencialesCorrectas = false;
         for (let i = 0; i < this.baseDeDatosCensos.length && !credencialesCorrectas; i++) {
            const censista = this.baseDeDatosCensistas[i];
            if (censista.usuario==usuario && censista.contraseña == contraseña) {
                credencialesCorrectas = true;
                this.censistaLogueado = usuario;
            }
        }   

        return credencialesCorrectas;
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