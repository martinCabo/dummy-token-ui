// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'

// Update Balance
export const UPDATE_BALANCE = '[Update] Balance'

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {},
  }
}

export function connectWalletSuccess(address: string, balance: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      address,
      balance,
    },
  }
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: {
      error,
    },
  }
}

export function updateBalance(newBalance: string) {
  return {
    type: UPDATE_BALANCE,
    payload: {
      balance: newBalance,
    },
  }
}

export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>
export type UpdateBalanceAction = ReturnType<typeof updateBalance>
