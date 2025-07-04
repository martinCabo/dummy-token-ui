import { connect } from 'react-redux'
import { openTransferModal } from '../../modules/transfer/actions'
import { getAddress, getBalance } from '../../modules/wallet/selectors'
import { isTransfered } from '../../modules/transfer/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './WalletDashboard.types'
import WalletDashboard from './WalletDashboard'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  isTransferSuccess: isTransfered(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onOpenTransferModal: () => dispatch(openTransferModal())
})

export default connect(mapState, mapDispatch)(WalletDashboard) 