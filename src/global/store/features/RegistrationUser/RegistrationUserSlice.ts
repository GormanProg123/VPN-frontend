import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  email:string,
  password:string,
  verificationCode:string;
  token:string;
  tokenExpiry:string;
}

const initialState: User = {
  email:"",
  password:"",
  verificationCode:"",
  token:"",
  tokenExpiry:""
}

export const registrationUserSlice = createSlice({
  name: 'registrationUser',
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<User>) => {
        state.email = action.payload.email
        state.password = action.payload.password
        state.verificationCode = action.payload.verificationCode
        state.token = action.payload.token
        state.tokenExpiry = action.payload.tokenExpiry
        console.log(action.payload)
    },
  },
})


export const { userData } = registrationUserSlice.actions

export default registrationUserSlice.reducer