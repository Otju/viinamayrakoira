import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from "react-router-bootstrap"

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/best">
        <Navbar.Brand href=" ">
          <img src={process.env.PUBLIC_URL + '/doggo.svg'} style={{ height: "5rem", fill: "red" }} alt="viinamayrakoira.svg" />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <LinkContainer to="/best"><Nav.Link>Parhaat</Nav.Link></LinkContainer>
          <LinkContainer to="/drinks"><Nav.Link>Juomat</Nav.Link></LinkContainer>
          <LinkContainer to="/statistics"><Nav.Link>Tilastoja</Nav.Link></LinkContainer>
          <LinkContainer to="/bars"><Nav.Link>Baarit</Nav.Link></LinkContainer>
          <LinkContainer to="/portioncalculator"><Nav.Link>Annoslaskuri</Nav.Link></LinkContainer>
          <LinkContainer to="/moreinfo"><Nav.Link>Lisää infoa</Nav.Link></LinkContainer>
        </Nav>
        <Navbar.Brand>Viinamayrakoira.fi</Navbar.Brand>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar