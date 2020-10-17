import React, { useState, useEffect } from "react"
import DrinkSearchBox from '../General/DrinkSearchBox'
import MiniDrinkCard from '../General/DrinkCards/MiniDrinkCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert'
import HoverableDropDownText from '../DrinksPage/SearchVariableMenu/HoverableDropDownText'
import { round } from '../../utils'

const AddPortionDrink = ({ portionDrinks, setPortionDrinks }) => {

  let amounts = [
    {
      name: "Oma määrä"
    },
    {
      name: "Shotti",
      amount: 0.04
    },
    {
      name: "Tölkillinen",
      amount: 0.33
    },
    {
      name: "Lasillinen",
      amount: 0.2
    },
    {
      name: "Tuoppi",
      amount: 0.5
    },
    {
      name: "Pint",
      amount: 0.473
    },
    {
      name: "Viinilasi",
      amount: 0.16
    },
  ]

  const customDrink = {
    name: "Oma juoma",
    imageLink: process.env.PUBLIC_URL + '/beer.svg',
    store: "alko"
  }

  const [drink, setDrink] = useState(customDrink)

  if (drink.name !== "Oma juoma") {
    amounts.unshift({ name: "Koko juoma", amount: drink.size })
  } else {
    amounts = amounts.filter(item => item.name !== "Koko juoma")
  }

  const [percentage, setPercentage] = useState("5")
  const [amount, setAmount] = useState("0.33")
  const [selectedAmount, setSelectedAmount] = useState(amounts[0])

  const portionAmount = round((amount * ((percentage) / (100))) / 0.015201419)

  const handleSelectedAmount = (item) => {
    setSelectedAmount(item)
    if (item.amount) {
      setAmount(item.amount)
    } else {
      setAmount(0)
    }
  }

  const handleOwnDrink = () => {
    setDrink(customDrink)
    setPercentage(0)
    setAmount(0)
    setSelectedAmount({ name: "Oma määrä" })
  }

  const handleClick = (drink) => {
    setDrink(drink)
    setPercentage(drink.percentage)
    setAmount(drink.size)
    if (selectedAmount.name === "Koko juoma") {
      setSelectedAmount({ name: "Koko juoma", amount: drink.size })
    }
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [additionNotification, setAdditionNotification] = useState(null)

  const handlePortionDrinkAdd = () => {
    setPortionDrinks([...portionDrinks,
    {
      name: drink.name,
      imageLink: drink.imageLink,
      amount: `${selectedAmount.name} (${amount} l)`,
      portionAmount,
      price
    }])
    setAdditionNotification(
      <Alert variant="danger">
        Lisätty:<br />
        {drink.name}<br />
        {selectedAmount.name}
      </Alert>)
  }

  useEffect(() => {
    if (additionNotification) {
      setTimeout(() => setAdditionNotification(null), 1500)
    }
  }, [additionNotification])

  const price = Number.isNaN(amount * drink.pricePerLitre) ? null : round(amount * drink.pricePerLitre)

  return <div>
    <Button variant="success" onClick={handleShow}>
      Lisää juoma
      </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lisää juoma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <DrinkSearchBox handleClick={handleClick}/>
          tai <Button onClick={handleOwnDrink} variant="dark">Oma juoma</Button>
        </div>
        <div style={{ width: "50%", display: "inline-block", verticalAlign: "top", marginTop: "1rem" }}>
          {drink.name !== "Oma juoma"
            ? null
            : <label> {"prosentit "}
              <Form.Control type="number" min="0" max="100" step="0.1" style={{ display: "inline-block", width: "5rem" }} value={percentage}
                onChange={(event) => setPercentage(event.target.value)} />
              <div className="input-group-append" style={{ display: "inline-block" }}>
                <span className="input-group-text">{"%"}</span>
              </div>
            </label>}
          <br />
          <div style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem" }}>
            <Dropdown style={{ display: "inline-block" }}>
              <Dropdown.Toggle variant="dark">
                määrä
        </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.ItemText style={{ width: "max-content" }}>
                  <b>{selectedAmount.name} {selectedAmount.amount ? `(${selectedAmount.amount} l)` : null} </b>
                </Dropdown.ItemText>
                <Dropdown.Divider />
                {amounts.map(item => (
                  item.name === selectedAmount.name ? null :
                    <HoverableDropDownText key={item.name} handleClick={() => handleSelectedAmount(item)}>
                      {item.name} {item.amount ? `(${item.amount} l)` : null}</HoverableDropDownText>
                ))}
              </Dropdown.Menu>
            </Dropdown >
          </div >
          {selectedAmount.name === "Oma määrä" ? <>
            <Form.Control step="0.01" min="0" style={{ display: "inline-block", width: "5rem" }} type="number" placeholder="l" value={amount}
              onChange={(event) => setAmount(event.target.value)} />
            <div className="input-group-append" style={{ display: "inline-block" }}>
              <span className="input-group-text">{"l"}</span>
            </div>
          </>
            : `${selectedAmount.name} (${selectedAmount.amount} l)`
          }
          <br />
          <b>{portionAmount} annosta</b><br />
          <b>{price}€</b>
          {additionNotification ? additionNotification : null}
        </div>
        {drink.name === "Oma juoma" ? null
          :
          <div style={{ width: "50%", display: "inline-block", verticalAlign: "top" }}>
            <MiniDrinkCard drink={drink} />
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handlePortionDrinkAdd()}>
          Lisää
          </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default AddPortionDrink