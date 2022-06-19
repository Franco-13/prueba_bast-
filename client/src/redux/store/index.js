import { configureStore } from "@reduxjs/toolkit";
import animals from "../reducer";
import users from "../reducer/userSlice";

const reducer = {
  animals,
  users,
};

export default configureStore({
  reducer,
  /*   reducer: {
    animals,
  }, */
});
