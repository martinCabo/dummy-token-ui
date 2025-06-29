import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'
import { CloseTransferModalAction } from '../../modules/transfer/actions'

export type Props = {
  isTransfered: boolean
  isTransfering: boolean,
  isOpen: boolean,
  error: string | null
  onTransfer: (amount: number, destination: string) => void
  onClose: () => void
}

export type MapStateProps = Pick<
  Props,
  'isTransfered' | 'isTransfering' | 'isOpen' | 'error'
>
export type MapDispatchProps = Pick<Props, 'onClose' | 'onTransfer'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | CloseTransferModalAction | AnyAction>
