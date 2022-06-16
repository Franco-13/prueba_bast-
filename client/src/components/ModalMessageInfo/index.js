import { useDispatch } from "react-redux";
import { resetMessageInfo } from "../../redux/reducer";
import Button from "../Button";
import CloseIcon from "../CloseIcon";

import styles from "./modalMessageInfo.module.css";

function ModalMessageInfo({ infoMessage }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetMessageInfo());
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.btn_close}>
          <Button onClick={handleClick} circle={true}>
            <CloseIcon stroke="white" />
          </Button>
        </div>
        <p>{infoMessage}</p>
      </div>
    </div>
  );
}

export default ModalMessageInfo;
