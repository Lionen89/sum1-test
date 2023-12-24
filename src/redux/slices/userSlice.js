import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersData from '../../db.json'

const initialState = {
  error: null,
  users: [],
  currentUser: localStorage.getItem('email') ? localStorage.getItem('email') : '',
  loading: false,
}

export const getUsers = createAsyncThunk('users/get', async () => {
  return usersData.users
})

const userSlice = createSlice({
  initialState,
  name: 'users',
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, actions) => {
        state.loading = false
        state.users = actions.payload
      })
      .addCase(getUsers.rejected, (state, actions) => {
        state.loading = false
        state.users = []
        state.error = actions.error.message
      })
  },
  reducers: {
    setCurrentUser(state, actions) {
      state.loading = false
      state.currentUser = actions.payload
    },
  },
})

export const { setCurrentUser } = userSlice.actions
export const userReducer = userSlice.reducer
