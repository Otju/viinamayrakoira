import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_USER, LOGIN } from '../../queries'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import AlertBox from './AlertBox'
import HoverableDropDownText from '../DrinksPage/SearchVariableMenu/HoverableDropDownText'
import { useField, useUserInfo } from './../../utils'


const LoginForm = () => {
  const [show, setShow] = useState(false)
  const [isRegisterForm, setIsRegisterForm] = useState(false)
  const client = useApolloClient()
  const username = useField("text", "käyttäjänimi")
  const password = useField("password", "salasana")
  const userInfo = useUserInfo()
  const [shownUsername, setShownUserName] = useState(userInfo.username)

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('viinamayrakoira-user-token'))

  const [alert, setAlert] = useState(null)

  const [login, loginResult] = useMutation(LOGIN, {
    onError: () => {
      setAlert({ message: "Väärä käyttäjänimi tai salasana", variant: "danger" })
    }
  })

  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      const message = error.message
      if (message.includes("Käyttäjänimi")) {
        username.setInvalid(true)
      }
      if (message.includes("Salasana")) {
        password.setInvalid(true)
      }
      setAlert({ message, variant: "danger", duration: 5000 })
    },
    onCompleted: () => {
      //setAlert({ message: "Rekisteröityminen onnistui, voit nyt kirjautua sisään", variant: "success", duration: 8000 })
      login({ variables: { username: username.value, password: password.value } })
    }
  })

  const logout = () => {
    //if (window.confirm("Haluatko varmasti kirjautua ulos?")) {}
    localStorage.clear()
    client.resetStore()
    setIsLoggedIn(false)
  }

  useEffect(() => {
    if (loginResult.data) {
      const { token, username, id } = loginResult.data.login
      localStorage.setItem('viinamayrakoira-user-token', token)
      localStorage.setItem('viinamayrakoira-user-username', username)
      localStorage.setItem('viinamayrakoira-user-id', id)
      setShownUserName(username)
      setShow(false)
      setIsLoggedIn(true)
    }
  }, [loginResult.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    if (isRegisterForm) {
      createUser({ variables: { username: username.value, password: password.value } })
    } else {
      login({ variables: { username: username.value, password: password.value } })
    }
  }

  return <>
    {isLoggedIn
      ? <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">{shownUsername}</Dropdown.Toggle>
        <Dropdown.Menu>
          <HoverableDropDownText handleClick={() => logout()}>Kirjaudu ulos</HoverableDropDownText>
        </Dropdown.Menu>
      </Dropdown >
      : <>
        <Button variant="dark" onClick={() => setShow(true)}>Kirjaudu sisään</Button>
        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isRegisterForm ? "Rekisteröidy" : "Kirjaudu sisään"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submit}>
              {username.field}
              {password.field}
              <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} duration={alert?.duration} />
              <Form.Control type="submit" value={isRegisterForm ? "Rekisteröidy" : "Kirjaudu sisään"}></Form.Control>
            </Form>
            <Button variant="link" onClick={() => setIsRegisterForm(v => !v)}>
              {isRegisterForm ? "Oletko jo käyttäjä? Pääset kirjautu sisään tästä" : "Etkö ole vielä käyttäjä? Pääset rekisteröitymään tästä"}
            </Button>
          </Modal.Body>
        </Modal >
      </>}
  </>
}

export default LoginForm