import React, { setGlobal } from 'reactn'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from "react-router-dom"


const uri = process.env.NODE_ENV === "development" ? "http://localhost:4000/" : 'https://viinamayrakoira-backend.herokuapp.com/'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri })
})

setGlobal({
  queries: []
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)