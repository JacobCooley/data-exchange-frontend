import React, { useContext } from 'react'
import { Pair } from '../shared/types'
import styled from 'styled-components'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AppContext from '../shared/contexts/app'

interface Props {
  pair?: number
  setPair: (pair: number) => void
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
          value={pair}
          onChange={(e: any) => setPair(e.target.value)}
        >
          <MenuItem key={0} value={0}>
            Click to see pairs
          </MenuItem>
          {!!pairs &&
            pairs.map((pair: any) => {
              return (
                <MenuItem key={pair.id} value={pair.id}>
                  {pair.pair}
                </MenuItem>
              )
            })}
        </SelectComponent>
      </FormControl>
    </>
  )
}

export default PairsSelect
