const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message[0] === 't') {
    return (
    <div className="error">
      {message.slice(1)}
    </div>
  )}

  return (
    <div className="message">
      {message}
    </div>
  )
}

export default Notification
