import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from '../../queries'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AlertBox from './AlertBox'


const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const client = useApolloClient()

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('viinamayrakoira-user-token'))

  const [alert, setAlert] = useState(null)

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setAlert({ message: "Väärä käyttäjänimi tai salasana", variant: "danger" })
    }
  })

  const logout = () => {
    if (window.confirm("Haluatko varmasti kirjautua ulos?")) {
      localStorage.clear()
      client.resetStore()
      setIsLoggedIn(false)
    }
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
    login({ variables: { username, password } })
  }

  return <>
    {isLoggedIn
      ? <Button variant="secondary" onClick={() => logout()}>Kirjaudu ulos</Button>
      : <>
        <Button variant="secondary" onClick={() => setShow(true)}>Kirjaudu sisään</Button>
        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Kirjaudu sisään</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Label>Käyttäjänimi</Form.Label>
                <Form.Control type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="käyttäjänimi"></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="salasana"></Form.Control>
              </Form.Group>
              <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} />
              <Form.Control type="submit" value="Kirjaudu sisään"></Form.Control>
            </Form>
          </Modal.Body>
        </Modal >
      </>}
  </>
}

export default LoginForm