import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  },
})

const { showNotification } = notificationSlice.actions

export const setNotification = (content, timer) => {
  return async (dispatch) => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, timer*1000)
  }
}

export default notificationSlice.reducer