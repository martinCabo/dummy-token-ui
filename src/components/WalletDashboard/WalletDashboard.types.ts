import { AnyAction, Dispatch } from 'redux'
import { OpenTransferModalAction } from '../../modules/transfer/actions'

export type Props = {
  address: string
  balance: string
  isTransferSuccess: boolean
  onOpenTransferModal: () => void
}

export type MapStateProps = Pick<Props, 'address' | 'balance' | 'isTransferSuccess'>
export type MapDispatchProps = Pick<Props, 'onOpenTransferModal'>
export type MapDispatch = Dispatch<OpenTransferModalAction | AnyAction> 