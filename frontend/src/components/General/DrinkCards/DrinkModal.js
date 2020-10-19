import React from 'react'
import Modal from 'react-bootstrap/Modal'
import SingleDrink from './SingleDrink'

const DrinkModal = ({ drink, show, setShow, refetch }) => {

  const handleClose = () => setShow(false)

  return <Modal size="lg" show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{drink.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <SingleDrink drink={drink} refetch={refetch} />
    </Modal.Body>
  </Modal>
}

export default DrinkModal