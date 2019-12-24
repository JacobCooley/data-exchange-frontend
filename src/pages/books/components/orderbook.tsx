import React, { useContext, useState } from 'react'
import AppContext from '../../../shared/contexts/app'
import styled from 'styled-components'
import Chart from './chart'
import { mergeArray, parseChartData } from '../../../shared/helper'
import { FlexCol } from '../../../shared/styles/styled'

const StyledSpreadData = styled(FlexCol)`
  font-size: 1.1em;
  align-items: flex-start;
  padding: 20px 0;
`

const StyledOrderBook = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  width: fit-content;
  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    + div {
      margin-left: 20px;
    }
  }
  h2 {
    text-align: center;
  }
  span {
    float: right;
  }
`

const StyledTable = styled.table<any>`
  padding: 40px;
  border: 1px solid #ccc;
  th,
  td {
    text-align: start;
    padding: 10px;
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

  const tableData = (data: any, reverse?: boolean) => {
    const sortedData = reverse ? data.slice(0).reverse() : data
    const numberOfExchanges = 2 + exchangeSymbols.length

    return (
      <StyledTable columns={numberOfExchanges}>
        <thead>
          <tr>
            <th>Price</th>
            {exchangeSymbols.map(exchange => {
              return <th key={exchange}>{exchange}</th>
            })}
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((item: any) => {
              return (
                <tr key={item.price}>
                  <td>{item.price}</td>
                  {exchangeSymbols.map(exchange => {
                    return item[exchange] ? (
                      <td key={item.price + exchange}>{item[exchange]}</td>
                    ) : (
                      <td key={item.price + exchange}>0</td>
                    )
                  })}
                  <td>{item.total}</td>
                </tr>
              )
            })}
        </tbody>
      </StyledTable>
    )
  }

  const spread = mergedAsks[0].price - mergedBids[mergedBids.length - 1].price
  return (
    <>
      <StyledSpreadData>
        <div>Spread: {spread}</div>
      </StyledSpreadData>
      <StyledOrderBook>
        <div>
          <Chart reversed exchangeSymbols={exchangeSymbols} data={mergedBids} />
          <h2>Bids</h2>
          {tableData(mergedBids, true)}
        </div>
        <div>
          <Chart exchangeSymbols={exchangeSymbols} data={mergedAsks} />
          <h2>Asks</h2>
          {tableData(mergedAsks)}
        </div>
      </StyledOrderBook>
    </>
  )
}

export default OrderBook
