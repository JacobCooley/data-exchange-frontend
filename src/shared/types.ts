export interface Exchange {
  id: number
  name: string
  symbol: string
  route: string
  active: boolean
}

export interface Pair {
  id: number
  pair: string
  data: {
    id: number
    pair: string
    exchange: string
    active: boolean
    route: string
  }[]
}

export interface OrderBook {
  exchange: string
  data: {
    bids: number[][]
    asks: number[][]
  }
}
