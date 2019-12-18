import React, { useEffect, useReducer } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from '../shared/styles/global'
import Header from '../components/header'
import AppContext, { AppInitialValues } from '../shared/contexts/app'
import { getExchanges, getPairs } from '../services'

const AppComponent: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useReducer(
    (currentState, newState) => ({ ...currentState, ...newState }),
    AppInitialValues
  )

  const fetchExchanges = async () => {
    setState({ exchanges: await getExchanges() })
  }

  const fetchPairs = async () => {
    setState({ pairs: await getPairs() })
  }

  useEffect(() => {
    fetchExchanges()
  }, [])

  useEffect(() => {
    fetchPairs()
  }, [state.exchanges])

  console.log(state)
  return (
    <AppContext.Provider value={{ ...state, setState }}>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </AppContext.Provider>
  )
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Exchange Data Tracker</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <AppComponent>
          <Component {...pageProps} />
        </AppComponent>
      </>
    )
  }
}

export default MyApp
