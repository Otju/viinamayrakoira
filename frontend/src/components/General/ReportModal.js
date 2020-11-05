import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReportForm from './ReportForm'


const ReportModal = ({ drinkId, defaultReportTypeIndex }) => {

  const [show, setShow] = useState(false)

  return <>
    <Button variant="danger" onClick={() => setShow(true)}>Ilmoita virheestä</Button>
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Lähetä viestiä kehittäjälle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReportForm drinkId={drinkId} defaultReportTypeIndex={defaultReportTypeIndex}/>
      </Modal.Body>
    </Modal >
  </>
}

export default ReportModal