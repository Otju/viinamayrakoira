import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from '../../queries'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import AlertBox from './AlertBox'
import HoverableDropDownText from '../DrinksPage/SearchVariableMenu/HoverableDropDownText'
import { useField } from './../../utils'


const LoginForm = () => {
  const [show, setShow] = useState(false)
  const client = useApolloClient()

  const username = useField("text", "käyttäjänimi")
  const password = useField("password", "salasana")

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('viinamayrakoira-user-token'))

  const [alert, setAlert] = useState(null)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setAlert({ message: "Väärä käyttäjänimi tai salasana", variant: "danger" })
    }
  })

  const logout = () => {
    //if (window.confirm("Haluatko varmasti kirjautua ulos?")) {}
    localStorage.clear()
    client.resetStore()
    setIsLoggedIn(false)
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.token
      localStorage.setItem('viinamayrakoira-user-token', token)
      setShow(false)
      setIsLoggedIn(true)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username: username.value, password: password.value } })
  }

  return <>
    {isLoggedIn
      ? <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">Username</Dropdown.Toggle>
        <Dropdown.Menu>
          <HoverableDropDownText handleClick={() => logout()}>Kirjaudu ulos</HoverableDropDownText>
        </Dropdown.Menu>
      </Dropdown >
      : <>
        <Button variant="dark" onClick={() => setShow(true)}>Kirjaudu sisään</Button>
        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Kirjaudu sisään</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submit}>
              {username.field}
              {password.field}
              <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} />
              <Form.Control type="submit" value="Kirjaudu sisään"></Form.Control>
            </Form>
          </Modal.Body>
        </Modal >
      </>}
  </>
}

export default LoginForm