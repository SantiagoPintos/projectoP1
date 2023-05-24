class Persona {
    constructor(){
     this.usuarioPersona = {
        nombre: new String,
        edad: new Number,
        ci: new Number,
        departamento : new String,
        ocupacion: new String,
        idCensita: new Number,
        censado: false,
     };   
    }
}

class Censista {
    constructor(){
        this.usuarioCensista = {
            nombre: new String,
            usuario: new String,
            contraseña: new String,
            id: new Number,
        }
    }

    cargarDatos(nombre, usuario, contraseña, id){
            this.nombre = nombre,
            this.usuario = usuario,
            this.contraseña = contraseña,
            this.id = id
    }
}