import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";

import styles from "./register.module.css";

function Register() {
  const [input, setInput] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = input;

    createUserWithEmailAndPassword(auth, email, password)
      .then((resp) => {
        const payload = {
          email,
          uid: resp.user.uid,
        };
        fetch("http://localhost:3001/user", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        navigate("/");
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
          <h2>Registro de usuario</h2>
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
          <Button>Registrarse</Button>
        </form>
        <div>
          <span>¿Ya tiene cuenta?</span>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Ingrese
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Register;
