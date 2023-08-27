import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./form.slice";

export const store = configureStore({
  reducer: { form: formReducer },
});
