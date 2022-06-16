import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/reducer";

import styles from "./navbar.module.css";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.animals.userInfo);

  const logout = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
        dispatch(setUserInfo(null));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src="http://www.xn--bast-tqa.com.ar/images/new/logo-main.png"
        alt="bastó logo"
      />
      {user && (
        <>
          <p className={styles.rol_user}>
            Rol:
            {user?.is_admin ? " Administrador" : " Usuario"}
          </p>
          <button className={styles.btn_secondary} onClick={logout}>
            Salir
          </button>
        </>
      )}
    </div>
  );
}

export default Navbar;
