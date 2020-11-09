import React from "react"
import { capitalizeFirst, colors, useWindowDimensions, round } from "../../utils"
import { VictoryPie, VictoryTooltip, VictoryBar, VictoryContainer, VictoryChart } from "victory"
const Chart = ({ rawData, field, colorObjectArray, name, type, unit, width, defaultColor, dontSort, showPercentage, useAxis }) => {

  const { customTreshold } = useWindowDimensions(800)

  unit = unit ?? ""
  width = customTreshold ? "90%" : "45%"

  let data = rawData.concat()
  if (!dontSort) {
    data = data.sort((a, b) => b[field] - a[field])
  }

  const wholeLength = data.reduce((acc, cur) => acc + cur[field], 0)

  data = data.map(item => {
    let categoryObject
    if (colorObjectArray) {
      categoryObject = !item.groups ?
        colorObjectArray.find(category => category.name === item.group)
        : colorObjectArray.find(category => item.groups.group1 === category.name)
    }

    const value = showPercentage ? round(item[field] / wholeLength)*100 : item[field]
    unit = showPercentage ? "%" : unit
    return {
      x: item.group,
      y: value,
      label: `${capitalizeFirst(item.group).replace(/ /g, "\n")}\n${value}${unit}`,
      color: categoryObject && categoryObject.color ? categoryObject.color : defaultColor || "black"
    }
  })

  const labelComponent = <VictoryTooltip width={500} renderInPortal={true} />
  const style = {
    data:
    {
      fill: data => data.datum.hasBorder ? data.datum.color : data.datum.color,
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
        ]
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
        ]
      }
    }
  }]
  let chart
  const containerComponent = <VictoryContainer style={{ touchAction: "auto" }} />
  switch (type) {
  case "pie":
    chart = <VictoryPie {...{ labelComponent, style, events, data, containerComponent }} />
    break
  case "bar":
    chart = <VictoryBar barRatio={1} {...{ labelComponent, style, events, data, containerComponent }} />
    if (useAxis) {
      chart = <VictoryChart domain={{ x: [0, 11] }}>{chart}</VictoryChart>
    }
    break
  default:
    console.log("Missing chart type")
    break
  }
  return (
    <div style={{ width, display: "inline-block", border: "solid", borderColor: colors.lightGray, marginTop: "1rem", marginLeft: "1.25%", marginRight: "1.25%" }}>
      <h4 style={{ textAlign: "center" }}>{name}</h4>
      {chart}
    </div>
  )
}

export default Chart