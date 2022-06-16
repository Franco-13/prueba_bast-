export function validateInputs(input) {
  let errors = {};

  const regExpAlphanumericDevice = /^[A-Za-z0-9]{8}$/;

  const regExpAlphanumericIdSenasa = /^[A-Za-z0-9]{16}$/;

  if (input.animal_type.length === 0) {
    errors.animal_type = "Seleccione un tipo de animal";
  }

  if (Number(input.animal_weight) <= 0) {
    errors.animal_weight = "El peso debe ser mayor a cero";
  }

  if (input.device_number.length === 0) {
    errors.device_number = "Debe ingresar un cadena alfanumérica";
  } else if (!regExpAlphanumericDevice.test(input.device_number)) {
    errors.device_number =
      "La cadena debe ser alfanumérica y contener 8 caracteres";
  }

  if (input.device_type.length === 0) {
    errors.device_type = "Debe seleccionar un tipo de dispositivo";
  }

  if (input.id_senasa.length === 0) {
    errors.id_senasa = "Debe ingresar un cadena alfanumérica";
  } else if (!regExpAlphanumericIdSenasa.test(input.id_senasa)) {
    errors.id_senasa =
      "La cadena debe ser alfanumérica y contener 16 caracteres";
  }

  if (input.paddock_name.length === 0) {
    errors.paddock_name = "Debe ingresar un nombre de potrero";
  } else if (input.paddock_name.length > 200) {
    errors.paddock_name =
      "El nombre de potrero no puede superar los 200 caracteres";
  }

  return errors;
}
