import { connect } from 'react-redux'
import { connectWalletRequest } from '../../modules/wallet/actions'
import { isConnecting, getError } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './ConnectWallet.types'
import ConnectWallet from './ConnectWallet'

const mapState = (state: RootState): MapStateProps => ({
  isConnecting: isConnecting(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect(mapState, mapDispatch)(ConnectWallet) 