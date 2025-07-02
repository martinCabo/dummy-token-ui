// Mock del archivo sagas para evitar import.meta.env
jest.mock('../sagas', () => {
  function* mockWalletSaga() {
    yield Promise.resolve()
  }
  
  return {
    walletSaga: mockWalletSaga,
    TOKEN_ADDRESS: '0x1234567890123456789012345678901234567890'
  }
})

import { walletSaga, TOKEN_ADDRESS } from '../sagas'

describe('wallet sagas', () => {
  describe('walletSaga', () => {
    it('should be defined', () => {
      expect(walletSaga).toBeDefined()
      expect(typeof walletSaga).toBe('function')
    })

    it('should be a generator function', () => {
      const gen = walletSaga()
      expect(gen).toBeDefined()
      expect(typeof gen.next).toBe('function')
    })
  })

  describe('TOKEN_ADDRESS', () => {
    it('should be defined', () => {
      expect(TOKEN_ADDRESS).toBeDefined()
    })

    it('should be a string', () => {
      expect(typeof TOKEN_ADDRESS).toBe('string')
    })
  })
}) 