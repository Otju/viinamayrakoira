import React, { useState, useEffect } from "react"
import { useMutation, useApolloClient } from "@apollo/client"
import { CREATE_USER, LOGIN } from "../../queries"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import AlertBox from "./AlertBox"
import HoverableDropDownText from "../DrinksPage/SearchVariableMenu/HoverableDropDownText"
import { useField, useUserInfo } from "./../../utils"


const LoginForm = ({ isButton }) => {
  const [show, setShow] = useState(false)
  const [isRegisterForm, setIsRegisterForm] = useState(false)
  const client = useApolloClient()
  const username = useField("text", "käyttäjänimi", null, isRegisterForm && "3-15 merkkiä (a-zA-Z0-9_.)")
  const email = useField("email", "sähköposti", null,
  "Sähköpostia ei jaeta kellekkään. Viestiä lähetetään vain käyttäjän erikseen hyväksymissä tilanteissa (esim. salasanan uusiminen)."
  )
  const password = useField("password", "salasana", null,
    isRegisterForm && <>6-50 merkkiä. Ei kannata käyttää samaa salasanaa monella sivustolla.
    Helpointa ja turvallisinta on käyttää <a href="https://www.lastpass.com/" target="_blank" rel="noopener noreferrer">salasanamanageria</a>.</>
  )
  const userInfo = useUserInfo()
  const [shownUsername, setShownUserName] = useState(userInfo.username)

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("viinamayrakoira-user-token"))

  const [alert, setAlert] = useState(null)

  const resetFields = () => {
    username.set("")
    password.set("")
    email.set("")
  }

  const [login, loginResult] = useMutation(LOGIN, {
    onError: () => {
      setAlert({ message: "Väärä käyttäjänimi tai salasana", variant: "danger" })
    },
    onCompleted: () => {
      if (isRegisterForm) {
        setAlert({ message: "Loit tilin ja kirjauduit sisään", variant: "success", global, duration: 7000 })
      } else {
        setAlert({ message: "Kirjauduit sisään", variant: "success", global })
      }
      //closeNavBar()
    }
  })

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      const message = error.message
      if (message.includes("äyttäjäni")) {
        username.setInvalid(true)
      }
      if (message.includes("alasana")) {
        password.setInvalid(true)
      }
      if (message.includes("ähköposti")) {
        email.setInvalid(true)
      }
      setAlert({ message, variant: "danger", duration: 5000 })
    },
    onCompleted: () => {
      login({ variables: { username: username.value, password: password.value } })
    }
  })

  const logout = () => {
    //if (window.confirm("Haluatko varmasti kirjautua ulos?")) {}
    localStorage.removeItem("viinamayrakoira-user-token")
    localStorage.removeItem("viinamayrakoira-user-username")
    localStorage.removeItem("viinamayrakoira-user-id")
    client.resetStore()
    setIsLoggedIn(false)
    setAlert({ message: "Kirjauduit ulos", variant: "warning", global })
    //closeNavBar()
  }

  useEffect(() => {
    if (loginResult.data) {
      const { token, username, id } = loginResult.data.login
      localStorage.setItem("viinamayrakoira-user-token", token)
      localStorage.setItem("viinamayrakoira-user-username", username)
      localStorage.setItem("viinamayrakoira-user-id", id)
      setShownUserName(username)
      setShow(false)
      setIsLoggedIn(true)
      resetFields()
    }
  }, [loginResult.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    if (isRegisterForm) {
      createUser({ variables: { username: username.value, password: password.value, email: email.value } })
    } else {
      login({ variables: { username: username.value, password: password.value } })
    }
  }

  const content = <>
    <Form onSubmit={submit} noValidate>
      {username.field}
      {isRegisterForm && email.field}
      {password.field}
      <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} duration={alert?.duration} global={alert?.global} />
      <Form.Control type="submit" value={isRegisterForm ? "Rekisteröidy" : "Kirjaudu sisään"}></Form.Control>
    </Form>
    <Button variant="link" onClick={() => setIsRegisterForm(v => !v)}>
      {isRegisterForm ? "Oletko jo käyttäjä? Kirjautu sisään tästä" : "Etkö ole vielä käyttäjä? Rekisteröidy tästä"}
    </Button>
  </>

  const title = isRegisterForm ? "Rekisteröidy" : "Kirjaudu sisään"

  if (!isButton) {
    return <>
      <h4>{title}</h4>
      {content}
    </>
  }

  return <>
    {alert && alert.message && alert.global ? <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} duration={alert?.duration} global /> : null}
    {isLoggedIn
      ? <Dropdown>
        <Dropdown.Toggle variant="dark">{shownUsername}</Dropdown.Toggle>
        <Dropdown.Menu>
          <HoverableDropDownText handleClick={() => logout()}>Kirjaudu ulos</HoverableDropDownText>
        </Dropdown.Menu>
      </Dropdown >
      : <>
        <Button variant="dark" onClick={() => setShow(true)}>Kirjaudu sisään</Button>
        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {content}
          </Modal.Body>
        </Modal >
      </>}
  </>
}

export default LoginForm