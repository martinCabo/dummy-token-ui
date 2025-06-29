// Transfer
export const TRANSFER_REQUEST = '[Request] Transfer'
export const TRANSFER_SUCCESS = '[Success] Transfer'
export const TRANSFER_FAILURE = '[Failure] Transfer'

export function transferRequest() {
  return {
    type: TRANSFER_REQUEST,
    payload: {},
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

export type TransferRequestAction = ReturnType<typeof transferRequest>
export type TransferSuccessAction = ReturnType<typeof transferSuccess>
export type TransferFailureAction = ReturnType<typeof transferFailure>
