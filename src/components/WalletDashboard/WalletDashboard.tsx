import React from 'react'
import { Card, Header, Button, Message } from 'decentraland-ui'
import { Props } from './WalletDashboard.types'
import { TransferModal } from '../TransferModal'
import './WalletDashboard.css'

const WalletDashboard: React.FC<Props> = ({ 
  address, 
  balance, 
  isTransferSuccess, 
  onOpenTransferModal 
}) => {
  return (
    <div className="wallet-dashboard">
      <Card>
        <Header>Wallet</Header>
        <p>
          <strong>Address:</strong>&nbsp;
          {address.slice(0, 6) + '...' + address.slice(-4)}
        </p>
        <p>
          <strong>Balance:</strong>&nbsp;
          {balance}&nbsp;
        </p>
        <Button primary onClick={onOpenTransferModal}>
          Transfer Tokens
        </Button>
        {isTransferSuccess && (
          <Message 
            success 
            content={'The transfer was completed successfully'} 
            header={'Transfer success'} 
          />
        )}
      </Card>
      <TransferModal />
    </div>
  )
}

export default WalletDashboard 