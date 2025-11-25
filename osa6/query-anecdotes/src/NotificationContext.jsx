import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_VOTE':
      return `anecdote ${action.payload} voted`
    case 'NEW_ANECDOTE':
      return `anecdote ${action.payload} created`
    case 'ERROR':
      return 'too short anecdote, must have length 5 or more'
    default:
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext