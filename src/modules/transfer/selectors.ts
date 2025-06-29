import { RootState } from '../types'

export const getTransferState = (state: RootState) => state.transfer
export const isTransfered = (state: RootState) => getTransferState(state).isTransfered
export const isTransfering = (state: RootState) => getTransferState(state).isTransfering
export const isOpen = (state: RootState) => getTransferState(state).isOpen
export const getError = (state: RootState) => getTransferState(state).error
