import { reducer } from './reducer'
import { ethers } from 'ethers'

export type RootState = ReturnType<typeof reducer>
export type WindowWithEthereum = Window & {
    ethereum: ethers.Eip1193Provider
  }
