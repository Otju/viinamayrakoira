import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

const AlertBox = ({ setAlert, alert, variant }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(null)
    }, 2000)
    return () => clearTimeout(timer);
  })

  return <div style={{ height: "4rem" }}>
    {alert
      ? <Alert variant={variant}>{alert}</Alert>
      : null}
  </div>
}

export default AlertBox