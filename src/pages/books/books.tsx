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
import {getPairs} from "../../services";

const OrderBooks = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Books: NextPage<Context> = () => {
  const context = useContext(AppContext)
  const { setState, exchanges, pairs, orderbook } = context
  const [exchangeList, setExchangeList] = useState<Exchange[]>([exchanges[0]])
  const [pair, setPair] = useState<Partial<Pair>>({ id: 0 })

  // const updateExchange = (id: any) => {
  //   console.log('update', id)
  //   const exchangesById = exchanges.find(exchange => {
  //     return exchange.id === id
  //   })
  //   if (exchangeById) {
  //     const exchangeExists = exchangeList.find(exchange => {
  //       return exchange.id === exchangeById.id
  //     })
  //     const newExchangeList = !exchangeExists
  //       ? [...exchangeList, exchangeById]
  //       : exchangeList.filter(function( exchange ) {
  //         console.log('filter', exchange, id)
  //           return exchange.id !== exchangeById.id;
  //         })
  //     console.log("NEW", newExchangeList)
  //     setExchangeList(newExchangeList as Exchange[])
  //   }
  // }

  const exchangeIdList = exchangeList.map(exchange => {
    return exchange.id
  })
  const updatePair = async (id: number) => {
    const pairById = pairs.find(pair => {
      return pair.id === id
    })
    if (pairById) {
      setPair(pairById)
      //setState({ orderbook: await getBooks(exchangeList.symbol, pairById.pair) }) // GET ALL BOOKS
    }
  }

  const fetchPairs = async () => {
    const promisePairs = exchangeList.map(async exchange => {
      return getPairs(exchange.symbol)
    })

    const pairs = await Promise.all(promisePairs)
    const lowestSizedPair = pairs.reduce((acc, pair) => {
      if(acc && acc.length > pair.length){
        return pair
      }
    })
    console.log('low', lowestSizedPair)
    console.log('PAIRS', pairs)
    // const result = pairs.flat(1).reduce((acc, d): any => {
    //   console.log('d', d)
    //   const found = acc.find((a: any) => a.pair === d.pair);
    //   const value = { exchange: d.exchange };
    //   if (!found) {
    //     acc.push({pair: d.pair, data: [value]})
    //   }
    //   else {
    //     found.data.push(value)
    //   }
    //   return acc;
    // }, []) as any;

    // console.log('resss', result)
    // setState({ pairs })
  }

  useEffect(() => {
    // fetchPairs()
    setState({ orderbook: undefined })
  }, [exchangeList])

  return (
    <OrderBooks>
      <FlexRow>
        <ExchangeSelect exchange={exchangeIdList} setExchange={setExchangeList} />
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
