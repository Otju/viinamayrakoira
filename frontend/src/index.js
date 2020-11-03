import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from "react-router-dom"


const uri = process.env.NODE_ENV === "development" ? "http://localhost:4000/" : 'https://ehdkr0eakj.execute-api.eu-central-1.amazonaws.com/prod/graphql'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)