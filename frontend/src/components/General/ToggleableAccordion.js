import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle'

const CustomToggle = ({ eventKey }) => {
  const [selected, setSelected] = useState(false)

  const handleClick = useAccordionToggle(eventKey, () => setSelected(!selected))

  return <div style={{ display: "flex", justifyContent: "center", alignitems: "center" }}>
    <Button variant={selected ? "light" : "dark"} onClick={handleClick}>
      tarkempi haku
    </Button>
  </div>
}

const ToggleableAccordion = ({ content }) => {

  return <Accordion>
    <CustomToggle eventKey="0" />
    <Accordion.Collapse eventKey="0">
      {content}
    </Accordion.Collapse>
  </Accordion>
}

export default ToggleableAccordion