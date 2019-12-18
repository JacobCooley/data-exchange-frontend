import React, { useContext } from 'react'
import { Exchange } from '../shared/types'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AppContext from '../shared/contexts/app'

interface Props {
  exchange?: number
  setExchange: (exchange: number) => void
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

  const handleChange = (e: any) => {
    setExchange(e.target.value)
  }

  return (
    <>
      <FormControl>
        <InputLabel>Exchange</InputLabel>
        <SelectComponent
          value={exchange}
          onChange={handleChange}
        >
          {exchanges.map(exchange => {
            if (exchange.active && exchange.id) {
              return (
                <MenuItem key={exchange.id} value={exchange.id}>
                  {exchange.name}
                </MenuItem>
              )
            }
          })}
        </SelectComponent>
      </FormControl>
    </>
  )
}
export default ExchangeSelect
