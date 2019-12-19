import React, { PureComponent } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { colors } from '../../../shared/styles/colors'
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
            <p className="intro">Volume: {payload[0].value}</p>
          </StyledTooltip>
        )
      }

      return null
    }

    const { data, reversed } = this.props
    return (
      <ComposedChart
        width={500}
        height={600}
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
        <YAxis dataKey="volume" />
        <Tooltip content={<CustomTooltip />} />

        <Legend />
        {/*<Bar dataKey="volume" barSize={20} fill="#413ea0" />*/}
        {/*<Bar dataKey="volume" fill={reversed ? colors.green : colors.red} />*/}
        <Line dataKey="volume" stroke={reversed ? colors.green : colors.red} />
      </ComposedChart>
    )
  }
}
