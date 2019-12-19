import React, { useContext } from 'react'
import AppContext from '../../../shared/contexts/app'
import styled from 'styled-components'
import Chart from './chart'
import { mergeArray, parseChartData } from '../../../shared/helper'

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
`

const OrderBook: React.FunctionComponent = () => {
  const context = useContext(AppContext)
  const { orderbook } = context

  const bidData = orderbook!
    .map(book => {
      return parseChartData(book.data.bids, book.exchange)
    })
    .flat(1)

  const askData = orderbook!
    .map(book => {
      return parseChartData(book.data.asks, book.exchange)
    })
    .flat(1)

  const exchangeSymbols = orderbook!.map(book => {
    return book.exchange
  })

  const mergedBids = mergeArray(bidData, 'price')
  const mergedAsks = mergeArray(askData, 'price')

  const tableData = (data: any) => {
    {
      return (
        data &&
        data.map((item: any) => {
          const volumeSum = Object.keys(item).reduce(
            (sum, key) => sum + parseFloat(item[key] || 0),
            0
          )
          return (
            <div key={item.price}>
              {item.price} <span>{volumeSum}</span>
            </div>
          )
        })
      )
    }
  }

  return (
    <>
      <StyledOrderBook>
        <div>
          <Chart exchangeSymbols={exchangeSymbols} reversed data={mergedBids} />
          <h2>Bids</h2>
          {tableData(mergedBids)}
        </div>
        <div>
          <Chart exchangeSymbols={exchangeSymbols} reversed data={mergedAsks} />
          <h2>Asks</h2>
          {tableData(mergedAsks)}
        </div>
      </StyledOrderBook>
    </>
  )
}

export default OrderBook
