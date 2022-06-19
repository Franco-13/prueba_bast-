import { useDispatch, useSelector } from "react-redux";
import { removeAnimal, setMessageInfo } from "../../redux/reducer";

import Button from "../Button";

import styles from "./modalRemoveAnimal.module.css";

function ModalRemoveAnimal({ setShow }) {
  const dispatch = useDispatch();

  const detailAnimal = useSelector((state) => state.animals.detailAnimal);
  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.userInfo);

  const handleRemoveAnimal = () => {
    if (!user.is_admin) {
      dispatch(
        setMessageInfo({ reset: false, message: "Usuario no autorizado" })
      );
      setTimeout(() => {
        setShow(false);
      }, 500);
      return;
    }

    dispatch(removeAnimal({ id: detailAnimal._id }, token));
  };

  return (
    <div className={styles.show_modal_remove}>
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
