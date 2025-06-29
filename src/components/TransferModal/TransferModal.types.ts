import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  isTransfered: boolean
  isTransfering: boolean,
  isOpen: boolean,
  error: string | null
  onConnect: () => void
}

export type MapStateProps = Pick<
  Props,
  'isTransfered' | 'isTransfering' | 'isOpen' | 'error'
>
export type MapDispatchProps = Pick<Props, 'onConnect'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
