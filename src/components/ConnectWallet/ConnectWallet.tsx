import React from 'react'
import { Button } from 'decentraland-ui'
import { Props } from './ConnectWallet.types'
import './ConnectWallet.css'

const ConnectWallet: React.FC<Props> = ({ isConnecting, error, onConnect }) => {
  return (
    <div className="connect-wallet">
      <Button primary onClick={onConnect} loading={isConnecting}>
        Connect
      </Button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default ConnectWallet 