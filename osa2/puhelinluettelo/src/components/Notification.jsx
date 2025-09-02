const Notification = (props) => {
  if (props.message === null) {
    if (props.error === null) {
      return null
    } else {
      return (
      <div className="error">
        {props.error}
      </div>
    )}
  }

  return (
    <div className="message">
      {props.message}
    </div>
  )
}

export default Notification
