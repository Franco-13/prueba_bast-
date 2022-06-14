export function validateInputs(input) {
  let errors = null;
  const regExpAlphanumeric = /^[A-Za-z0-9]{8}$/;

  if (input.animal_type.length === 0) {
    errors.animal_type = "Seleccione un tipo de animal";
  }
  if (input.animal_weight < 0) {
    errors.animal_weight = "El peso debe ser mayor a cero";
  }
  if (input.device_number.length === 0) {
    errors.device_number = "Debe ingresar un cadena alfanumérica";
  } else if (regExpAlphanumeric.test(input.device_number)) {
    errors.device_number =
      "La cadena debe ser alfanumérica y contener 8 caracteres";
  }
}
