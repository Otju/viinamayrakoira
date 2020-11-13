import React from "react"
import { colors } from "../utils"

const Footer = () => {

  return <footer style={{ background: colors.darkGray, marginTop: 0 }}>
    <img src={process.env.PUBLIC_URL + "/doggo.svg"} style={{ height: "5rem" }} alt="viinamayrakoira.svg" />
  </footer>
}

export default Footer