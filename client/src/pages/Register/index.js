import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../helpers/validateRegister";

import Button from "../../components/Button";

import styles from "./register.module.css";
import Loading from "../../components/Loading";
import ModalMessageInfo from "../../components/ModalMessageInfo";

function Register() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });
  const [errors, setErrors] = useState({});
  const [firebaseErrors, setFirebaseErrors] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
    setErrors(validateRegister({ ...input, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultValidation = validateRegister(input);

    if (Object.keys(resultValidation).length === 0) {
      const { email, password } = input;
      setShowLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((resp) => {
          const payload = {
            email,
            uid: resp.user.uid,
          };

          signOut(auth);

          fetch(`${process.env.REACT_APP_API}/user`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("regist data", data);
              setShowLoading(false);
              navigate("/");
            });
        })
        .catch((error) => {
          setShowLoading(false);
          const errorCode = error.code;

          if (errorCode === "auth/email-already-in-use") {
            setFirebaseErrors("El correo ingresado ya se encuentra registrado");
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
          <h2>Registro de usuario</h2>
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
            <div className={styles.input_container}>
              <label className={styles.label} htmlFor="password">
                <p className={styles.p}>Confirmar password</p>
              </label>
              <input
                className={styles.input}
                placeholder="******"
                type="password"
                name="repeat_password"
                onChange={handleChange}
                value={input.repeat_password}
              />
              {errors?.repeat_password ? (
                <span className={styles.span_error}>
                  {errors?.repeat_password}
                </span>
              ) : (
                <span className={styles.empty_span}>""</span>
              )}
            </div>
            <Button>Registrarse</Button>
          </div>
        </form>
        <div>
          <span>¿Ya tiene cuenta?</span>
          <Button
            onClick={() => {
              navigate("/");
            }}
            secondary
          >
            Ingrese
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

export default Register;
