import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface IHeaderProps {
  onOpenModal: () => void
}

export function Header({ onOpenModal }: IHeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button onClick={onOpenModal} type="button">
          Nova transação
        </button>
      </Content>
    </Container>
  )
}
