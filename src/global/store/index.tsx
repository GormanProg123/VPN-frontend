import { configureStore } from "@reduxjs/toolkit";
import registrationPagesReducer from "./features/RegistrationPages/RegistrationPagesSlice";
import registrationUserReducer from "./features/RegistrationUser/RegistrationUserSlice";
import { baseAuthApi } from "../api/auth/baseAuthApi";
export const store = configureStore({
  reducer: {
    registrationPages: registrationPagesReducer,
    registrationUser: registrationUserReducer,
    [baseAuthApi.reducerPath]: baseAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
