export interface Exchange {
  id: number
  name: string
  symbol: string
  route: string
  active: boolean
}

export interface Pair {
  id: number
  exchange: string
  pair: string
  active: boolean
  route: string
}

export interface OrderBook {
  bids: number[][]
  asks: number[][]
}
