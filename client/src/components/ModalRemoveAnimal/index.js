import { useDispatch, useSelector } from "react-redux";
import { removeAnimal } from "../../redux/reducer";
import Button from "../Button";

import styles from "./modalRemoveAnimal.module.css";

function ModalRemoveAnimal({ visible, setShow }) {
  const dispatch = useDispatch();
  const detailAnimal = useSelector((state) => state.animals.detailAnimal);

  const handleRemoveAnimal = () => {
    dispatch(removeAnimal({ id: detailAnimal._id }));
    setTimeout(() => {
      setShow(false);
    }, 500);
  };

  return (
    <div
      className={
        visible ? styles.show_modal_remove : styles.hidden_modal_remove
      }
    >
      <div className={styles.modal_container}>
        <h4>
          {detailAnimal &&
            `Esta acción eliminará el registro con ID: ${detailAnimal._id} completamente`}
        </h4>
        <div className={styles.btn_container}>
          <Button
            secondary={true}
            children="Aceptar"
            onClick={handleRemoveAnimal}
          />
          <Button children="Cancelar" onClick={() => setShow(false)} />
        </div>
      </div>
    </div>
  );
}

export default ModalRemoveAnimal;
