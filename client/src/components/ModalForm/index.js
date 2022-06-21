import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postAnimal,
  putAnimal,
  resetAnimal,
  setMessageInfo,
} from "../../redux/reducer";
import { validateInputs } from "../../helpers/validateForm";

import Button from "../Button";
import CloseIcon from "../CloseIcon";

import styles from "./modalForm.module.css";

function ModalForm({ setShow }) {
  const dispatch = useDispatch();

  const detailAnimal = useSelector((state) => state.animals.detailAnimal);
  const animalTypes = useSelector((state) => state.animals.animalTypesInfo);
  const deviceTypes = useSelector((state) => state.animals.deviceTypesInfo);
  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.userInfo);

  useEffect(() => {
    if (detailAnimal) {
      setInput(detailAnimal);
    } else {
      setInput({
        animal_type: "",
        animal_weight: 0,
        device_number: "",
        device_type: "",
        id_senasa: "",
        paddock_name: "",
      });
    }
  }, [detailAnimal]);

  const [input, setInput] = useState({
    animal_type: "",
    animal_weight: 0,
    device_number: "",
    device_type: "",
    id_senasa: "",
    paddock_name: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validateInputs({ ...input, [e.target.name]: e.target.value }));
  };

  const handleCloseModal = () => {
    if (detailAnimal) {
      dispatch(resetAnimal());
    }
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.is_admin && detailAnimal) {
      dispatch(
        setMessageInfo({ reset: false, message: "Usuario no autorizado" })
      );
      return;
    }

    const resultValidation = validateInputs(input);

    if (Object.keys(resultValidation).length === 0) {
      if (detailAnimal) {
        dispatch(putAnimal(input, detailAnimal._id, token));
        handleCloseModal();
      } else {
        dispatch(postAnimal(input, token));
        setInput({
          animal_type: "",
          animal_weight: 0,
          device_number: "",
          device_type: "",
          id_senasa: "",
          paddock_name: "",
        });
      }
    } else {
      setErrors(resultValidation);
    }
  };

  return (
    <div className={styles.show_modal_form}>
      <div className={styles.form_container}>
        <div className={styles.btn_close}>
          <Button onClick={handleCloseModal} circle={true}>
            <CloseIcon stroke="white" />
          </Button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.overflow_form}>
            {detailAnimal ? null : (
              <div className={styles.input_text_container}>
                <label className={styles.label} htmlFor="id_senasa">
                  <p className={styles.span}>ID</p>
                </label>
                <input
                  className={styles.input}
                  id="id_senasa"
                  name="id_senasa"
                  type="text"
                  placeholder="ingrese el ID SENASA"
                  value={input?.id_senasa}
                  onChange={handleChange}
                />
                {errors?.id_senasa ? (
                  <span className={styles.span_error}>{errors?.id_senasa}</span>
                ) : (
                  <span></span>
                )}
              </div>
            )}
            <div className={styles.input_radio_container}>
              <p className={styles.span}>Tipo de animal</p>
              <div>
                {animalTypes?.map((animal) => (
                  <div key={animal}>
                    <input
                      className={styles.input}
                      id={animal}
                      name="animal_type"
                      type="radio"
                      checked={input.animal_type === animal}
                      value={animal}
                      onChange={handleChange}
                    />
                    <label htmlFor={animal}>{animal}</label>
                  </div>
                ))}
              </div>
              {errors?.animal_type ? (
                <span className={styles.span_error}>{errors?.animal_type}</span>
              ) : (
                <span></span>
              )}
            </div>
            <div className={styles.input_text_container}>
              <label className={styles.label} htmlFor="animal_weight">
                <p className={styles.span}>Peso del animal (kg)</p>
              </label>
              <input
                className={styles.input}
                id="animal_weight"
                name="animal_weight"
                type="text"
                placeholder="ingrese el peso del animal"
                value={input.animal_weight}
                onChange={handleChange}
              />
              {errors?.animal_weight ? (
                <span className={styles.span_error}>
                  {errors?.animal_weight}
                </span>
              ) : (
                <span></span>
              )}
            </div>
            <div className={styles.input_text_container}>
              <label className={styles.label} htmlFor="paddock_name">
                <p className={styles.span}>Nombre del potrero</p>
              </label>
              <input
                className={styles.input}
                id="paddock_name"
                name="paddock_name"
                type="text"
                placeholder="ingrese el nombre del potrero"
                value={input.paddock_name}
                onChange={handleChange}
              />
              {errors?.paddock_name ? (
                <span className={styles.span_error}>
                  {errors?.paddock_name}
                </span>
              ) : (
                <span></span>
              )}
            </div>
            <div className={styles.input_radio_container}>
              <p className={styles.span}>Tipo de dispositivo</p>
              <div>
                {deviceTypes?.map((device) => (
                  <div key={device}>
                    <input
                      className={styles.input}
                      id={device}
                      name="device_type"
                      type="radio"
                      checked={input.device_type === device}
                      value={device}
                      onChange={handleChange}
                    />
                    <label htmlFor={device}>{device}</label>
                  </div>
                ))}
              </div>
              {errors?.device_type ? (
                <span className={styles.span_error}>{errors?.device_type}</span>
              ) : (
                <span></span>
              )}
            </div>
            <div className={styles.input_text_container}>
              <label className={styles.label} htmlFor="device_number">
                <p className={styles.span}>Número del dispositivo</p>
              </label>
              <input
                className={styles.input}
                id="device_number"
                name="device_number"
                type="text"
                placeholder="ingrese un número"
                value={input.device_number}
                onChange={handleChange}
              />
              {errors?.device_number ? (
                <span className={styles.span_error}>
                  {errors?.device_number}
                </span>
              ) : (
                <span></span>
              )}
            </div>
            <Button>{detailAnimal ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
