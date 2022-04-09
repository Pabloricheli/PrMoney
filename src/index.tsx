import React from 'react'
import ReactDOM from 'react-dom'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-02-06 17:00:32')
        },
        {
          id: 2,
          title: 'Freelance de App',
          type: 'deposit',
          category: 'Dev',
          amount: 12000,
          createdAt: new Date('2022-02-05 08:20:02')
        },
        {
          id: 4,
          title: 'Pagamentos',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2022-02-05 14:01:53')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api'
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
