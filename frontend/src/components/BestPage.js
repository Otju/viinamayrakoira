import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import  Spinner from 'react-bootstrap/Spinner'

const BestPage = () => {
const result = useQuery(ALL_DRINKS, { variables: {first: 50} })

if (!result.data || result.loading) {
  return <Spinner animation="border" />
}

  return <div>
    <h1>Bestpage</h1>
  </div>
}


export default BestPage