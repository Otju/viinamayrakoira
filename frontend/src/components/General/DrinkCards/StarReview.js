import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import ReactStars from 'react-rating-stars-component'

const StarReview = ({ type, setter, isInvalid, value, size, showHeader }) => {

  const [starsKey, setStarsKey] = useState(Math.random())

  let label = "Maku"
  let char = "★"
  let activeColor = "gold"

  if (type === "PQR") {
    label = "Hinta-laatu"
    char = "€"
    activeColor = "green"
  }

  useEffect(() => {
    setStarsKey(Math.random())
  }, [value])

  const inValidStyling = isInvalid ? { border: "solid", borderColor: "red", borderWidth: "1px", borderRadius: "5px" } : {}

  const content = <ReactStars key={starsKey} char={char} size={size || 40} activeColor={activeColor} value={value / 2 || 0} isHalf={true} edit={Boolean(setter)} onChange={(newValue) => setter(newValue * 2)} />

  return showHeader
    ? <div style={{ display: "inline-block", ...inValidStyling }}>
      <Form.Group>
        <Form.Label>{label}<b style={{ color: "red" }}>*</b></Form.Label><br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "inline-block" }}>
            {content}
          </div>
          {isInvalid ? <b style={{ color: "red", fontSize: "30px", marginTop: "auto", marginBottom: "auto" }}>×</b> : null}
        </div>
      </Form.Group>
    </div>
    : content
}

export default StarReview