import { connect } from 'react-redux'
import { connectWalletRequest } from '../../modules/wallet/actions'
import { openTransferModal } from '../../modules/transfer/actions'
import {
  getAddress,
  getBalance,
  getError,
  isConnected,
  isConnecting,
} from '../../modules/wallet/selectors'
import { isTransferSuccess } from '../../modules/transfer/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types'
import App from './App'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  isTransferSuccess: isTransferSuccess(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onOpenTransferModal: () => dispatch(openTransferModal())
})

export default connect(mapState, mapDispatch)(App)
