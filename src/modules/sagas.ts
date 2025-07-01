import { all } from '@redux-saga/core/effects'
import { walletSaga } from './wallet/sagas'
import { transferSaga } from './transfer/sagas'

export function* sagas() {
  yield all([walletSaga(), transferSaga()])
}
