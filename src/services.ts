import axios from 'axios'
const server = process.env.SERVER

export const getExchanges = () => {
  return axios
    .get(`${server}/exchanges`)
    .then(async response => {
      return response.data
    })
    .catch(function(error) {
      return error
    })
}

export const getPairs = (exchange: string) => {
  return axios
    .get(`${server}/pairs/${exchange}`)
    .then(async response => {
      return response.data.result
    })
    .catch(function(error) {
      return error
    })
}

export const getBooks = (exchange: string, pair: string) => {
    return axios
        .get(`${server}/books/${exchange}/${pair}`)
        .then(async response => {
            return response.data.result
        })
        .catch(function(error) {
            return error
        })
}
