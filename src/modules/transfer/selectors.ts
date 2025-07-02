import { RootState } from '../types'

export const getTransferState = (state: RootState) => state?.transfer
export const isTransfered = (state: RootState) => getTransferState(state)?.isTransfered ?? false
export const isTransfering = (state: RootState) => getTransferState(state)?.isTransfering ?? false
export const isOpen = (state: RootState) => getTransferState(state)?.isOpen ?? false
export const getError = (state: RootState) => getTransferState(state)?.error ?? null
export const isTransferSuccess = (state: RootState) => getTransferState(state)?.isTransferSuccess ?? false
