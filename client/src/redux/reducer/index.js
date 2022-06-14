import { createSlice } from "@reduxjs/toolkit";

export const animalsSlice = createSlice({
  name: "animals",
  initialState: {
    list: [],
    filterList: null,
    createMessage: "",
    deleteMessage: "",
    updateMessage: "",
    detailAnimal: null,
    deviceTypesInfo: null,
    animalTypesInfo: null,
    loading: true,
  },
  reducers: {
    setAnimalList: (state, action) => {
      state.list = action.payload;
    },
    setAnimalCreated: (state, action) => {
      state.createMessage = action.payload;
    },
    setAnimalDeleted: (state, action) => {
      state.deleteMessage = action.payload;
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
      console.log(action.payload, "ID SEARCH");
      const result = [...state.list].filter((animal) =>
        animal.id_senasa.toString().includes(action.payload.toString())
      );
      console.log("RESULT", result);
      state.filterList = result.length ? result : null;
    },
    resetSearchAnimal: (state) => {
      state.filterList = null;
    },
    setAnimalUpdate: (state, action) => {
      state.updateMessage = action.payload;
    },
    setAnimalAndDeviceInfo: (state, action) => {
      console.log("DATA", action.payload);
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
  setAnimalCreated,
  setAnimalDeleted,
  setDetailAnimal,
  resetDetailAnimal,
  search,
  resetSearchAnimal,
  setAnimalUpdate,
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
    return fetch("http://192.168.100.37:3001/animal")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setAnimalList(data));
        dispatch(setLoadingStatus(false));
      })
      .catch((error) => console.log(error));
  };
};

export const fetchAnimalAndDeviceInfo = () => {
  return function (dispatch) {
    return fetch("http://192.168.100.37:3001/animal/info")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setAnimalAndDeviceInfo(data));
      });
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

export const postAnimal = (payload) => {
  return function (dispatch) {
    return fetch("http://192.168.100.37:3001/animal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setAnimalCreated(data.message));
        dispatch(fetchAllAnimals());
      });
  };
};

export const putAnimal = (payload, id) => {
  console.log(id);
  return function (dispatch) {
    return fetch(`http://192.168.100.37:3001/animal/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA PUT", data);
        dispatch(setAnimalUpdate(data.message));
        dispatch(fetchAllAnimals());
      });
  };
};

export const removeAnimal = ({ id }) => {
  return function (dispatch) {
    return fetch(`http://192.168.100.37:3001/animal/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setAnimalDeleted(data.message));
        dispatch(fetchAllAnimals());
      });
  };
};
