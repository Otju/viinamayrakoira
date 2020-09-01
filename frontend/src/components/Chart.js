import React from 'react'
import { capitalizeFirst } from '../utils'
import { VictoryPie, VictoryTooltip, VictoryBar } from "victory"

const Chart = ({ rawData, field, colorObjectArray, name, type }) => {
  const data = rawData.concat().sort((a, b) => b[field] - a[field])
    .map(item => {
      const categoryObject = colorObjectArray.find(category => category.name === item.group)
      return {
        x: item.group,
        y: item[field],
        label: `${capitalizeFirst(item.group).replace(/ /g, "\n")}\n${item[field]}`,
        color: categoryObject && categoryObject.color ? categoryObject.color : "#7D1713"
      }
    })

  const labelComponent = <VictoryTooltip width={500} renderInPortal={true} />
  const style = { data: { fill: data => data.datum.color } }
  const events = [{
    target: "data",
    eventHandlers: {
      onMouseOver: () => {
        return [
          {
            target: "data",
            mutation: () => ({ style: { fill: "gold", opacity: 0.5 } })
          }, {
            target: "labels",
            mutation: () => ({ active: true })
          }
        ];
      },
      onMouseOut: () => {
        return [
          {
            target: "data",
            mutation: () => { }
          }, {
            target: "labels",
            mutation: () => ({ active: false })
          }
        ];
      }
    }
  }]
  let chart
  switch (type) {
    case "pie":
      chart = <VictoryPie {...{ labelComponent, style, events, data }} />
      break
    case "bar":
      chart = <VictoryBar barRatio={1} {...{ labelComponent, style, events, data }} />
      break
    default:
      console.log("Missing chart type")
      break;
  }
  return (
    <div style={{ width: "30rem", display: "inline-block", border: "solid", borderColor: "#c4bcbc", margin: "1rem" }}>
      <h4 style={{ textAlign: "center" }}>{name}</h4>
      {chart}
    </div>
  )
}

export default Chart