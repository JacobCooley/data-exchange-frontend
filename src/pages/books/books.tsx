import React, { useContext, useEffect, useState } from 'react'
import ExchangeSelect from '../../components/exchange-select'
import { Exchange, Pair } from '../../shared/types'
import PairsSelect from '../../components/pairs-select'
import styled from 'styled-components'
import { getBooks, getPairs } from '../../services'
import AppContext from '../../shared/contexts/app'
import { FlexRow } from '../../shared/styles/styled'
import { withRouter } from 'next/router'
import Router from 'next/router'
import { NextPage, NextPageContext } from 'next'
import OrderBook from './components/orderbook'

const OrderBooks = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Books: NextPage<Context> = ({
  router: {
    query: { symbol }
  }
}) => {
  const context = useContext(AppContext)
  const { setState, exchanges, pairs, orderbook } = context
  const [exchange, setExchange] = useState<Exchange>(exchanges[0])
  const [pair, setPair] = useState<Partial<Pair>>({ id: 0 })

  const updateUrlAndExchange = (id: number) => {
    const exchangeById = exchanges.find(exchange => {
      return exchange.id === id
    })
    if (exchangeById) {
      Router.push({
        pathname: '/books',
        query: { symbol: exchangeById.symbol }
      })
      setExchange(exchangeById)
    }
  }

  const updatePair = async (id: number) => {
    const pairById = pairs.find(pair => {
      return pair.id === id
    })
    if (pairById) {
      setPair(pairById)
      setState({ orderbook: await getBooks(exchange.symbol, pairById.pair) })
    }
  }

  useEffect(() => {
    if (!!symbol) {
      const exchangeFound = exchanges.find(exchange => {
        return exchange.symbol === symbol
      })
      if (exchangeFound) {
        setExchange(exchangeFound)
      }
    }
  }, [symbol])

  const fetchPairs = async () => {
    setState({ pairs: await getPairs(exchange.symbol) })
  }

  useEffect(() => {
    fetchPairs()
    setState({ orderbook: undefined })
  }, [exchange])

  return (
    <OrderBooks>
      <FlexRow>
        <ExchangeSelect
          exchange={exchange.id}
          setExchange={updateUrlAndExchange}
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
