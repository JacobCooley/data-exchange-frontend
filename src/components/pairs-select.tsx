import React, { useContext } from 'react'
import { Exchange } from '../shared/types'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AppContext from '../shared/contexts/app'

interface Props {
  pair?: Exchange
  setPair: (exchange: Exchange) => void
}

const SelectComponent = styled(Select)`
  margin-top: 20px;
`

const PairsSelect: React.FunctionComponent<Props> = ({ pair, setPair }) => {
  const context = useContext(AppContext)
  const { pairs } = context
  return (
    <>
      <FormControl>
        <InputLabel>Pair</InputLabel>
        <SelectComponent
          value={pairs}
          onChange={(e: any) => setPair(e.target.value)}
        >
          <MenuItem value="Select Exchange" disabled>
            Select Pair
          </MenuItem>
          {pairs.map((pair: any) => {
            if (pair.active) {
              return (
                <MenuItem key={pair.id} value={pair.id}>
                  {pair.name}
                </MenuItem>
              )
            }
          })}
        </SelectComponent>
      </FormControl>
    </>
  )
}
export default PairsSelect
