import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      const content = `You voted ${action.payload}`
      return content
    },
    removeNotification(state, action) {
      return action.payload
    }
  },
})

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer