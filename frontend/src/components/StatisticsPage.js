import React from 'react'
import { useQuery } from '@apollo/client'
import { STATISTICS } from '../queries'
import { categories, capitalizeFirst } from '../utils'
import Spinner from 'react-bootstrap/Spinner'
import { VictoryPie, VictoryTooltip } from "victory"


const StatisticsPage = () => {

  const result = useQuery(STATISTICS)

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  const statistics = result.data.statistics

  const data = statistics.drinksPerCategory.concat().sort((a, b) => b.count - a.count)
    .map(item => {
      const categoryObject = categories.find(category => category.name === item.group)
      return {
        x: item.group,
        y: item.count,
        label: `${capitalizeFirst(item.group).replace(/ /g, "\n")}\n${item.count}`,
        color: categoryObject ? categoryObject.color : "#7D1713"
      }
    })
  console.log(data)


  return <div>
    <h1>Tilastoja</h1>
    Juomia yhteensä: {statistics.drinkCount}
    <div style={{ width: "30rem" }}>
      <VictoryPie
        labelComponent={<VictoryTooltip width={500} renderInPortal={true} />}
        data={data}
        colorScale={data.map(item => item.color)}
      />
    </div>
  </div>
}

export default StatisticsPage