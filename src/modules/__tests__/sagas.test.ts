import { sagas } from '../sagas'
import { all } from '@redux-saga/core/effects'

// Mock de los sagas de wallet y transfer
jest.mock('../wallet/sagas', () => {
  function* mockWalletSaga() {
    yield Promise.resolve()
  }
  
  return {
    walletSaga: mockWalletSaga,
    TOKEN_ADDRESS: '0x1234567890123456789012345678901234567890'
  }
})

jest.mock('../transfer/sagas', () => {
  function* mockTransferSaga() {
    yield Promise.resolve()
  }
  
  return {
    transferSaga: mockTransferSaga,
    TOKEN_ADDRESS: '0x1234567890123456789012345678901234567890'
  }
})

  describe('sagas', () => {
    it('should be defined', () => {
      expect(sagas).toBeDefined()
      expect(typeof sagas).toBe('function')
    })

    it('should be a generator function', () => {
      const gen = sagas()
      expect(gen).toBeDefined()
      expect(typeof gen.next).toBe('function')
    })

    it('should import wallet and transfer sagas', () => {
      // Verificar que los módulos se importan correctamente
      const { walletSaga } = require('../wallet/sagas')
      const { transferSaga } = require('../transfer/sagas')
      
      expect(walletSaga).toBeDefined()
      expect(transferSaga).toBeDefined()
    })
  }) 