import React, { useState } from 'react'
import ExchangeSelect from '../../components/exchange-select'
import { Exchange } from '../../shared/types'
import PairsSelect from '../../components/pairs-select'
import styled from 'styled-components'

const OrderBooks = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Books: React.FunctionComponent = () => {
  const [exchange, setExchange] = useState<Exchange | undefined>()
  const [pair, setPair] = useState<Exchange | undefined>()
  return (
    <OrderBooks>
      <ExchangeSelect exchange={exchange} setExchange={setExchange} />
      <PairsSelect pair={pair} setPair={setPair} />
    </OrderBooks>
  )
}

export default Books
