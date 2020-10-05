import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { capitalizeFirst } from '../utils'
import Hoverable from './Hoverable'
import DrinkModal from './DrinkModal'

const MiniDrinkCard = ({ drink, refetch }) => {

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)

    return (
        <Card>
            <div style={{ height: "100%" }} >
                <Hoverable zIndex={2} handleClick={handleShow}>
                    <Card.Body style={{ background: "white", zIndex: "-1", position: "relative", height: "100%" }}>
                        <Card.Title style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: "3rem" }}>
                            {drink.name}
                        </Card.Title>
                        <img src={drink.imageLink} alt={drink.imageLink}
                            style={{
                                maxWidth: "100%", maxHeight: "18rem", width: "auto",
                                marginRight: "auto", display: "block", marginLeft: "auto", height: "auto", mixBlendMode: "multiply"
                            }} />
                    </Card.Body>
                </Hoverable>
            </div>
            <DrinkModal {...{ setShow, show, drink, refetch }} />
        </Card >
    )
}

export default MiniDrinkCard