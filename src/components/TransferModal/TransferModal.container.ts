import { connect } from 'react-redux'
import { closeTransferModal, transferRequest } from '../../modules/transfer/actions'
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
  onClose: () => dispatch(closeTransferModal()),
  onTransfer: (amount: number, destination: string) => dispatch(transferRequest(amount, destination))
})

export default connect(mapState, mapDispatch)(TransferModal)
