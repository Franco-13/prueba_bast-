import { createSlice } from "@reduxjs/toolkit";

export const animalsSlice = createSlice({
  name: "animals",
  initialState: {
    list: [],
    filterList: null,
    messageInfo: "",
    detailAnimal: null,
    deviceTypesInfo: null,
    animalTypesInfo: null,
    loading: true,
  },
  reducers: {
    setAnimalList: (state, action) => {
      state.list = action.payload;
    },
    setMessageInfo: (state, action) => {
      if (action.payload.reset) {
        state.messageInfo = "";
      } else {
        state.messageInfo = action.payload.message;
      }
    },
    setDetailAnimal: (state, action) => {
      state.detailAnimal = state.list.find(
        (animal) => animal._id === action.payload
      );
    },
    resetDetailAnimal: (state) => {
      state.detailAnimal = null;
    },
    search: (state, action) => {
      const result = [...state.list].filter((animal) =>
        animal.id_senasa.toString().includes(action.payload.toString())
      );
      state.filterList = result.length ? result : null;
    },
    resetSearchAnimal: (state) => {
      state.filterList = null;
    },
    setAnimalAndDeviceInfo: (state, action) => {
      state.animalTypesInfo = action.payload.animalTypes;
      state.deviceTypesInfo = action.payload.deviceTypes;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default animalsSlice.reducer;

export const {
  setAnimalList,
  setMessageInfo,
  setDetailAnimal,
  resetDetailAnimal,
  search,
  resetSearchAnimal,
  setAnimalAndDeviceInfo,
  setLoading,
} = animalsSlice.actions;

export const setLoadingStatus = (payload) => {
  return function (dispatch) {
    dispatch(setLoading(payload));
  };
};

export const fetchAllAnimals = () => {
  return function (dispatch) {
    dispatch(setLoadingStatus(true));
    return fetch(`${process.env.REACT_APP_API}/animal`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAnimalList(data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoadingStatus(false));
      });
  };
};

export const fetchAnimalAndDeviceInfo = () => {
  return function (dispatch) {
    return fetch(`${process.env.REACT_APP_API}/animal/info`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAnimalAndDeviceInfo(data));
      });
  };
};

export const postAnimal = (payload, token) => {
  return function (dispatch) {
    dispatch(setLoadingStatus(true));
    return fetch(`${process.env.REACT_APP_API}/animal`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          throw Error(data.message);
        }
        dispatch(setMessageInfo({ reset: false, message: "Registro creado." }));
        dispatch(fetchAllAnimals());
      })
      .catch((error) => {
        dispatch(setLoadingStatus(false));
        if (error.message.includes("E11000")) {
          dispatch(
            setMessageInfo({
              reset: false,
              message: "El id ingresado ya existe.",
            })
          );
        }
      });
  };
};

export const putAnimal = (payload, id, token) => {
  return function (dispatch) {
    return fetch(`${process.env.REACT_APP_API}/animal/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message || data.error) {
          throw new Error(data.message || data.error);
        }
        dispatch(
          setMessageInfo({ reset: false, message: "Registro actualizado" })
        );
        dispatch(fetchAllAnimals());
      })
      .catch((error) => {
        console.error(error.message);
        dispatch(setLoadingStatus(false));
        if (error.message === "Unauthorized") {
          dispatch(
            setMessageInfo({ reset: false, message: "Usuario no autorizado" })
          );
        }
        if (error.message === "User does not exist") {
          dispatch(
            setMessageInfo({ reset: false, message: "Usuario no autorizado" })
          );
        }
      });
  };
};

export const removeAnimal = ({ id }, token) => {
  return function (dispatch) {
    dispatch(setLoadingStatus(true));
    return fetch(`${process.env.REACT_APP_API}/animal/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message || data.error) {
          throw new Error(data.message || data.error);
        }
        dispatch(
          setMessageInfo({ reset: false, message: "Registro eliminado" })
        );
        dispatch(fetchAllAnimals());
      })
      .catch((error) => {
        console.error(error.message);
        dispatch(setLoadingStatus(false));
        if (error.message === "Unauthorized") {
          dispatch(
            setMessageInfo({ reset: false, message: "Usuario no autorizado" })
          );
        }
        if (error.message === "User does not exist") {
          dispatch(
            setMessageInfo({ reset: false, message: "Usuario no autorizado" })
          );
        }
      });
  };
};

export const resetMessageInfo = () => {
  return function (dispatch) {
    return dispatch(setMessageInfo({ reset: true }));
  };
};

export const searchAnimalByID = (id) => {
  return function (dispatch) {
    return dispatch(search(id));
  };
};

export const resetsearchAnimalByIDAnimal = () => {
  return function (dispatch) {
    return dispatch(resetSearchAnimal());
  };
};

export const detailAnimal = (id) => {
  return function (dispatch) {
    return dispatch(setDetailAnimal(id));
  };
};

export const resetAnimal = () => {
  return function (dispatch) {
    return dispatch(resetDetailAnimal());
  };
};
