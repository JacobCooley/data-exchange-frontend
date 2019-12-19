import { createContext } from 'react'
import { object } from 'prop-types'
import {Exchange, OrderBook, Pair} from '../types'

interface ContextProps {
  exchanges: Exchange[]
  pairs: Pair[]
  orderbook?: OrderBook[]
  setState(update: object): object
}

export const AppInitialValues = {
  exchanges: [],
  pairs: [],
  setState: () => object
}

const AppContext = createContext<ContextProps>(AppInitialValues)

export default AppContext
