import React from 'react'
import { capitalizeFirst, colors } from '../../utils'
import { VictoryPie, VictoryTooltip, VictoryBar } from "victory"

const Chart = ({ rawData, field, colorObjectArray, name, type, unit, width }) => {

  unit = unit ?? ""
  width = width ?? "30rem"

  const data = rawData.concat().sort((a, b) => b[field] - a[field])
    .map(item => {
      const categoryObject = !item.groups ?
        colorObjectArray.find(category => category.name === item.group)
        : colorObjectArray.find(category => item.groups.group1 === category.name)

      return {
        x: item.group,
        y: item[field],
        label: `${capitalizeFirst(item.group).replace(/ /g, "\n")}\n${item[field]}${unit}`,
        color: categoryObject && categoryObject.color ? categoryObject.color : "black"
      }
    })

  const labelComponent = <VictoryTooltip width={500} renderInPortal={true} />
  const style = {
    data:
    {
      fill: data => data.datum.hasBorder ? data.datum.color : data.datum.color,
      /*stroke: data => data.datum.hasBorder ? data.datum.color[1] : null, 
      strokeWidth: 1*/
    }
  }
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
    <div style={{ width, display: "inline-block", border: "solid", borderColor: colors.lightGray, margin: "1rem" }}>
      <h4 style={{ textAlign: "center" }}>{name}</h4>
      {chart}
    </div>
  )
}

export default Chart