import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  isConnected: boolean
}

export type MapStateProps = Pick<Props, 'isConnected'>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
