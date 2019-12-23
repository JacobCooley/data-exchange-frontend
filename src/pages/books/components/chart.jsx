import React, { PureComponent } from 'react'
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from 'recharts'
import { coinColors } from '../../../shared/styles/colors'
import styled from 'styled-components'

export default class Chart extends PureComponent {
  render() {
    const StyledTooltip = styled.div`
      background-color: white;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid black;
    `
    function CustomTooltip({ payload, label, active }) {
      if (active) {
        return (
          <StyledTooltip className="custom-tooltip">
            <p className="label">Price: {label}</p>
            <div className="intro">
              {payload &&
                payload.map(exchange => {
                  return (
                    <div key={Math.random()}>
                      {exchange.name ? exchange.name : ''}: {exchange.value}
                    </div>
                  )
                })}
            </div>
          </StyledTooltip>
        )
      }
      return null
    }

    const { data, reversed, exchangeSymbols } = this.props

    const dataWithAggregatedVolumes = () => {
      //Aggregate and save for depth chart
      let newDataArray = []
      const sortedArray = reversed
        ? data.sort((a, b) => (a['price'] < b['price'] ? 1 : -1))
        : data
      sortedArray.forEach((item, index) => {
        let newItem = { ...item }
        exchangeSymbols.forEach(property => {
          const previousPropertyValue =
            index > 0 && newDataArray[index - 1][property]
              ? newDataArray[index - 1][property]
              : 0
          const updatedProperty = item[property]
            ? item[property] + previousPropertyValue
            : previousPropertyValue
          newItem[property] =
            property === 'price' ? item[property] : updatedProperty
        })
        newDataArray.push(newItem)
      })
      return newDataArray
    }

    return (
      <AreaChart
        width={600}
        height={700}
        data={dataWithAggregatedVolumes()}
        margin={{
          top: 50,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis reversed={reversed} dataKey="price" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {exchangeSymbols.map((exchange, i) => {
          return (
            <Area
              key={i}
              type="monotone"
              dataKey={exchange}
              stackId="1"
              fill={coinColors[i]}
              stroke={coinColors[i]}
              strokeWidth={0.1}
            />
          )
        })}
      </AreaChart>
    )
  }
}
