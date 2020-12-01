import React from "react"
import { colors } from "../utils"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import ReportModal from "./General/ReportModal"
import Button from "react-bootstrap/esm/Button"

const Footer = () => {

  return <footer style={{ background: colors.darkGray, marginTop: 0, paddingTop: "1rem", paddingBottom: "1rem" }}>
    <Container>
      <Row>
        <Col>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center", height: "100%" }}>
            <ReportModal defaultReportTypeIndex={1} />
          </div>
        </Col>
        <Col>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center", height: "100%" }}>
            <h2 style={{ color: "white", textAlign: "center" }}>Viinamayrakoira.fi</h2>
          </div>
        </Col>
        <Col>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center", height: "100%" }}>
            <a href="https://www.buymeacoffee.com/Otju" target="_blank" rel="noopener noreferrer"><Button variant="success">Lahjoita</Button></a>
          </div>
        </Col>
      </Row>
    </Container>
  </footer >
}

export default Footer