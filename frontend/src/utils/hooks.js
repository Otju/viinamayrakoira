import React, { useEffect, useState } from "react"
import Form from "react-bootstrap/Form"
import { capitalizeFirst } from "./index"

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

  useEffect(() => {
    setInvalid(false)
  }, [value])

  const field = <Form.Group >
    <Form.Label>{capitalizeFirst(name)}</Form.Label>
    {type === "textarea"
      ? <Form.Control isInvalid={isInvalid} as="textarea" rows={4} value={value} onChange={(event) => setValue(event.target.value)} placeholder={name}></Form.Control>
      : < Form.Control isInvalid={isInvalid} type={type} value={value} onChange={(event) => setValue(event.target.value)} placeholder={name}></Form.Control>
    }
  </Form.Group >

  return {
    value,
    field,
    set: (newValue) => setValue(newValue),
    setInvalid
  }
}


export const useUserInfo = () => {
  const username = localStorage.getItem("viinamayrakoira-user-username")
  const id = localStorage.getItem("viinamayrakoira-user-id")
  return { id, username }
}