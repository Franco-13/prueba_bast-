import { configureStore } from "@reduxjs/toolkit";
import animals from "../reducer";

export default configureStore({
  reducer: {
    animals,
  },
});
