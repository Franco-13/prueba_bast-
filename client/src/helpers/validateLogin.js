export const validateLogin = (input) => {
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
  }

  return error;
};
