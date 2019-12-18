import React, { useContext } from 'react'
import AppContext from '../../shared/contexts/app'
import styled from 'styled-components'
import { Grid } from '../../shared/styles/styled'
import { colors } from '../../shared/styles/colors'

const Exchange = styled.div<any>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.active ? colors.green : colors.red)};
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
            <Exchange active={exchange.active} key={exchange.id}>
              {exchange.name}
            </Exchange>
          )
        })}
      </Grid>
    </div>
  )
}

export default Home
