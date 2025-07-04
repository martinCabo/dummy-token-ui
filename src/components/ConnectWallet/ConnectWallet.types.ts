import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  isConnecting: boolean
  error: string | null
  onConnect: () => void
}

export type MapStateProps = Pick<Props, 'isConnecting' | 'error'>
export type MapDispatchProps = Pick<Props, 'onConnect'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction> 