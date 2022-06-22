import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { validateLogin } from "../../helpers/validateLogin";

import Button from "../../components/Button";

import styles from "./login.module.css";
import ModalMessageInfo from "../../components/ModalMessageInfo";
import Loading from "../../components/Loading";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [firebaseErrors, setFirebaseErrors] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
    setErrors(validateLogin({ ...input, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultValidation = validateLogin(input);

    if (Object.keys(resultValidation).length === 0) {
      const { email, password } = input;
      setShowLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((firebaseResp) => {
          console.log(firebaseResp);
          setShowLoading(false);
        })
        .catch((error) => {
          setShowLoading(false);
          const errorCode = error.code;
          console.log(error);
          if (errorCode === "auth/user-not-found") {
            setFirebaseErrors("Usuario no registrado");
            setTimeout(() => {
              setFirebaseErrors("");
            }, 1500);
          } else if (errorCode === "auth/wrong-password") {
            setFirebaseErrors("Contraseña incorrecta");
            setTimeout(() => {
              setFirebaseErrors("");
            }, 1500);
          }
        });
    } else {
      setErrors(resultValidation);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Ingreso de usuario</h2>
          <div className={styles.overflow_form}>
            <div className={styles.input_container}>
              <label className={styles.label} htmlFor="email">
                <p className={styles.p}>Email</p>
              </label>
              <input
                className={styles.input}
                placeholder="ejemplo@mail.com"
                type="email"
                name="email"
                onChange={handleChange}
                value={input.email}
                title=""
              />
              {errors?.email ? (
                <span className={styles.span_error}>{errors?.email}</span>
              ) : (
                <span className={styles.empty_span}>""</span>
              )}
            </div>
            <div className={styles.input_container}>
              <label className={styles.label} htmlFor="password">
                <p className={styles.p}>Password</p>
              </label>
              <input
                className={styles.input}
                placeholder="******"
                type="password"
                name="password"
                onChange={handleChange}
                value={input.password}
              />
              {errors?.password ? (
                <span className={styles.span_error}>{errors?.password}</span>
              ) : (
                <span className={styles.empty_span}>""</span>
              )}
            </div>
            <Button>Ingresar</Button>
          </div>
        </form>
        <div>
          <span>¿No tiene cuenta?</span>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            secondary
          >
            Regístrese
          </Button>
        </div>
      </div>
      {firebaseErrors?.length > 0 && (
        <ModalMessageInfo infoMessage={firebaseErrors} />
      )}
      {showLoading && <Loading />}
    </section>
  );
}

export default Login;
