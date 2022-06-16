import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/reducer";

import Button from "../../components/Button";

import styles from "./login.module.css";

function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = input;

    signInWithEmailAndPassword(auth, email, password)
      .then((firebaseResp) => {
        fetch("http://localhost:3001/user/auth", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: firebaseResp.user.uid,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              throw new Error(data.error);
            }
            dispatch(setUserInfo(data));
            navigate("/animalsRegister");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Ingreso de usuario</h2>
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
          </div>
          <Button>Ingresar</Button>
        </form>
        <div>
          <span>¿No tiene cuenta?</span>
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Regístrese
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Login;
