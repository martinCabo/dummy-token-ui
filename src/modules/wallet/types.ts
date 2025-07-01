export type WalletState = {
  address: string | null,
  balance: string | null,
  isConnecting: boolean
  isTransferActive: boolean,
  isTransferSuccess: boolean,
  error: string | null
}
