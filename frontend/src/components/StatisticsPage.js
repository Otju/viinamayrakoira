import React from 'react'
import { useQuery } from '@apollo/client'
import { STATISTICS } from '../queries'
import { categories, stores, capitalizeFirst } from '../utils'
import Spinner from 'react-bootstrap/Spinner'
import { VictoryPie, VictoryTooltip } from "victory"


const StatisticsPage = () => {

  const result = useQuery(STATISTICS)

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  const statistics = result.data.statistics

  const piechartFromData = (rawData, colorObjectArray, name) => {
    const data = rawData.concat().sort((a, b) => b.count - a.count)
      .map(item => {
        const categoryObject = colorObjectArray.find(category => category.name === item.group)
        return {
          x: item.group,
          y: item.count,
          label: `${capitalizeFirst(item.group).replace(/ /g, "\n")}\n${item.count}`,
          color: categoryObject ? categoryObject.color : "#7D1713"
        }
      })
    return (
      <div style={{ width: "30rem", display: "inline-block" }}>
        <h4>{name}</h4>
        <VictoryPie
          labelComponent={<VictoryTooltip width={500} renderInPortal={true} />}
          data={data}
          colorScale={data.map(item => item.color)}
          events={[{
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: "data",
                    mutation: () => ({ style: { fill: "gold", opacity: 0.5} })
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
          }]}
        />
      </div>
    )
  }


  return <div>
    <h1>Tilastoja</h1>
    <h3>Juomia yhteensä: {statistics.drinkCount}</h3>
    {piechartFromData(statistics.drinksPerCategory, categories, "Juomien määrä kategorioittain")}
    {piechartFromData(statistics.drinksPerStore, stores, "Juomien määrä kaupoittain")}
  </div>
}

export default StatisticsPage