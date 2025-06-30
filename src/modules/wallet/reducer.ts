import { AnyAction } from 'redux'
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  UpdateBalanceAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  UPDATE_BALANCE,
} from './actions'
import { WalletState } from './types'

const INITIAL_STATE: WalletState = {
  address: null,
  balance: null,
  isConnecting: false,
  isTransferActive: true,
  isTransferSuccess: false,
  error: null,
}

export function walletReducer(
  state: WalletState = INITIAL_STATE,
  action: AnyAction
): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      }
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address, balance } =
        action.payload as ConnectWalletSuccessAction['payload']
      return {
        ...state,
        isConnecting: false,
        address,
        balance,
        error: null,
      }
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return {
        ...state,
        isConnecting: false,
        error,
      }
    }

    case UPDATE_BALANCE: {
      const { balance } = action.payload as UpdateBalanceAction['payload']
      return {
        ...state,
        balance,
      }
    }

    default:
      return state
  }
}
