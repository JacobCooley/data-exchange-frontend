import React, { PureComponent } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from 'recharts'
import { coinColors, colors } from '../../../shared/styles/colors'
import styled from 'styled-components'
import { getRandomColor } from '../../../shared/helper'

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
    return (
      <AreaChart
        width={600}
        height={700}
        data={data}
        margin={{
          top: 50,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="price" reversed={reversed} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />

        <Legend />
        {/*<Bar dataKey="volume" barSize={20} fill="#413ea0" />*/}
        {/*<Line dataKey="volume" fill={reversed ? colors.green : colors.red} />*/}
        {exchangeSymbols.map((exchange, i) => {
          return (
            <Area
              key={i}
              type="monotone"
              dataKey={exchange}
              stackId="1"
              fill={coinColors[i]}
              stroke={coinColors[i]}
            />
          )
        })}
      </AreaChart>
    )
  }
}
