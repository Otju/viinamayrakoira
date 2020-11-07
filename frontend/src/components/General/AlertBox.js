import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

const AlertBox = ({ setAlert, alert, variant, duration }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(null)
    }, duration || 3000)
    return () => clearTimeout(timer);
  })
  //style={{ height: "4rem" }}
  return <div >
    {alert
      ? <Alert variant={variant}>{alert}</Alert>
      : null}
  </div>
}

export default AlertBox