import { TransferState } from './types'
import { TRANSFER_FAILURE, TRANSFER_REQUEST, TRANSFER_SUCCESS, TransferFailureAction, OPEN_TRANSFER_MODAL, CLOSE_TRANSFER_MODAL, OpenTransferModalAction, CloseTransferModalAction, TransferRequestAction, TransferSuccessAction } from './actions'

const INITIAL_STATE: TransferState = {
  isTransfered: false,
  isTransfering: false,
  isTransferSuccess: false,
  isOpen: false,
  error: null,
}

type TransferReducerAction = TransferRequestAction | TransferSuccessAction | TransferFailureAction | OpenTransferModalAction | CloseTransferModalAction

export function transferReducer(
  state: TransferState = INITIAL_STATE,
  action: TransferReducerAction
): TransferState {
  switch (action.type) {
    case TRANSFER_REQUEST: {
      return {
        ...state,
        isTransfering: true,
        error: null,
      }
    }
    case TRANSFER_SUCCESS: {
      return {
        ...state,
        isTransfered: true,
        isTransfering: false,
        isTransferSuccess: true, 
        isOpen: false,
        error: null,
      }
    }

    case TRANSFER_FAILURE: {
      const { error } = action.payload as TransferFailureAction['payload']
      return {
        ...state,
        isTransfered: false,
        isTransfering: false,
        error,
        isTransferSuccess: false,
      }
    }

    case OPEN_TRANSFER_MODAL: {
      return {
        ...state,
        isOpen: true,
        error: null,
      }
    }

    case CLOSE_TRANSFER_MODAL: {
      return {
        ...state,
        isOpen: false,
        error: null,
      }
    }

    default:
      return state
  }
}
