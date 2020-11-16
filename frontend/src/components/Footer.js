import React from "react"
import { colors } from "../utils"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const Footer = () => {

  return <footer style={{ background: colors.darkGray, marginTop: 0, paddingTop: "1rem", paddingBottom: "1rem" }}>
    <Container>
      <Row>
        <Col>
          <img src={process.env.PUBLIC_URL + "/doggo.svg"} style={{ height: "5rem" }} alt="viinamayrakoira.svg" />
        </Col>
        <Col>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center", height: "100%" }}>
            <h2 style={{ color: "white", textAlign: "center" }}>Viinamayrakoira.fi</h2>
          </div>
        </Col>
        <Col>
          <Row>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <h4 style={{ color: "white", textAlign: "center", width: "100%" }}>Lahjoita</h4>
            </div>
          </Row>
          <Row>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <form action="https://www.paypal.com/donate" method="post" target="_blank">
                <input type="hidden" name="hosted_button_id" value="MQK9WRMSCG734" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_FI/i/scr/pixel.gif" width="1" height="1" />
              </form>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer