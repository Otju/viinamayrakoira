import React, { useState } from "react"
import DrinkSearchBox from './DrinkSearchBox'
import MiniDrinkCard from './MiniDrinkCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import HoverableDropDownText from './DrinksPage/SearchVariableMenu/HoverableDropDownText'
import { round } from '../utils'

const AddPortionDrink = ({ portionDrinks, setPortionDrinks }) => {

  const amounts = [
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

  const gambina = {
    description: "Punaruskea, makea, vermuttinen, giniarominen, katkeroinen",
    ean: "6412700240114",
    id: "319027alko",
    imageLink: "https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/319027/Gambina-muovipullo",
    link: "https://www.alko.fi/tuotteet/319027/",
    name: "Gambina muovipullo",
    percentage: 21,
    percentageIsGuess: null,
    portionAmount: 10.64,
    price: 9.99,
    pricePerLitre: 12.97,
    pricePerPortion: 0.94,
    producer: "Altia",
    productCode: "319027",
    size: 0.77,
    store: "alko",
    reviews: []
  }

  const [drink, setDrink] = useState(gambina)

  if (drink) {
    amounts.unshift({ name: "Koko juoma", amount: drink.size })
  }

  const [percentage, setPercentage] = useState(gambina.percentage)
  const [amount, setAmount] = useState(gambina.size)
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
    setDrink({
      name: "Oma juoma",
      imageLink: process.env.PUBLIC_URL + '/beer.svg',
      store: "alko"
    })
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <DrinkSearchBox handleClick={handleClick} />
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
        </div>
        {drink.name === "Oma juoma" ? null
          :
          <div style={{ width: "50%", display: "inline-block", verticalAlign: "top" }}>
            <MiniDrinkCard drink={drink}/>
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setPortionDrinks([...portionDrinks,
        {
          name: drink.name,
          imageLink: drink.imageLink,
          amount: `${selectedAmount.name} (${amount} l)`,
          portionAmount,
          price
        }])}>
          Lisää
          </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default AddPortionDrink