import React from 'react'
import { Button, Card, Center, Footer, Header, Navbar, Page } from 'decentraland-ui'
import { Props } from './App.types'
import './App.css'
import { TransferModal } from '../TransferModal'

const App: React.FC<Props> = ({ 
  address, 
  balance, 
  isConnected, 
  isConnecting, 
  error, 
  onConnect
}) => {
  return (
    <>
      <Navbar activePage="Wallet" />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
            <>
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
            </Card>
            <TransferModal/>
            </>
          )}
        </Center>
      </Page>
      <Footer />
    </>
  )
}

export default App
