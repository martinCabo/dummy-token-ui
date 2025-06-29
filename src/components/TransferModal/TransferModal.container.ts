import { connect } from 'react-redux'
import { connectWalletRequest } from '../../modules/wallet/actions'
import { isTransfered, isTransfering, isOpen, getError } from '../../modules/transfer/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './TransferModal.types'
import TransferModal from './TransferModal'

const mapState = (state: RootState): MapStateProps => ({
  isTransfered: isTransfered(state),
  isTransfering: isTransfering(state),
  isOpen: isOpen(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect(mapState, mapDispatch)(TransferModal)
