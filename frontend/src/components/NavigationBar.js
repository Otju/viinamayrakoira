import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand><img src={process.env.PUBLIC_URL + '/doggo.svg'} style={{ height: "5rem", fill: "red" }} alt="viinamayrakoira.svg" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href=" ">Koti</Nav.Link>
          <Nav.Link href="#statistics">Statistiikkaa</Nav.Link>
          <Nav.Link href="#moreinfo">Lisää infoa</Nav.Link>
        </Nav>
        <Navbar.Brand>Viinamayrakoira.fi</Navbar.Brand>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar