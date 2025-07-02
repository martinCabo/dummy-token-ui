import { RootState } from '../types'

export const getState = (state: RootState) => state?.wallet
export const getAddress = (state: RootState) => getState(state)?.address || ''
export const isConnected = (state: RootState) => !!getAddress(state)
export const isConnecting = (state: RootState) => getState(state)?.isConnecting ?? false
export const getError = (state: RootState) => getState(state)?.error ?? null
export const getBalance = (state: RootState) => getState(state)?.balance || ''
