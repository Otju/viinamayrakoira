import React from "react"
import Container from "react-bootstrap/Container"
import ReportForm from "./General/ReportForm"
import Button from "react-bootstrap/esm/Button"

const InfoPage = () => {

  return <Container>
    <br />
    <h3>Lahjoitukset</h3>
    <Container>
      <p>Tämä nettisivu on täysin ilmainen, eikä sisällä mainoksia. </p>
      <p>Lahjoitusten avulla voin mm. maksaa palvelinkustannukset ja käyttää sivuston kehittämiseen ja ylläpitoon enemmän aikaa.</p>
      <p><b>Tärkeintä kuitenkin on, että sivustosta on käyttäjille hyötyä</b></p>
      <p>Kannattaa siis myös vinkata tätä tutuille ;)</p>
      <a href="https://www.buymeacoffee.com/Otju" target="_blank" rel="noopener noreferrer"><Button variant="success">Lahjoita</Button></a>
    </Container>
    <br />
    <h3>Sivut</h3>
    <Container>
      <b>Parhaat</b>-sivulta löydät juomat, joilla on:
      <ul>
        <li>alin annoshinta (halvin känni)</li>
        <li>parhaat maku-arvostelut</li>
        <li>parhaat hinta-laatu-arvostelut </li>
      </ul>
      <p>Yleisesti sekä kauppakohtaisesti. Jos haluat nähdä lisää juomia samalla haulla, <b>paina juoman yläpuolella olevaa kultaista koiraa</b></p>
      <p><b>Juomat</b>-sivulta löydät kaikki juomat. Käytä hyväksi lukuisia etsintäkriteerejä</p>
      <p><b>Baarit</b>-sivu ei ole vielä valmis (tulossa pian)</p>
      <p><b>Vertaa</b>-sivulla voit vertailla kahta juomaa keskenään</p>
      <p>
        <b>Annoslaskuri</b>-sivulla voit laskea kuinka suuren annosmäärän tiettyjen juomien ja määrien yhdistelmä tuottaa.<br />
        Voit myös aiheuttaa alkoholin aiheuttaman promillemäärän.
        Näät myös kuinka paljon nuo annokset alkoholia maksaisivat
      </p>
      <p><b>Tilastot</b>-sivulta löydät muutaman perustilaston juomien kaupoista ja kategorioista</p>
    </Container><br />
    <h3>Lähetä viestiä kehittäjälle</h3><br />
    <ReportForm defaultReportTypeIndex={2} />
  </Container >
}


export default InfoPage