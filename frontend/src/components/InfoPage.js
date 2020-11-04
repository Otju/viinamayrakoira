import React from 'react'
import Container from 'react-bootstrap/Container'

const InfoPage = () => {

  return <Container>
    <br />
    <h3>Lahjoitukset</h3>
    <Container>
      <p>Tämä nettisivu on täysin ilmainen, eikä sisällä mainoksia. </p>
      <p>Lahjoitusten avulla voin maksaa <strike>perjantaikaljat</strike> palvelinkustannukset ja käyttää sivuston kehittämiseen ja ylläpitoon enemmän aikaa.</p>
      <p><b>Tärkeintä kuitenkin on, että sivustosta on ihmisille hyötyä</b></p>
      <p>Kannattaa siis myös vinkata tätä tutuille ;)</p>
      <form action="https://www.paypal.com/donate" method="post" target="_blank">
        <input type="hidden" name="hosted_button_id" value="MQK9WRMSCG734" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_FI/i/scr/pixel.gif" width="1" height="1" />
      </form>
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
        Voit myös laskea tuon annosmäärän vaikutuksen veresi alkoholin promillemäärään.
        Näät myös kuinka paljon nuo annokset alkoholia maksaisivat
    </p>
      <p><b>Tilastot</b>-sivulta löydät muutaman perustilaston juomien kaupoista ja kategorioista</p>
    </Container>
  </Container >
}

/*
    <h3>Lähdekoodi</h3>
    <Container>Löytyy githubista</Container>
*/


export default InfoPage