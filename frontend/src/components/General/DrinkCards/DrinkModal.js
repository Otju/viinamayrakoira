import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link, useHistory } from "react-router-dom"
import SingleDrink from './SingleDrink'

const DrinkModal = ({ drink, show, setShow, standalone }) => {

  const history = useHistory()

  const handleClose = () => {
    if (standalone) {
      history.push("/best")
    } else {
      setShow(false)
    }
  }

  return <Modal size="lg" show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{drink.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {standalone ? null : <Link to={`drink/${drink.id}`}>viinamayrakoira.fi/drink/{drink.id}</Link>}
      <SingleDrink drink={drink}/>
    </Modal.Body>
  </Modal>
}

export default DrinkModal