import * as React from 'react'
import styled from 'styled-components'
import { SyncLoader } from 'react-spinners'
import { colors } from '../shared/styles/colors'

type Props = {
  loading: boolean
}

const LoadingComponent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.02);
`

const Loading: React.FunctionComponent<Props> = ({ loading }) => {
  return (
    <>
      {loading && (
        <LoadingComponent>
          <SyncLoader size={15} color={colors.primary} loading={loading} />
        </LoadingComponent>
      )}
    </>
  )
}

export default Loading
