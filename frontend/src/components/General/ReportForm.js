import React, { useState, useEffect } from 'react'
import HoverableDropDownText from '../DrinksPage/SearchVariableMenu/HoverableDropDownText'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'


const ReportForm = ({ drinkId, defaultReportTypeIndex }) => {

  const reportTypes = [
    {
      name: "Virhe juoman tiedoissa",
      subject: `VIRHE JUOMAN TIEDOISSA: Juoman "${drinkId}" tiedoissa on virhe`,
      placeholder: "Kerro mielellään missä tiedossa virhe oli (esim. hinta)",
      extraInfo: "Pienet (esim. 0.1-0.2 yksikön vaihtelut määrissä ja litrahinnoissa johtuvat esim. panteista, ja niistä ei tarvitse ilmoittaa)"
    },
    {
      name: "Bugi sivustossa",
      subject: "BUGI: ",
      placeholder: "Kerro mahdollisimman tarkasti, mitä tehdessä/millä sivulla bugi tapahtui ja saatko sen toistettua",
    },
    {
      name: "Ominaisuustoivomus sivustolle",
      subject: "OMINAISUUSTOIVOMUS: ",
      placeholder: "Kerro niin yksityiskohtaisesti kun haluat, mitä uusia ominaisuuksia toivoisit sivustolta tulevaisuudessa"
    },
    {
      name: "Muu viesti",
      subject: "MUU VIESTI: ",
      placeholder: "Kerro vaikka päivästäsi :)"
    }
  ]
  const index = defaultReportTypeIndex || 0
  const [reportType, setReportType] = useState(reportTypes[index])
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    setSubject(reportType.subject)
  }, [reportType])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return <div>
    <Dropdown >
      <Dropdown.Toggle variant="dark">
        Viestin tyyppi: {reportType.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {reportTypes.map(item => (
          <HoverableDropDownText key={item.name} handleClick={() => setReportType(item)}>{item.name}</HoverableDropDownText>
        ))}
      </Dropdown.Menu>
    </Dropdown >
    <br />
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Otsikko</Form.Label>
        <Form.Control type="text" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Otsikko"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Sisältö</Form.Label>
        <Form.Control as="textarea" rows={10} value={body} onChange={(event) => setBody(event.target.value)} placeholder={reportType.placeholder}></Form.Control>
        <Form.Text className="text-muted">{reportType.extraInfo}</Form.Text>
      </Form.Group>
      <Form.Control type="submit" value="Lähetä viesti"></Form.Control>
    </Form>
  </div>
}

export default ReportForm