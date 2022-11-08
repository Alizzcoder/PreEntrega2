/*************************** AGENDA DE TURNOS **************************
// La idea es tener por un lado una "base de datos" con array de los usarios registrados y los turnos que van tomando. Y por otro lado la disponibilidad de horarios.
// Más adelante el usuario podrá  elegir un turno o tambien poder cancelarlo. */

//Objeto usuario
class Usuario {
	constructor (nombre, email, password, horarioElegido, id) {
	this.nombre = nombre;
	this.email = email;  
	this.password = password;
	this.horarioElegido = horarioElegido;	
	this.id = id;
	}

 asignarId (objeto){
	this.id = objeto.length;
	}
}

// Array con los usarios con sus horarios (simil base de datos)
const usuarios = [
    new Usuario ("Flor", "flor@gmail.com", "florencia", 0, 1 ),
    new Usuario ("Julian", "julian@gmail.com", "julieta", 0,  2 ),
    new Usuario ("Leo", "leo@gmail.com", "leonel", 0,  3 ),
    ]

// Array con los hoarios disponibles
const horarios = [{
    dia: 'Lunes',
    turno1: '10 Hs',
    turno2: '14 Hs'
    
},
{
    dia: 'Martes',
    turno1: '10 Hs',
    turno2: '17 Hs'
},
{
    dia: 'Jueves',
    turno1: '17 Hs',
    turno2: '19.30 Hs'
},
{
    dia: 'Viernes',
    turno1: '10 Hs',
    turno2: '17 Hs'
},
] 


// Funcion que registra los datos del cliente nuevo y lo almacena en el array Usuarios
function registracion(){
        let nombre= prompt ("Ingrese su nombre")
        let email= prompt ("Ingrese su email")
        let password= prompt ("Ingrese su password")

        const usuario = new Usuario(nombre, email, password );

    usuarios.push(usuario);
    usuario.asignarId(usuarios);
    console.log(usuarios);
    
  }

  registracion();

  // Funcion Menu para elegir lo que desea hacer
function indiceMenu (){
    let opcionMenu =  parseInt(prompt(`Qué desea realizar? (Indique el número)
                    1 - Ver la disponibilidad de horarios
                    2 - Agendar un turno
                    3 - Cancelar un turno
                    0 - Para salir
                    `))
               menu (opcionMenu)     
                }
    
//Funcion menú
function menu (indiceMenu){
        switch(indiceMenu){
            case 0:
                salir = true
                alert(`Gracias por visitarnos`)
            break    
            case 1:
                mostrarDisponiblidad()
              break 
               case 2: 
              //  Agendarturno()
              break 
               case 3: 
              //  Cancelarturno()
              break
    
               default: 
              alert(`Ingrese una opción correcta`)
        }
    }

    function mostrarDisponiblidad() {
        for (const element of horarios) {
            alert ( 'El Día: ' + element.dia + ' los horarios son: ' + element.turno1 + ' y '+  element.turno2 )
            
        } 
        console.table (horarios)
    } 
           


// Empieza código
let salir 
while(salir != true){
    indiceMenu()

}