import React, { useContext } from 'react'
import AppContext from '../../shared/contexts/app'
import styled from 'styled-components'
import { Grid } from '../../shared/styles/styled'
import { colors } from '../../shared/styles/colors'
import { Exchange } from '../../shared/types'
import Link from 'next/link'

const StyledExchange = styled.div<any>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: ${props => (props.active ? colors.green : colors.red)};
  > div {
    padding: 5px;
    text-align: center;
  }
`

const Home: React.FunctionComponent = () => {
  const context = useContext(AppContext)
  const { exchanges } = context

  return (
    <div>
      <h1>Here are the supported exchanges!</h1>
      <Grid>
        {exchanges.map(exchange => {
          return (
            <Link key={exchange.id} href={`/books`}>
              <StyledExchange active={exchange.active} key={exchange.id}>
                <div>{exchange.name}</div>
              </StyledExchange>
            </Link>
          )
        })}
      </Grid>
    </div>
  )
}

export default Home
