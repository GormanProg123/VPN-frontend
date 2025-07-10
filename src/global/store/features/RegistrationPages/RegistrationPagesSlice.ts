import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CurrentPage {
  value: number 
}

const initialState: CurrentPage = {
  value: 1,
}

export const registrationPagesSlice = createSlice({
  name: 'registrationPages',
  initialState,
  reducers: {
    selectPage: (state, action: PayloadAction<number>) => {
        state.value = action.payload
        console.log(action.payload)
    },
  },
})


export const { selectPage } = registrationPagesSlice.actions

export default registrationPagesSlice.reducer