const tipoError = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];

const mensajes = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío.",
    customError: "Por favor, ingrese un nombre con 50 caracteres como máximo.",
  },
  email: {
    valueMissing: "El campo email no puede estar vacío.",
    typeMismatch: "Por favor, ingrese un email válido.",
    patternMismatch: "Por favor, ingrese un email válido.",
  },
  asunto: {
    valueMissing: "El campo asunto no puede estar vacío.",
    customError: "Por favor, ingrese un asunto con 50 caracteres como máximo.",
  },
  mensaje: {
    valueMissing: "El campo mensaje no puede estar vacío.",
    customError: "Por favor, ingrese un mensaje con 300 caracteres como maximo.",
  },

};


const form = document.querySelector("[data-form]");
const btnEnviar = document.querySelector("[data-enviar");

const camposForm = document.querySelectorAll("[required]");


function esNombreAsuntoValido(campo) {
  const esValido = campo.value.length <= 50;
  if (!esValido) {
    campo.setCustomValidity('El nombre no es válido. Debe ser un nombre con una máximo de 50 carácteres.');
  }
}

function esMensajeValido(campo) {
  const esValido = campo.value.length <= 300;
  if (!esValido) {
    campo.setCustomValidity('El nombre no es válido. Debe ser un nombre con una máximo de 300 carácteres.');
  }
}



camposForm.forEach((campo) => {
  campo.addEventListener("blur", () => verificarCampo(campo));
  /* caputar evento invalid */
  campo.addEventListener("invalid", (event) => event.preventDefault());

});

function verificarCampo(campo) {

  campo.setCustomValidity("");

  if ((campo.name == "nombre" || campo.name == "asunto") && campo.value != "") {
    esNombreAsuntoValido(campo);
  }

  if (campo.name == "mensaje" && campo.value != "") {
    esMensajeValido(campo);
  }

  mostrarError(campo);
}


function mostrarError(campo) {
  let mensaje = "";
  //campos validity
  tipoError.forEach((error) => {
    if (campo.validity[error]) {
      mensaje = mensajes[campo.name][error];

    }
  });

  const mensajeError = campo.parentNode.querySelector(".message-error");
  const validarInputCheck = campo.checkValidity();

  if (!validarInputCheck) {
    mensajeError.textContent = mensaje;
    campo.classList.add("invalid");
  } else {
    mensajeError.textContent = "";
    campo.classList.remove("invalid");
  }

}

btnEnviar.addEventListener("click", () => {

  camposForm.forEach((campo) => {
    mostrarError(campo);

  });
});


