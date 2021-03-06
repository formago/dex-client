// @flow
import tokenPairData from '../../../jsons/tokenPairData.json'
import orders from '../../../jsons/orders.json'
import trades from '../../../jsons/trades.json'
import orderBookData from '../../../jsons/orderBookData.json'
import { BACKEND_URL } from '../../../config/url'
import { parseJSONToFixed, parseOrders, parseTrades, parseOrderBookData } from '../../../utils/parsers'
import fetch from 'isomorphic-fetch'

const request = (endpoint, options) => {
  return fetch(`http://${BACKEND_URL}${endpoint}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'content-type': 'application/json'
    },
    mode: 'cors',
    ...options
  })
}

export const fetchTokens = async () => {
  const response = await request(`/tokens`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const data = await response.json()
  return data
}

export const fetchToken = async (address: string) => {
  const response = await request(`/tokens/${address}`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const data = await response.json()
  return data
}

export const fetchPairs = async () => {
  const response = await request(`/pairs`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const data = await response.json()
  return data
}

export const fetchPair = async (baseToken: string, quoteToken: string) => {
  const response = await request(`/pair?baseToken=${baseToken}&quoteToken=${quoteToken}`)
  console.log(response.status)
  const data = await response.json()
  console.log(data)

  if (response.status === 400) {
    throw new Error(data.error)
  }

  if (response.status !== 200) {
    console.log(data.error)
    throw new Error('Server Error')
  }

  return data
}

export const fetchBalance = async (address: string) => {
  const response = await request(`/balances/${address}`)

  if (response.status !== 200) {
    throw new Error('Error')
  }

  const { data } = await response.json()
  return data
}

export const fetchOrders = async (address: string) => {
  const response = await request(`/orders?address=${address}`)
  const data = await response.json()

  if (response.status === 400) {
    throw new Error(data.error)
  }

  if (response.status !== 200) {
    console.log(data)
    throw new Error('Server error')
  }

  return data
}

export const fetchOrderHistory = async (address: string) => {
  const response = await request(`/orders/history?address=${address}`)
  console.log(response.status)
  const data = await response.json()

  if (response.status === 400) {
    throw new Error(data.error)
  }

  if (response.status !== 200) {
    console.log(data)
    throw new Error('Server error')
  }

  return data
}

export const fetchOrderPositions = async (address: string) => {
  const response = await request(`/orders/positions?address=${address}`)
  console.log(response.status)
  const data = await response.json()

  if (response.status === 400) {
    throw new Error(data.error)
  }

  if (response.status !== 200) {
    console.log(data)
    throw new Error('Server error')
  }

  return data
}

export const fetchTokenPairTrades = async (baseToken: string, quoteToken: string) => {
  const response = await request(`/trades/pair?baseToken=${baseToken}&quoteToken=${quoteToken}`)
  const data = await response.json()

  if (response.status === 400) {
    throw new Error(data.error)
  }

  if (response.status !== 200) {
    console.log(data)
    throw new Error('Server Error')
  }

  return data
}

export const fetchAddressTrades = async (address: string) => {
  const response = await request(`/trades?address=${address}`)
  const data = await response.json()

  if (response.status === 400) {
    throw new Error(data.error)
  }

  if (response.status !== 200) {
    console.log(data)
    throw new Error('Server Error')
  }

  return data
}

export const getTokenPairData = async () => {
  const data = parseJSONToFixed(tokenPairData)
  return data
}

export const getOrders = async () => {
  const data = parseOrders(orders)
  return data
}

export const getTrades = async () => {
  const data = parseTrades(trades)
  return data
}

export const getOrderBookData = async () => {
  const data = parseOrderBookData(orderBookData)
  return data
}

// const main = async () => {
//   let tokens = await fetchAddressTrades("0xE8E84ee367BC63ddB38d3D01bCCEF106c194dc47")
//   console.log(tokens)
// }

// main()
