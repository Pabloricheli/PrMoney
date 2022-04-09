import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface TransactionsProps {
  id: string
  title: string
  amount: number
  category: string
  type: string
  createdAt: string
}

interface TransactionProviderProps {
  children: React.ReactNode
}

type TransactionsInputProps = Omit<TransactionsProps, 'id' | 'createdAt'>

interface ProviderProps {
  transactions: TransactionsProps[]
  createTransaction: (transaction: TransactionsInputProps) => Promise<void>
}

const TransactionsContext = createContext<ProviderProps>({} as ProviderProps)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  useEffect(() => {
    api
      .get('http://localhost:3000/api/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionsInputProps) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}
