import { 
  getTransferState, 
  isTransfered, 
  isTransfering, 
  isOpen, 
  getError, 
  isTransferSuccess 
} from '../selectors'
import { TransferState } from '../types'
import { RootState } from '../../types'

describe('Transfer Selectors', () => {
  const mockTransferState: TransferState = {
    isTransfered: true,
    isTransfering: false,
    isTransferSuccess: true,
    isOpen: false,
    error: null,
  }

  const mockRootState: RootState = {
    wallet: {
      address: '0x123',
      balance: '1000',
      isConnecting: false,
      isTransferActive: false,
      isTransferSuccess: false,
      error: null,
    },
    transfer: mockTransferState,
  }

  describe('getTransferState', () => {
    it('should return the complete transfer state from root state', () => {
      const result = getTransferState(mockRootState)
      expect(result).toEqual(mockTransferState)
    })

    it('should return undefined when transfer state is not present', () => {
      const stateWithoutTransfer = {
        wallet: mockRootState.wallet,
      } as RootState

      const result = getTransferState(stateWithoutTransfer)
      expect(result).toBeUndefined()
    })

    it('should handle empty transfer state', () => {
      const emptyTransferState: TransferState = {
        isTransfered: false,
        isTransfering: false,
        isTransferSuccess: false,
        isOpen: false,
        error: null,
      }

      const stateWithEmptyTransfer: RootState = {
        ...mockRootState,
        transfer: emptyTransferState,
      }

      const result = getTransferState(stateWithEmptyTransfer)
      expect(result).toEqual(emptyTransferState)
    })
  })

  describe('isTransfered', () => {
    it('should return true when transfer has been completed', () => {
      const result = isTransfered(mockRootState)
      expect(result).toBe(true)
    })

    it('should return false when transfer has not been completed', () => {
      const stateWithNoTransfer: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isTransfered: false,
        },
      }

      const result = isTransfered(stateWithNoTransfer)
      expect(result).toBe(false)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer = {
        wallet: mockRootState.wallet,
      } as RootState

      const result = isTransfered(stateWithoutTransfer)
      expect(result).toBe(false)
    })
  })

  describe('isTransfering', () => {
    it('should return true when transfer is in progress', () => {
      const stateWithTransfering: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isTransfering: true,
        },
      }

      const result = isTransfering(stateWithTransfering)
      expect(result).toBe(true)
    })

    it('should return false when transfer is not in progress', () => {
      const result = isTransfering(mockRootState)
      expect(result).toBe(false)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer = {
        wallet: mockRootState.wallet,
      } as RootState

      const result = isTransfering(stateWithoutTransfer)
      expect(result).toBe(false)
    })
  })

  describe('isTransferSuccess', () => {
    it('should return true when transfer was successful', () => {
      const result = isTransferSuccess(mockRootState)
      expect(result).toBe(true)
    })

    it('should return false when transfer was not successful', () => {
      const stateWithFailedTransfer: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isTransferSuccess: false,
        },
      }

      const result = isTransferSuccess(stateWithFailedTransfer)
      expect(result).toBe(false)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer = {
        wallet: mockRootState.wallet,
      } as RootState

      const result = isTransferSuccess(stateWithoutTransfer)
      expect(result).toBe(false)
    })
  })

  describe('isOpen', () => {
    it('should return true when transfer modal is open', () => {
      const stateWithOpenModal: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isOpen: true,
        },
      }

      const result = isOpen(stateWithOpenModal)
      expect(result).toBe(true)
    })

    it('should return false when transfer modal is closed', () => {
      const result = isOpen(mockRootState)
      expect(result).toBe(false)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer = {
        wallet: mockRootState.wallet,
      } as RootState

      const result = isOpen(stateWithoutTransfer)
      expect(result).toBe(false)
    })
  })

  describe('getError', () => {
    it('should return error message when transfer has an error', () => {
      const errorMessage = 'Transfer failed due to insufficient funds'
      const stateWithError: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          error: errorMessage,
        },
      }

      const result = getError(stateWithError)
      expect(result).toBe(errorMessage)
    })

    it('should return null when transfer has no error', () => {
      const result = getError(mockRootState)
      expect(result).toBe(null)
    })

    it('should return null when transfer state is undefined', () => {
      const stateWithoutTransfer = {
        wallet: mockRootState.wallet,
      } as RootState

      const result = getError(stateWithoutTransfer)
      expect(result).toBe(null)
    })

    it('should handle empty string error', () => {
      const stateWithEmptyError: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          error: '',
        },
      }

      const result = getError(stateWithEmptyError)
      expect(result).toBe('')
    })
  })

  describe('Selector Integration', () => {
    it('should correctly reflect transfer request state', () => {
      const transferRequestState: RootState = {
        ...mockRootState,
        transfer: {
          isTransfered: false,
          isTransfering: true,
          isTransferSuccess: false,
          isOpen: true,
          error: null,
        },
      }

      expect(isTransfered(transferRequestState)).toBe(false)
      expect(isTransfering(transferRequestState)).toBe(true)
      expect(isTransferSuccess(transferRequestState)).toBe(false)
      expect(isOpen(transferRequestState)).toBe(true)
      expect(getError(transferRequestState)).toBe(null)
    })

    it('should correctly reflect transfer failure state', () => {
      const transferFailureState: RootState = {
        ...mockRootState,
        transfer: {
          isTransfered: false,
          isTransfering: false,
          isTransferSuccess: false,
          isOpen: true,
          error: 'Network connection failed',
        },
      }

      expect(isTransfered(transferFailureState)).toBe(false)
      expect(isTransfering(transferFailureState)).toBe(false)
      expect(isTransferSuccess(transferFailureState)).toBe(false)
      expect(isOpen(transferFailureState)).toBe(true)
      expect(getError(transferFailureState)).toBe('Network connection failed')
    })

    it('should correctly reflect transfer success state', () => {
      const transferSuccessState: RootState = {
        ...mockRootState,
        transfer: {
          isTransfered: true,
          isTransfering: false,
          isTransferSuccess: true,
          isOpen: false,
          error: null,
        },
      }

      expect(isTransfered(transferSuccessState)).toBe(true)
      expect(isTransfering(transferSuccessState)).toBe(false)
      expect(isTransferSuccess(transferSuccessState)).toBe(true)
      expect(isOpen(transferSuccessState)).toBe(false)
      expect(getError(transferSuccessState)).toBe(null)
    })
  })

  describe('Edge Cases', () => {
    it('should handle null root state', () => {
      const nullState = null as unknown as RootState

      expect(() => getTransferState(nullState)).not.toThrow()
      expect(() => isTransfered(nullState)).not.toThrow()
      expect(() => isTransfering(nullState)).not.toThrow()
      expect(() => isTransferSuccess(nullState)).not.toThrow()
      expect(() => isOpen(nullState)).not.toThrow()
      expect(() => getError(nullState)).not.toThrow()
    })

    it('should handle undefined root state', () => {
      const undefinedState = undefined as unknown as RootState

      expect(() => getTransferState(undefinedState)).not.toThrow()
      expect(() => isTransfered(undefinedState)).not.toThrow()
      expect(() => isTransfering(undefinedState)).not.toThrow()
      expect(() => isTransferSuccess(undefinedState)).not.toThrow()
      expect(() => isOpen(undefinedState)).not.toThrow()
      expect(() => getError(undefinedState)).not.toThrow()
    })

    it('should handle partial transfer state', () => {
      const partialTransferState = {
        isTransfered: true,
        // Missing other properties
      } as TransferState

      const stateWithPartialTransfer: RootState = {
        ...mockRootState,
        transfer: partialTransferState,
      }

      expect(isTransfered(stateWithPartialTransfer)).toBe(true)
      // Other selectors should handle missing properties gracefully
      expect(() => isTransfering(stateWithPartialTransfer)).not.toThrow()
      expect(() => isTransferSuccess(stateWithPartialTransfer)).not.toThrow()
      expect(() => isOpen(stateWithPartialTransfer)).not.toThrow()
      expect(() => getError(stateWithPartialTransfer)).not.toThrow()
    })
  })
}) 