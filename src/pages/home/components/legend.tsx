import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../shared/styles/colors'
import { FlexRow } from '../../../shared/styles/styled'

const StyledLegend = styled(FlexRow)<any>`
  margin-top: 20px;
  > div {
    display: flex;
    align-items: center;
    &:before {
      content: '';
      display: inline-block;
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }
  > div:first-child:before {
    background-color: ${colors.green};
  }
  > div:nth-child(2):before {
    background-color: ${colors.red};
  }
`

const Legend: React.FunctionComponent = () => {
  return (
    <StyledLegend>
      <div>Active</div>
      <div>Inactive</div>
    </StyledLegend>
  )
}

export default Legend
