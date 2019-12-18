import React, { useContext } from 'react'
import { Exchange } from '../shared/types'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AppContext from '../shared/contexts/app'

interface Props {
  exchange?: Exchange
  setExchange: (exchange: Exchange) => void
}

const SelectComponent = styled(Select)`
  margin-top: 20px;
`

const ExchangeSelect: React.FunctionComponent<Props> = ({
  exchange,
  setExchange
}) => {
  const context = useContext(AppContext)
  const { exchanges } = context
  return (
    <>
      <FormControl>
        <InputLabel>Exchange</InputLabel>
        <SelectComponent
          value={exchange}
          onChange={(e: any) => setExchange(e.target.value)}
        >
          <MenuItem value="Select Exchange" disabled>
            Select Exchange
          </MenuItem>
          {exchanges.map(exchange => {
            if (exchange.active) {
              return <MenuItem key={exchange.id} value={exchange.id}>{exchange.name}</MenuItem>
            }
          })}
        </SelectComponent>
      </FormControl>
    </>
  )
}
export default ExchangeSelect
