import React from 'react'
import { useQuery } from '@apollo/client'
import { STATISTICS } from '../queries'
import { categories, stores } from '../utils'
import Spinner from 'react-bootstrap/Spinner'
import Chart from './Chart'


const StatisticsPage = () => {

  const result = useQuery(STATISTICS)

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  const statistics = result.data.statistics

  return <div>
    <h1>Tilastoja</h1>
    <h3>Juomia yhteensä: {statistics.drinkCount}</h3>
    <Chart rawData={statistics.drinksPerCategory} field={"count"} colorObjectArray={categories} name="Juomien määrä kategorioittain" type="pie"></Chart>
    <Chart rawData={statistics.drinksPerStore} field={"count"} colorObjectArray={stores} name="Juomien määrä kaupoittain" type="pie"></Chart>
    <Chart rawData={statistics.drinksPerStore} field={"avgPrice"} colorObjectArray={stores} name="Keskimääräinen hinta kaupoittain" type="bar"></Chart>
  </div>
}

export default StatisticsPage