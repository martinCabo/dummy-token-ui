import { combineReducers } from 'redux'
import { walletReducer as wallet } from './wallet/reducer'
import { transferReducer as transfer } from './transfer/reducer'

export const reducer = combineReducers({
  wallet,
  transfer,
})
