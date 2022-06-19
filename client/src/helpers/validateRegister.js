export const validateRegister = (input) => {
  let error = {};
  const regExpEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input.email.length === 0) {
    error.email = "Debe ingresar un correo";
  } else if (!regExpEmail.test(input.email.toLowerCase())) {
    error.email = "El formato del correo no es válido";
  }

  if (input.password.length === 0) {
    error.password = "Debe ingresar una contraseña";
  } else if (input.password.length < 6) {
    error.password = "La contraseña debe contener mínimo 6 caracteres";
  }

  if (input.repeat_password !== input.password) {
    error.repeat_password = "La contraseña debe ser igual";
  }

  return error;
};
