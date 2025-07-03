import { connect } from 'react-redux'
import { closeTransferModal, transferRequest } from '../../modules/transfer/actions'
import { isTransfered, isTransfering, isOpen, getError } from '../../modules/transfer/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './TransferModal.types'
import { validateTransferForm } from '../../utils/validations'
import TransferModal from './TransferModal'

const mapState = (state: RootState): MapStateProps => ({
  isTransfered: isTransfered(state),
  isTransfering: isTransfering(state),
  isOpen: isOpen(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onClose: () => dispatch(closeTransferModal()),
  onTransfer: async (amount: number, destination: string) => {
    try {
      // Final validation before transferring
      const validation = validateTransferForm(amount.toString(), destination)
      if (!validation.isValid) {
        throw new Error(validation.errorMessage)
      }
      
      dispatch(transferRequest(amount, destination))
    } catch (error) {
      console.error('Transfer validation error:', error)
    }
  }
})

export default connect(mapState, mapDispatch)(TransferModal)
