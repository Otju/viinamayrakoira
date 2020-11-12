import React, { useEffect } from "react"
import Alert from "react-bootstrap/Alert"

const AlertBox = ({ setAlert, alert, variant, duration, global }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(null)
    }, duration || 3000)
    return () => clearTimeout(timer)
  })


  const style = global ? { position: "fixed", zIndex: 10000, left: 0, top: 0, fontSize: "25px"} : {}

  return <div style={style}>
    {alert
      ? <Alert variant={variant}>{alert}</Alert>
      : null}
  </div>
}

export default AlertBox