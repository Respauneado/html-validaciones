/* const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) =>{
    validarNacimiento(evento.target);
}) */
export function valida(input){
const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    //console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio, por favor ingrese uno",
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Este campo contraseña necesita ser rellenado",
        patternMismatch: "al menos 6 caracteres, maximo 12 debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
    },
    Nacimiento: {
        valueMissing: "Este campo nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo telefono no puede estar vacio",
        patternMismatch: "El formato requerido es XXX-XXX-XXXX 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo direccion no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres.",
    },
    ciudad: {
        valueMissing: "Este campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres.",
    },
    estado: {
        valueMissing: "Este campo direccion no puede estar vacio",
        patternMismatch: "el estado debe contener entre 10 a 40 caracteres.",
    },
};

const validadores = {
    Nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayordeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad para registrarte";
    }
    input.setCustomValidity(mensaje);
}

function mayordeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
   return diferenciaFechas <= fechaActual;
}