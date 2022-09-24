import React from "react"
import Container from "react-bootstrap/Container"

const InfoPage = () => {
  return (
    <Container>
      <h3>Sivut</h3>
      <Container>
        <b>Parhaat</b>-sivulta löydät juomat, joilla on:
        <ul>
          <li>alin annoshinta (halvin känni)</li>
          <li>parhaat maku-arvostelut</li>
          <li>parhaat hinta-laatu-arvostelut </li>
        </ul>
        <p>
          Yleisesti sekä kauppakohtaisesti. Jos haluat nähdä lisää juomia samalla haulla,{" "}
          <b>paina juoman yläpuolella olevaa kultaista koiraa</b>
        </p>
        <p>
          <b>Juomat</b>-sivulta löydät kaikki juomat. Käytä hyväksi lukuisia etsintäkriteerejä
        </p>
        <p>
          <b>Baarit</b>-sivu ei ole vielä valmis (tulossa pian™)
        </p>
        <p>
          <b>Vertaa</b>-sivulla voit vertailla kahta juomaa keskenään
        </p>
        <p>
          <b>Annoslaskuri</b>-sivulla voit laskea kuinka suuren annosmäärän tiettyjen juomien ja
          määrien yhdistelmä tuottaa.
          <br />
          Voit myös aiheuttaa alkoholin aiheuttaman promillemäärän. Näät myös kuinka paljon nuo
          annokset alkoholia maksaisivat
        </p>
        <p>
          <b>Tilastot</b>-sivulta löydät muutaman perustilaston juomien kaupoista ja kategorioista
        </p>
      </Container>
      <br />
    </Container>
  )
}

export default InfoPage
