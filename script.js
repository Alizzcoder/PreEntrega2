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

//Elementos del DOM
const inputMailLogin = document.getElementById('emailLogin'),
    inputPassLogin = document.getElementById('passwordLogin'),
    inputnombreUser =document.getElementById ('nombreUsuario'),
    checkRecordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    btnRegistro = document.getElementById ('btnModalRegistro'),
    contDispo = document.getElementById('tarjetas'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    botonDispo = document.getElementById('dispo'),
    elementosToggleables = document.querySelectorAll('.toggeable');

// Función logueo y validacion    
function validarUsuario(usuariosBD, user, pass) {
        let encontrado = usuariosBD.find((usuariosBD) => usuariosBD.email == user);
        console.log(encontrado)
        console.log(typeof encontrado)
            if (typeof encontrado === 'undefined') {
            return false;
        } else {
             if (encontrado.password!= pass) {
                return false;
            } else {
                return encontrado;
            }
        }
 }

// La funcion registración por el momento es por prompt, no logro que se genere por modal sin error //
function registracion(){
        let nombre= prompt ("Ingrese su nombre")
        let email= prompt ("Ingrese su email")
        let password= prompt ("Ingrese su password")

        const usuario = new Usuario(nombre, email, password );
    usuarios.push(usuario);
    usuario.asignarId(usuarios);
    console.log(usuarios);    
    }

 /*function usuarioRegistrado(usuariosBD, user) {
    let encontrado = usuariosBD.find((usuariosBD) => usuariosBD.email == user);
    console.log(encontrado)
    console.log(typeof encontrado)
        if (typeof encontrado === 'undefined') {
        return false;
    } else {
         
            return encontrado;
        }
    }*/


 //Guardo el logueo en el storage.
function guardarDatos(usuarioBD, storage) {
    const usuario = {
        'name': usuarioBD.nombre,
        'user': usuarioBD.email,
        'pass': usuarioBD.password
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}

//Funcion para limpiar el storage
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

//Recupero los datos que se guardaron en el storage y los retorno
function recuperarUsuario(storage) {
    return JSON.parse(storage.getItem('usuario'));
}




//Cambio el DOM para mostrar el nombre del usuario logueado, usando los datos del storage
function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenid@ ${usuario.name}`
}

//Funcion para intercambiar la vista de los elementos del DOM, agregando o sacando la clase d-none.
function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

//Funciona para mostrar los horarios de agenda
function mostrarHorarios(array) {
    contDispo.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardHorario" id="dispo${element.dia}">
                <h3 class="card-header" id="nombreMascota">Día: ${element.dia}</h3>
                <div class="card-body">
                    <p class="card-text" id="horarioTurno1">Horario: ${element.turno1} Hs.</p>
                    <p class="card-text" id="horarioTurno2">Horario: ${element.turno2} Hs.</p>
                    <button id="btnAgendar" class="btn btn-outline-success me-2" type="button">Agendar</button>
                </div>
            </div>`;
            contDispo.innerHTML += html;
    });
}

//Funcioan que revisa si hay un usuario guardado en el storage, y en ese caso evita todo el proceso de login 
function estaLogueado(usuario) {
    if (usuario) {
        saludar(usuario);
        presentarInfo(elementosToggleables, 'd-none');
    }
}


btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if (!inputMailLogin.value || !inputPassLogin.value) {
        alert('Todos los campos son requeridos');
    } else {
        let data = validarUsuario(usuarios, inputMailLogin.value, inputPassLogin.value);
        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {
             if (checkRecordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            modal.hide();
            //Muestro la info para usuarios logueados
            presentarInfo(elementosToggleables, 'd-none');
        }
    }
});

botonDispo.addEventListener('click', () => {
     mostrarHorarios(horarios);
    });

btnSalir.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(elementosToggleables, 'd-none');
});

estaLogueado(recuperarUsuario(localStorage));


btnRegistro.addEventListener('click', () => { registracion () });
    
 
    


//Funcion menú
/*function menu (indiceMenu){
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
   // }*/

   /* function mostrarDisponiblidad() {
        for (const element of horarios) {
            alert ( 'El Día: ' + element.dia + ' los horarios son: ' + element.turno1 + ' y '+  element.turno2 )
            
        } 
        console.table (horarios)
    } 
           


// Empieza código
//let salir 
//while(salir != true){
 //   indiceMenu()
//**/ 