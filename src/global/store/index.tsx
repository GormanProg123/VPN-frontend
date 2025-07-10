import { configureStore } from '@reduxjs/toolkit'
import registrationPagesReducer  from './features/RegistrationPages/RegistrationPagesSlice'
import registrationUserReducer  from './features/RegistrationUser/RegistrationUserSlice'
export const store = configureStore({
  reducer: {
    registrationPages:registrationPagesReducer,
    registrationUser:registrationUserReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch