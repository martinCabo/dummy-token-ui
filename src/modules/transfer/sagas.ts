import { ethers } from 'ethers'
import { call, put, apply, takeEvery, select } from 'redux-saga/effects'
import { isErrorWithMessage } from '../utils'
import { updateBalance } from '../wallet/actions'
import { WindowWithEthereum } from '../types'
import { TRANSFER_REQUEST, transferFailure, TransferRequestAction, transferSuccess } from '../transfer/actions'
import { TOKEN_ABI } from '../utils'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}

export function* transferSaga() {
  yield takeEvery(TRANSFER_REQUEST, handleTransferRequest)
}

function* handleTransferRequest(action: TransferRequestAction): Generator<any, void, any> {
  try {
    const { amount, destination } = action.payload

    // Get current balance from state and subtract the transferred amount
    const currentBalance = yield select((state: any) => state.wallet.balance)
    if(!currentBalance){
      yield put(transferFailure("Error getting the current balance"))
      return
    }
    if(amount > currentBalance){
      yield put(transferFailure("Insufficient balance"))
      return
    }

    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    yield call([provider, 'send'], 'eth_requestAccounts', []) as Awaited<ReturnType<typeof provider.send>>
    //I get the signer
    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>
    //I get the contract
    const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer) as ethers.Contract
    //I call the transfer function
    yield apply(contract, contract.transfer, [destination, amount])
    
    const newBalance = parseFloat(currentBalance) - amount
    yield put(updateBalance(newBalance.toString()))
    //I put the success action
    yield put(transferSuccess())
  } catch (error) {
    yield put(transferFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}
