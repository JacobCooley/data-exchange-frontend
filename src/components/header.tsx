import Link from 'next/link'
import * as React from 'react'
import styled from 'styled-components'

type Props = {
  router?: any
}

const HeaderComponent = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 2rem;
`

const Header: React.FunctionComponent<Props> = ({ router }) => {
  return (
    <HeaderComponent>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/books">
        <a>Order Books</a>
      </Link>
    </HeaderComponent>
  )
}

export default Header
