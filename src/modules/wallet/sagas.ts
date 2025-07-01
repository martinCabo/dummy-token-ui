import { ethers } from 'ethers'
import { call, put, apply, takeEvery } from 'redux-saga/effects'
import { isErrorWithMessage } from '../utils'
import { connectWalletFailure, connectWalletSuccess, CONNECT_WALLET_REQUEST } from './actions'
import { WindowWithEthereum } from '../types'
import { TOKEN_ABI } from '../utils'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
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
    const balance = (yield apply(contract, contract.balanceOf, [address])) as Awaited<ReturnType<typeof contract.balanceOf>>
    
    yield put(connectWalletSuccess(address, balance.toString()))
  } catch (error) {
    yield put(connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}
