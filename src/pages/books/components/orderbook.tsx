import React, { useContext } from 'react'
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
  }
  h2 {
    text-align: center;
  }
  span {
    float: right;
  }
`

const StyledTable = styled.div<any>`
  padding: 40px;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 2px;
  border: 1px solid #ccc;
  > div {
    display: contents;
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
    {
      const sortedData = reverse ? data.slice(0).reverse() : data
      const exchangeList = orderbook
        ? orderbook.map(book => {
            return book.exchange
          })
        : []
      const numberOfExchanges = 2 + exchangeList.length

      return (
        <StyledTable columns={numberOfExchanges}>
          <div>
            <div>Price</div>
            {exchangeList.map(exchange => {
              return <div key={exchange}>{exchange}</div>
            })}
            <div>Total Volume</div>
          </div>
          {sortedData &&
            sortedData.map((item: any) => {
              return (
                <div key={item.price}>
                  <div>{item.price}</div>
                  {exchangeList &&
                    exchangeList.map(exchange => {
                      return item[exchange] ? (
                        <div>{item[exchange]}</div>
                      ) : (
                        <div />
                      )
                    })}
                  <div>{item.total}</div>
                </div>
              )
            })}
        </StyledTable>
      )
    }
  }

  const spread = mergedBids[0].price - mergedAsks[mergedAsks.length - 1].price
  return (
    <>
      <StyledSpreadData>
        <div>Spread: {spread}</div>
      </StyledSpreadData>
      <StyledOrderBook>
        <div>
          <Chart exchangeSymbols={exchangeSymbols} reversed data={mergedBids} />
          <h2>Bids</h2>
          {tableData(mergedBids)}
        </div>
        <div>
          <Chart exchangeSymbols={exchangeSymbols} reversed data={mergedAsks} />
          <h2>Asks</h2>
          {tableData(mergedAsks, true)}
        </div>
      </StyledOrderBook>
    </>
  )
}

export default OrderBook
