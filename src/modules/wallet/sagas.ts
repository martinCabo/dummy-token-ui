import { ethers } from 'ethers'
import { call, put, apply, takeEvery, select } from 'redux-saga/effects'
import { isErrorWithMessage } from '../utils'
import { connectWalletFailure, connectWalletSuccess, CONNECT_WALLET_REQUEST, updateBalance } from './actions'
import { WindowWithEthereum } from './types'
import { TRANSFER_REQUEST, transferFailure, TransferRequestAction, transferSuccess } from '../transfer/actions'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}

/* This is the Dummy Token ABI (application binary interface)
  You will need this to interact with the deployed contract, ie:

  const provider = new.ethers.providers.Web3Provider(window.ethereum)
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
  const balance = await token.balanceOf(walletAddress) // --> returns the balance of DummyToken of the walletAddress
*/
export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)'
]

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
  yield takeEvery(TRANSFER_REQUEST, handleTransferRequest)
}

function* handleConnectWalletRequest(): Generator<any, void, any> {
  try {
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    yield call([provider, 'send'], 'eth_requestAccounts', []) as Awaited<ReturnType<typeof provider.send>>
    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>

    //I get the address of the wallet
    const address = (yield call([signer, 'getAddress'])) as Awaited<ReturnType<typeof signer.getAddress>>
    
    //I will get the balance of the wallet
    const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider) as ethers.Contract
    
    //TODO: Check why balanceOf is not working
    // Llamar al método balanceOf usando apply para que funcione con Redux Saga
    const balance = (yield apply(contract, contract.balanceOf, [address])) as Awaited<ReturnType<typeof contract.balanceOf>>
    
    yield put(connectWalletSuccess(address, balance.toString()))
  } catch (error) {
    yield put(connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}

function* handleTransferRequest(action: TransferRequestAction): Generator<any, void, any> {
  try {
    const { amount, destination } = action.payload

    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    yield call([provider, 'send'], 'eth_requestAccounts', []) as Awaited<ReturnType<typeof provider.send>>
    //I get the signer
    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>
    //I get the contract
    const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer) as ethers.Contract
    //I call the transfer function
    yield apply(contract, contract.transfer, [destination, amount])
    
    // Get current balance from state and subtract the transferred amount
    const currentBalance = yield select((state: any) => state.wallet.balance)
    if (currentBalance) {
      const newBalance = parseFloat(currentBalance) - amount
      yield put(updateBalance(newBalance.toString()))
    }else{
      yield put(transferFailure("Error getting the current balance"))  
    }
    
    //I put the success action
    yield put(transferSuccess())
  } catch (error) {
    yield put(transferFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}
