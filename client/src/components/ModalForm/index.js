import { useEffect, useState } from "react";
import styles from "./modalForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postAnimal, putAnimal } from "../../redux/reducer";
import Button from "../Button";
import CloseIcon from "../CloseIcon";

function ModalForm({ visible, setShow, updateAnimal }) {
  const dispatch = useDispatch();

  const detailAnimal = useSelector((state) => state.animals.detailAnimal);
  const animalTypes = useSelector((state) => state.animals.animalTypesInfo);
  const deviceTypes = useSelector((state) => state.animals.deviceTypesInfo);

  useEffect(() => {
    if (updateAnimal) {
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
  }, [detailAnimal, updateAnimal]);

  const [input, setInput] = useState({
    animal_type: "",
    animal_weight: 0,
    device_number: "",
    device_type: "",
    id_senasa: "",
    paddock_name: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAnimalInputRadio = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setInput({ ...input, animal_type: e.target.value });
  };

  const handleDeviceInputRadio = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setInput({ ...input, device_type: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (updateAnimal) {
      dispatch(putAnimal(input, detailAnimal._id));
      setTimeout(() => {
        setShow(false);
      }, 500);
    } else {
      dispatch(postAnimal(input));
    }
    setInput({
      animal_type: "",
      animal_weight: 0,
      device_number: "",
      device_type: "",
      id_senasa: "",
      paddock_name: "",
    });
  };

  return (
    <div
      className={visible ? styles.show_modal_form : styles.hidden_modal_form}
    >
      <div className={styles.form_container}>
        <div className={styles.btn_close}>
          <Button onClick={() => setShow(false)} circle={true}>
            <CloseIcon stroke="white" />
          </Button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {updateAnimal ? null : (
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
                value={input.id_senasa}
                onChange={handleChange}
              />
            </div>
          )}
          <div className={styles.input_radio_container}>
            <label className={styles.label} htmlFor="animal_type">
              <p className={styles.span}>Tipo de animal</p>
            </label>
            {animalTypes?.map((animal) => (
              <div key={animal}>
                <input
                  className={styles.input}
                  id="animal_type"
                  name="animal_type"
                  type="radio"
                  checked={input.animal_type === animal}
                  value={animal}
                  onChange={handleAnimalInputRadio}
                />
                <span>{animal}</span>
              </div>
            ))}
          </div>
          <div className={styles.input_text_container}>
            <label className={styles.label} htmlFor="animal_weight">
              <p className={styles.span}>Peso del animal</p>
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
          </div>
          <div className={styles.input_radio_container}>
            <label className={styles.label} htmlFor="device_type">
              <p className={styles.span}>Tipo de dispositivo</p>
            </label>
            {deviceTypes?.map((device) => (
              <div key={device}>
                <input
                  className={styles.input}
                  id="device_type"
                  name="device_type"
                  type="radio"
                  checked={input.device_type === device}
                  value={device}
                  onChange={handleDeviceInputRadio}
                />
                <span>{device}</span>
              </div>
            ))}
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
          </div>
          <Button>{updateAnimal ? "Actualizar" : "Crear"}</Button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
