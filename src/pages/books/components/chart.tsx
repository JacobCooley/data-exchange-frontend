import React, { PureComponent } from 'react'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import {colors} from "../../../shared/styles/colors";

// const data = [
//     {
//         name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490,
//     },
//     {
//         name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590,
//     },
//     {
//         name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350,
//     },
//     {
//         name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480,
//     },
//     {
//         name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460,
//     },
//     {
//         name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380,
//     },
// ];

export default class Chart extends PureComponent<any> {
  render() {
    const { data, reversed } = this.props
    console.log('data', data)
    return (
      <ComposedChart
        width={500}
        height={400}
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
        <YAxis dataKey="volume"/>
        <Tooltip />
        <Legend />
        {/*<Bar dataKey="volume" barSize={20} fill="#413ea0" />*/}
        <Line dataKey="volume" stroke={reversed ? colors.green : colors.red} />
      </ComposedChart>
    )
  }
}