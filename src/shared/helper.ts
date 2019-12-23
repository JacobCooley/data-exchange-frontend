export const parseChartData = (data: number[][], exchange: string) => {
  return data.map((item, index) => {
    return { price: item[0], [exchange]: item[1] }
  })
}

export const mergeArray = (array: any, property: string) => {
  let output: any = []
  // Merge all in array by property
  array.flat(1).forEach(function(item: any) {
    const existing = output.filter(function(v: any, i: any) {
      return v[property] === item[property]
    })
    if (existing.length) {
      const existingIndex = output.indexOf(existing[0])
      output[existingIndex] = { ...output[existingIndex], ...item }
    } else {
      output.push(item)
    }
  })
  // Then sort
  const sortedArray = output.sort((a: any, b: any) => (a[property] < b[property] ? -1 : 1))
  // Then total all except by main property
  const totaledArray = sortedArray.map((item: any) => {
    const total = Object.keys(item).reduce((acc, currentProperty) => {
      return currentProperty !== property ? acc + item[currentProperty] : acc
    }, 0)
    return {...item, total}
  })
  return totaledArray
}
