import React, { useState, useEffect } from "react"
import HoverableDropDownText from "../DrinksPage/SearchVariableMenu/HoverableDropDownText"
import Dropdown from "react-bootstrap/Dropdown"
import Form from "react-bootstrap/Form"
import { useField } from "../../utils"
import { useMutation } from "@apollo/client"
import { REPORT } from "../../queries"
import AlertBox from "./AlertBox"


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

  const subject = useField("text", "Otsikko")
  const content = useField("textarea", "sisältö", `${reportType.placeholder}\n\nJos haluat vastauksen viestiisi, niin kirjoita viestiin myös sähköpostiosoitteesi`, reportType.extraInfo)
  const [alert, setAlert] = useState("")

  useEffect(() => {
    subject.set(reportType.subject)
  }, [reportType]) //eslint-disable-line

  const [report] = useMutation(REPORT, {
    onError: (error) => {
      setAlert({ message: error.message, variant: "danger" })
    },
    onCompleted: () => {
      setAlert({ message: "Viesti on lähetetty eteenpäin kehittäjälle. Kiitos!", variant: "success", duration: 5000 })
      setReportType(reportTypes[0])
      content.set("")
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    report({ variables: { content: content.value, subject: subject.value } })
  }

  return <div>
    <p>Valitse viestin tyyppi</p>
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
      {subject.field}
      {content.field}
      <Form.Control type="submit" value="Lähetä viesti"></Form.Control>
    </Form>
    <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} duration={alert?.duration} />
    <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
      <b>Voit myös lähettää viestiä suoraan osoitteeseen <a href="mailto:contact@viinamayrakoira.fi" target="_blank" rel="noopener noreferrer">contact@viinamayrakoira.fi</a></b>
    </div>
  </div>
}

export default ReportForm