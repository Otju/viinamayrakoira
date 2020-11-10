import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button"
import HoverableDropDownText from "../DrinksPage/SearchVariableMenu/HoverableDropDownText"


const LoginForm = ({isRegisterForm, isLoggedIn, logout}) => {
  const [show, setShow] = useState(false)


  return <>
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
            <Modal.Title>{isRegisterForm ? "Rekisteröidy" : "Kirjaudu sisään"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
        </Modal >
      </>}
  </>
}

export default LoginForm