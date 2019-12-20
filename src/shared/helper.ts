export const parseChartData = (data: number[][], exchange: string) => {
  return data.map(item => {
    return { price: item[0], [exchange]: item[1] }
  })
}

export const mergeArray = (array: any, property: string) => {
  let output: any = []
  array.flat(1).forEach(function(item: any) {
    const existing = output.filter(function(v: any, i: any) {
      return v[property] == item[property]
    })
    if (existing.length) {
      const existingIndex = output.indexOf(existing[0])
      output[existingIndex] = { ...output[existingIndex], ...item }
    } else {
      output.push(item)
    }
  })
  return output.sort((a: any, b: any) => (a[property] < b[property] ? 1 : -1))
}
