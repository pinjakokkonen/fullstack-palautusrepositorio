const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className="message">
      {props.message}
    </div>
  )
}

export default Notification