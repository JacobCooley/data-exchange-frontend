import axios from 'axios'
const server = 'http://localhost:3000'

export const getExchanges = () => {
  return axios
    .get(`${server}/exchanges`)
    .then(async response => {
      return response.data
    })
    .catch(function(error) {
        console.log('error', error)
      return error
    })
}

export const getPairs = () => {
  return axios
    .get(`${server}/pairs`)
    .then(async response => {
      return response.data.result
    })
    .catch(function(error) {
      return error
    })
}
