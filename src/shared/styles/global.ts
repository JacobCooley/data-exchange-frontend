import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto';
  }
  body {
    width: fit-content;
    min-width: 100%;
  }
  main {
    padding: 40px;
  }
  main > div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  a {
    text-decoration: none;
    color: ${colors.primary};
    font-weight: bolder;
    &:hover {
      color: ${colors.tertiary};
    }
  }
  .MuiSelect-root {
    min-width: 120px !important;
  }
`
