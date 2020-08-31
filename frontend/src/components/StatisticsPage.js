import React from 'react'
import { useQuery } from '@apollo/client'
import { STATISTICS } from '../queries'
import Spinner from 'react-bootstrap/Spinner'


const StatisticsPage = () => {

  const result = useQuery(STATISTICS)


  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  return <div>
    <h1>Tilastoja</h1>

  </div>
}

export default StatisticsPage