import { createGlobalStyle } from 'styled-components'
import { colors } from './colors'

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto';
  }
  main {
    padding: 40px;
    min-width: fit-content;
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
    min-width: 140px !important;
  }
`
