import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./servicesSlice";

const store = configureStore({
  reducer: {
    services: serviceReducer,
  },
});
export default store;
