import React from 'react'
import { useQuery } from '@apollo/client'
import { STATISTICS } from '../../queries'
import { categories, stores } from '../../utils'
import Spinner from 'react-bootstrap/Spinner'
import Chart from './Chart'

const StatisticsPage = () => {

  const result = useQuery(STATISTICS)

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  const statistics = result.data.statistics

  const withOutUselessCategories = statistics.drinksPerCategory.filter(item => item.group !== "alkoholittomat" && item.group !== "ei tietoa")
  const withConnectedGroups = statistics.drinksPerStoreAndCategory
    .map(item => ({ ...item, group: `${item.groups.group1}\n${item.groups.group2}` }))
    .filter(item => !item.group.includes("alkoholittomat") && !item.group.includes("ei tietoa"))

  return <div>
    <h1>Tilastoja</h1>
    <h3>Juomia yhteensä: {statistics.drinkCount}</h3>
    <Chart rawData={statistics.drinksPerCategory} field={"count"} colorObjectArray={categories} name="Juomien määrä kategorioittain" type="pie"></Chart>
    <Chart rawData={statistics.drinksPerStore} field={"count"} colorObjectArray={stores} name="Juomien määrä kaupoittain" type="pie"></Chart>
    <Chart rawData={withOutUselessCategories} field={"avgPricePerPortion"} colorObjectArray={categories} name="Keskimääräinen annoshinta kategorioittain" type="bar" unit="€/annos"></Chart>
    <Chart rawData={statistics.drinksPerStore} field={"avgPricePerPortion"} colorObjectArray={stores} name="Keskimääräinen annoshinta kaupoittain" type="bar" unit="€/annos"></Chart>
  </div>

  //<Chart rawData={withConnectedGroups} field={"avgPricePerPortion"} colorObjectArray={stores} name="Keskimääräinen annoshinta kaupoittain/kategorioittain" type="bar" unit="€/annos" width={"62rem"}></Chart>
}

export default StatisticsPage