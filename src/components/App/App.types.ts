import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'
import { OpenTransferModalAction } from '../../modules/transfer/actions'

export type Props = {
  address: string,
  balance: string,
  isConnected: boolean
  isConnecting: boolean,
  isTransferSuccess: boolean,
  error: string | null
  onConnect: () => void
  onOpenTransferModal: () => void
}

export type MapStateProps = Pick<
  Props,
  'address' | 'balance' | 'isConnected' | 'isConnecting' | 'isTransferSuccess' | 'error'
>
export type MapDispatchProps = Pick<Props, 'onConnect' | 'onOpenTransferModal'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | OpenTransferModalAction | AnyAction>
