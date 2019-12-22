import React, { useContext, useEffect, useState } from 'react'
import ExchangeSelect from '../../components/exchange-select'
import { Exchange, Pair } from '../../shared/types'
import PairsSelect from '../../components/pairs-select'
import styled from 'styled-components'
import AppContext from '../../shared/contexts/app'
import { FlexRow } from '../../shared/styles/styled'
import { withRouter } from 'next/router'
import { NextPage, NextPageContext } from 'next'
import OrderBook from './components/orderbook'
import { getBooks, getPairs } from '../../services'

const OrderBooks = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Books: NextPage<Context> = () => {
  const context = useContext(AppContext)
  const { setState, pairs, orderbook } = context
  const [exchangeList, setExchangeList] = useState<Exchange[]>([])
  const [pair, setPair] = useState<Partial<Pair>>({ id: 0 })

  const updatePair = async (id: number) => {
    const pairById = pairs.find(pair => {
      return pair.id === id
    })
    if (pairById) {
      setPair(pairById)
      const promiseBooks = pairById.data.map(async pair => {
        return {
          exchange: pair.exchange,
          data: await getBooks(pair.exchange, pair.pair)
        }
      })
      if (promiseBooks) {
        const orderbook = await Promise.all(promiseBooks)
        setState({ orderbook })
      }
    }
  }

  const fetchPairs = async () => {
    const promisePairs =
      exchangeList &&
      exchangeList.map(async exchange => {
        return getPairs(exchange.symbol)
      })
    if (!!promisePairs) {
      const pairs = await Promise.all(promisePairs)

      const result = pairs.flat(1).reduce((acc, d): any => {
        const found = acc.find((a: any) => a.pair === d.pair)
        const value = { ...d }
        if (!found) {
          acc.push({ pair: d.pair, id: d.id, data: [value] })
        } else {
          found.data.push(value)
        }
        return acc
      }, []) as any

      const multiExchangedPairs = result.filter(
        (pair: any) => pair.data.length === pairs.length
      )
      setState({ pairs: multiExchangedPairs })
    }
  }

  useEffect(() => {
    // Reset data on updated exchanges
    setPair({ id: 0 })
    fetchPairs()
    setState({ orderbook: undefined })
  }, [exchangeList])

  const exchangeIdList =
    exchangeList &&
    exchangeList.map(exchange => {
      return exchange.id
    })

  return (
    <OrderBooks>
      <FlexRow>
        <ExchangeSelect
          exchange={exchangeIdList}
          setExchange={setExchangeList}
        />
        <PairsSelect pair={pair.id} setPair={updatePair} />
      </FlexRow>
      {orderbook && <OrderBook />}
    </OrderBooks>
  )
}
interface Context extends NextPageContext {
  router: {
    query: {
      symbol: string
    }
  }
}

export default withRouter(Books as any)
