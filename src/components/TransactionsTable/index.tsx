import { useTransactions } from '../../hooks/useTransactions'
import { Container } from './styles'

interface TransactionsProps {
  id: string
  title: string
  amount: number
  category: string
  type: string
  createdAt: string
}

export function TransactionsTable() {
  const { transactions } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td className={item.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.amount)}
              </td>
              <td>{item.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(item.createdAt)
                )}
              </td>
            </tr>
          ))}
          {/* <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$12.000,00</td>
            <td>Desenvolvimento</td>
            <td>20/02/2021</td>
          </tr> */}
        </tbody>
      </table>
    </Container>
  )
}
