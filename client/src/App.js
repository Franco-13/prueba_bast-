import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUserInfo, tokenStatus } from "./redux/reducer/userSlice";

import Loading from "./components/Loading";
import AnimalRegistry from "./pages/AnimalRegistry";
import ModalMessageInfo from "./components/ModalMessageInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  const loading = useSelector((state) => state.animals.loading);
  const infoMessage = useSelector((state) => state.animals.messageInfo);

  const [show, setShow] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        auth.currentUser?.getIdToken().then((res) => {
          dispatch(tokenStatus(res));
        });
        fetch(`${process.env.REACT_APP_API}/user/auth`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: currentUser.uid,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.error) {
              throw new Error(data.error);
            }
            dispatch(setUserInfo(data));
          })
          .then(() => {
            setShow(
              <Routes>
                <Route
                  path="/animalsRegister"
                  element={
                    <>
                      {loading && <Loading />}
                      {infoMessage?.length > 0 && (
                        <ModalMessageInfo infoMessage={infoMessage} />
                      )}
                      <AnimalRegistry />
                    </>
                  }
                />
                <Route
                  path="*"
                  element={<Navigate to="/animalsRegister" replace />}
                />
              </Routes>
            );
          })
          .catch((err) => {
            console.error("APP ERR", err);
          });
      } else {
        setShow(
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        );
      }
    });
  }, [loading, infoMessage, dispatch]);

  return (
    <>
      <div className="App-header">
        <Navbar />
        {show}
      </div>
    </>
  );
}

export default App;
