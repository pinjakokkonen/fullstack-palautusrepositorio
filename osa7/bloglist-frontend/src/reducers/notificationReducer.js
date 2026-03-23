import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
  },
})

const { showNotification } = notificationSlice.actions

export const setNotification = (content) => {
  return async (dispatch) => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)
  }
}

export default notificationSlice.reducer
