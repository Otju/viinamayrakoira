import React from 'react'
import Form from 'react-bootstrap/Form'
import ReactStars from 'react-rating-stars-component'

const StarReview = ({ type, setter, isInvalid,value }) => {

  let label = "Maku"
  let char = "★"
  let activeColor = "gold"

  if (type === "PQR") {
    label = "Hinta-laatu"
    char = "€"
    activeColor = "green"
  }

  const inValidStyling = isInvalid ? { border: "solid", borderColor: "red", borderWidth: "1px", borderRadius: "5px" } : {}

  return <div style={{ display: "inline-block", ...inValidStyling }}>
    <Form.Group>
      <Form.Label>{label}<b style={{ color: "red" }}>*</b></Form.Label><br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-block" }}>
          {value/2 || 0}
          <ReactStars char={char} size={40} activeColor={activeColor} value={value/2 || 0} isHalf={true} onChange={(newValue) => setter(newValue * 2)} />
        </div>
        {isInvalid ? <b style={{ color: "red", fontSize: "30px", marginTop: "auto", marginBottom: "auto" }}>×</b> : null}
      </div>
    </Form.Group>
  </div>
}

export default StarReview