import { AnyAction } from 'redux'

import { TransferState } from './types'
import { TRANSFER_FAILURE, TRANSFER_REQUEST, TRANSFER_SUCCESS, TransferFailureAction, OPEN_TRANSFER_MODAL, CLOSE_TRANSFER_MODAL } from './actions'

const INITIAL_STATE: TransferState = {
  isTransfered: false,
  isTransfering: false,
  isOpen: false,
  error: null,
}

export function transferReducer(
  state: TransferState = INITIAL_STATE,
  action: AnyAction
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
