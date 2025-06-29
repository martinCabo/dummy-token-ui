// Transfer
export const TRANSFER_REQUEST = '[Request] Transfer'
export const TRANSFER_SUCCESS = '[Success] Transfer'
export const TRANSFER_FAILURE = '[Failure] Transfer'

// Modal
export const OPEN_TRANSFER_MODAL = '[Open] Transfer Modal'
export const CLOSE_TRANSFER_MODAL = '[Close] Transfer Modal'

export function transferRequest(amount: number, destination: string) {
  return {
    type: TRANSFER_REQUEST,
    payload: {
      amount,
      destination
    },
  }
}

export function transferSuccess() {
  return {
    type: TRANSFER_SUCCESS,
    payload: {
    },
  }
}

export function transferFailure(error: string) {
  return {
    type: TRANSFER_FAILURE,
    payload: {
      error,
    },
  }
}

export function openTransferModal() {
  return {
    type: OPEN_TRANSFER_MODAL,
    payload: {},
  }
}

export function closeTransferModal() {
  return {
    type: CLOSE_TRANSFER_MODAL,
    payload: {},
  }
}

export type TransferRequestAction = ReturnType<typeof transferRequest>
export type TransferSuccessAction = ReturnType<typeof transferSuccess>
export type TransferFailureAction = ReturnType<typeof transferFailure>
export type OpenTransferModalAction = ReturnType<typeof openTransferModal>
export type CloseTransferModalAction = ReturnType<typeof closeTransferModal>
