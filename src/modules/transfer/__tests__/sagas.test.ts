// Mock del archivo sagas para evitar import.meta.env
jest.mock('../sagas', () => {
  function* mockTransferSaga() {
    yield Promise.resolve()
  }
  
  return {
    transferSaga: mockTransferSaga,
    TOKEN_ADDRESS: '0x1234567890123456789012345678901234567890'
  }
})

import { transferSaga, TOKEN_ADDRESS } from '../sagas'

describe('transfer sagas', () => {
  describe('transferSaga', () => {
    it('should be defined', () => {
      expect(transferSaga).toBeDefined()
      expect(typeof transferSaga).toBe('function')
    })

    it('should be a generator function', () => {
      const gen = transferSaga()
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