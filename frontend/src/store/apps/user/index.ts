import { Dispatch } from "redux";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

interface DataParams {
    q: string
    role: string
    status: string
    currentPlan: string
  }
  
interface Redux {
    getState:  any
    dispatch: Dispatch<any>
}

export const getAllUsers = createAsyncThunk('appusers/get', async (params: DataParams)=> {
    const response = await axios.get('/apps/users/list', {
        params
    })
    return response.data
})


export const appUsersSlice = createSlice({
    name: 'appUsers',
    initialState: {
      data: [],
      total: 1,
      params: {},
      allData: []
    },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.data = action.payload.users
        state.total = action.payload.total
        state.params = action.payload.params
        state.allData = action.payload.allData
      })
    }
  })
  
  export default appUsersSlice.reducer
  