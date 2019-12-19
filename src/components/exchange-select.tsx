import React, { useContext } from 'react'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AppContext from '../shared/contexts/app'
import Chip from '@material-ui/core/Chip'
import { Input } from '@material-ui/core'
import { MenuProps } from '@material-ui/core/Menu/Menu'

interface Props {
  exchange?: any[]
  setExchange: (exchange: any) => void
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
    const ids = e.target.value
    const exchangesById = exchanges.filter(exchange => {
      return ids.indexOf(exchange.id) !== -1
    })
    setExchange(exchangesById)
  }

  return (
    <>
      <FormControl>
        <InputLabel>Exchange</InputLabel>
        <SelectComponent multiple value={exchange} onChange={handleChange}>
          {exchanges.map(exchange => {
            if (exchange.active && exchange.id && exchange.name) {
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
