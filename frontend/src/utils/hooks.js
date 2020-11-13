import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import { capitalizeFirst } from "./index"
import Button from "react-bootstrap/Button"

const getWindowDimensions = (treshold) => {
  const { innerWidth: width, innerHeight: height } = window
  const mobile = width < 600
  const customTreshold = width < treshold
  return {
    width,
    height,
    mobile,
    customTreshold
  }
}

export const useWindowDimensions = (treshold) => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions(treshold))

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions(treshold))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [treshold])

  return windowDimensions
}

export const useField = (type, name) => {
  const [value, setValue] = useState("")
  const [isInvalid, setInvalid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setInvalid(false)
  }, [value])

  let content
  if (type === "textarea") {
    content = <Form.Control isInvalid={isInvalid} as="textarea"
      rows={8} value={value} onChange={(event) => setValue(event.target.value)}
      placeholder={name}>
    </Form.Control>
  } else if (type === "password") {
    const button = <Button variant="dark" onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)}>👁</Button>
    content = <>
      <div style={{ display: "flex" }}>
        {showPassword ?
          < Form.Control isInvalid={isInvalid} type="text"
            value={value} onChange={(event) => setValue(event.target.value)}
            placeholder={name}></Form.Control>
          : < Form.Control isInvalid={isInvalid} type="password"
            value={value} onChange={(event) => setValue(event.target.value)}
            placeholder={name}></Form.Control>}
        {button}
      </div>
    </>
  } else {
    content = < Form.Control isInvalid={isInvalid} type={type}
      value={value} onChange={(event) => setValue(event.target.value)}
      placeholder={name}></Form.Control>
  }

  const field = <Form.Group>
    <Form.Label>{capitalizeFirst(name)}</Form.Label>
    {content}
  </Form.Group >

  return {
    value,
    field,
    set: (newValue) => setValue(newValue),
    setInvalid,
  }
}


export const useUserInfo = () => {
  const username = localStorage.getItem("viinamayrakoira-user-username")
  const id = localStorage.getItem("viinamayrakoira-user-id")
  return { id, username }
}