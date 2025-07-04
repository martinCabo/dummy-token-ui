import React from 'react'
import { Center, Footer, Navbar, Page} from 'decentraland-ui'
import { Props } from './App.types'
import ConnectWallet from '../ConnectWallet'
import WalletDashboard from '../WalletDashboard'
import './App.css'

const App: React.FC<Props> = ({ 
  isConnected
}) => {
  return (
    <>
      <Navbar activePage="Wallet" />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <ConnectWallet />
          ) : (
            <WalletDashboard />
          )}
        </Center>
      </Page>
      <Footer />
    </>
  )
}

export default App
