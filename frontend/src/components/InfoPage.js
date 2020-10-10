import React from 'react'
import Container from 'react-bootstrap/Container'

const InfoPage = () => {

  return <Container>
    <h3>Lahjoitukset</h3>
    <Container>
      <h5>Kulut</h5>
      <Container>
        Palvelin → €<br />
        Sivuston aktiiviseen huoltoon ja ylläpitoon käytetty aika → €€ <br />
        Juomavalikoimaan tutustuminen täysin ammattimaisessa kontekstissa → €€€
      </Container>
      <h5>Tuotot</h5>
      <Container>
        Mainokset → -       (ei ole)<br />
        Käyttömaksu → -     (ei ole)
      </Container>
      <h5>Lopputulema</h5>
      <Container>
        Arvostan jokaista lahjoitusta. Halutessaan lahjoittaa voi tästä <b>LINKKI</b> (1€ lahjoitus auttaa jo paljon!)
      </Container>
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
      <p>
        <b>Annoslaskuri</b>-sivulla voit laskea kuinka suuren annosmäärän tiettyjen juomien ja määrien yhdistelmä tuottaa.<br />
        Voit myös laskea tuon annosmäärän vaikutuksen veresi alkoholin promillemäärään.
        Näät myös kuinka paljon nuo annokset alkoholia maksaisivat
    </p>
      <p><b>Tilastot</b>-sivulta löydät muutaman perustilaston juomien kaupoista ja kategorioista</p>
    </Container>
    <h3>Lähdekoodi</h3>
    <Container>Löytyy githubista: </Container>
  </Container >
}


export default InfoPage