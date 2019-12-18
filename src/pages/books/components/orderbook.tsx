import React, { useContext } from 'react'
import AppContext from '../../../shared/contexts/app'
import styled from 'styled-components'
import Chart from './chart'

const StyledOrderBook = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  h2 {
    text-align: center;
  }
  span {
    float: right;
  }
  > div > div {
    max-width: 400px;
  }
`

const OrderBook: React.FunctionComponent = () => {
  const context = useContext(AppContext)
  const { orderbook } = context
  const parseData = (data: number[][]) => {
    return data.map(item => {
      return { price: item[0], volume: item[1] }
    })
  }
  return (
    <>
      <StyledOrderBook>
        <div>
          <Chart reversed data={parseData(orderbook!.bids)} />
          <h2>Bids</h2>
          {orderbook &&
            orderbook.bids.map(bid => {
              return (
                <div key={bid[0]}>
                  {bid[0]} <span>{bid[1]}</span>
                </div>
              )
            })}
        </div>
        <div>
          <Chart data={parseData(orderbook!.asks)} />
          <h2>Asks</h2>
          {orderbook &&
            orderbook.asks.map(ask => {
              return (
                <div key={ask[0]}>
                  {ask[0]} <span>{ask[1]}</span>
                </div>
              )
            })}
        </div>
      </StyledOrderBook>
    </>
  )
}

export default OrderBook
