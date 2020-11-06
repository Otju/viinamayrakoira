import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from "react-router-dom"
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('viinamayrakoira-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const uri = process.env.NODE_ENV === "development" ? "http://localhost:4000/" : 'https://ehdkr0eakj.execute-api.eu-central-1.amazonaws.com/prod/graphql'

const httpLink = new HttpLink({ uri })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)