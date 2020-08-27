import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react'
import { Field } from 'formik'
import Button from 'react-bootstrap/Button'
import HoverableDropDownText from './HoverableDropDownText'


const SortBySettings = ({ valuetypes, searchVariables, setFieldValue, handleSubmit }) => {

  const isDescending = searchVariables.sortByDescending ?? false

  const handleOrderChange = () => {
    setFieldValue("sortByDescending", !isDescending)
    handleSubmit()
  }

  const handleClick = (name) => {
    setFieldValue("sortByField", name)
    handleSubmit()
  }

  const currentlySelected = valuetypes.find(item => item.name === searchVariables.sortByField)
  const showName = currentlySelected ? currentlySelected.displayName : "annoshinta"
  valuetypes = valuetypes.filter(item => item.displayName !== showName)

  return (
    <div style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem", float: "right" }}>
      <Dropdown style={{ display: "inline-block" }}>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {showName}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {valuetypes.map(item => (
            <HoverableDropDownText key={item.name} handleClick={() => handleClick(item.name)} content={item.displayName}/>
          ))}
        </Dropdown.Menu>
      </Dropdown >
      <Button variant="dark" style={{ marginRight: "0.5rem" }} onClick={() => handleOrderChange()}>{isDescending ? "↑" : "↓"}</Button>
    </div >
  )
}

/*     
<Button variant="secondary" onClick={() => handleClick(item.name)}>{item.displayName}</Button>
<label>
<Field type="radio" name="sortByField" value={item.name} style={{ visibility: "hidden" }} />
{item.displayName}
</label>
*/

export default SortBySettings