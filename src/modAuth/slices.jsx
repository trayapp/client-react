import { createSlice } from '@reduxjs/toolkit'
import { fetchUser, fetchToken } from '../utils/fetchLocalStorageData'

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    user: fetchUser(),
    token: fetchToken().token,
    refreshToken: fetchToken().refreshToken,
    refreshExpiresIn: null
  },
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.user = payload.user
      state.token = payload.token
      state.refreshToken = payload.refreshToken
      state.refreshExpiresIn = payload.refreshExpiresIn
    },
    logOut: (state, { payload }) => {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.refreshExpiresIn = null
    }
  }
})