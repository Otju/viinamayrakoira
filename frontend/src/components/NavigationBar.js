import React, { useState } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { LinkContainer } from "react-router-bootstrap"
import LoginForm from "./General/LoginForm"
import { colors } from "../utils"

const NavigationBar = () => {

  const [expanded, setExpanded] = useState(false)

  const handleClose = () => setExpanded(expanded ? false : "expanded")

  return <div style={{background: colors.darkGray}}>
    <div className="container">
      <Navbar expand="lg" bg="dark" variant="dark" expanded={expanded} onSelect={() => { if (expanded) { setExpanded(false) } }}>
        <LinkContainer to="/best">
          <Navbar.Brand href=" ">
            <img src={process.env.PUBLIC_URL + "/doggo.svg"} style={{ height: "5rem" }} alt="viinamayrakoira.svg" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => handleClose()} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/best"><Nav.Link>Parhaat</Nav.Link></LinkContainer>
            <LinkContainer to="/drinks"><Nav.Link>Juomat</Nav.Link></LinkContainer>
            <OverlayTrigger overlay={<Tooltip>Vielä työn alla</Tooltip>}><div><LinkContainer to="/bars"><Nav.Link disabled>Baarit</Nav.Link></LinkContainer></div></OverlayTrigger>
            <LinkContainer to="/compare"><Nav.Link>Vertaa</Nav.Link></LinkContainer>
            <LinkContainer to="/portioncalculator"><Nav.Link>Annoslaskuri</Nav.Link></LinkContainer>
            <LinkContainer to="/statistics"><Nav.Link>Tilastot</Nav.Link></LinkContainer>
            <LinkContainer to="/moreinfo"><Nav.Link>Tietoa</Nav.Link></LinkContainer>
          </Nav>
          <Navbar.Brand><LoginForm isButton closeNavBar={handleClose} /></Navbar.Brand>
          <Navbar.Brand>Viinamayrakoira.fi</Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </div>
  </div>
}

/*
        <Navbar.Brand>
          < Hoverable handleClick={() => window.open("https://www.paypal.com/donate?hosted_button_id=UGDSAU363MVE8", "_blank")}>
            <div style={{ position: "relative" }}>
              <input type="image" style={{ height: "4rem" }} src={process.env.PUBLIC_URL + '/doggoColor.svg'} name="submit" alt="Donate" />
              <div style={{ userSelect: "none", textAlign: "center", color: "black", position: "absolute", fontSize: "14px", top: "1.6rem", right: "2.2rem" }}><b>Lahjoita</b></div>
            </div>
          </Hoverable>
        </Navbar.Brand>
*/

export default NavigationBar