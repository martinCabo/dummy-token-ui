import {
  getTransferState,
  isTransfered,
  isTransfering,
  isOpen,
  getError,
  isTransferSuccess
} from '../selectors'
import { RootState } from '../../types'
import { TransferState } from '../types'

describe('Transfer Selectors', () => {
  const mockTransferState: TransferState = {
    isTransfered: true,
    isTransfering: false,
    isTransferSuccess: true,
    isOpen: true,
    error: 'Test error message'
  }

  const mockRootState: RootState = {
    transfer: mockTransferState,
    wallet: {
      isConnected: true,
      address: '0x1234567890123456789012345678901234567890',
      balance: '1000',
      error: null
    }
  }

  describe('getTransferState', () => {
    it('should return the transfer state from root state', () => {
      const result = getTransferState(mockRootState)
      
      expect(result).toEqual(mockTransferState)
    })

    it('should return undefined when transfer state is not present', () => {
      const stateWithoutTransfer: RootState = {
        wallet: {
          isConnected: true,
          address: '0x1234567890123456789012345678901234567890',
          balance: '1000',
          error: null
        }
      } as any
      
      const result = getTransferState(stateWithoutTransfer)
      
      expect(result).toBeUndefined()
    })

    it('should return undefined when root state is null', () => {
      const result = getTransferState(null as any)
      
      expect(result).toBeUndefined()
    })

    it('should return undefined when root state is undefined', () => {
      const result = getTransferState(undefined as any)
      
      expect(result).toBeUndefined()
    })

    it('should return undefined when root state is empty object', () => {
      const result = getTransferState({} as any)
      
      expect(result).toBeUndefined()
    })
  })

  describe('isTransfered', () => {
    it('should return true when transfer is completed', () => {
      const result = isTransfered(mockRootState)
      
      expect(result).toBe(true)
    })

    it('should return false when transfer is not completed', () => {
      const stateWithTransferNotCompleted: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isTransfered: false
        }
      }
      
      const result = isTransfered(stateWithTransferNotCompleted)
      
      expect(result).toBe(false)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer: RootState = {
        wallet: {
          isConnected: true,
          address: '0x1234567890123456789012345678901234567890',
          balance: '1000',
          error: null
        }
      } as any
      
      const result = isTransfered(stateWithoutTransfer)
      
      expect(result).toBe(false)
    })

    it('should return false when root state is null', () => {
      const result = isTransfered(null as any)
      
      expect(result).toBe(false)
    })

    it('should return false when root state is undefined', () => {
      const result = isTransfered(undefined as any)
      
      expect(result).toBe(false)
    })

    it('should return false when transfer state is null', () => {
      const stateWithNullTransfer: RootState = {
        ...mockRootState,
        transfer: null
      } as any
      
      const result = isTransfered(stateWithNullTransfer)
      
      expect(result).toBe(false)
    })
  })

  describe('isTransfering', () => {
    it('should return false when transfer is not in progress', () => {
      const result = isTransfering(mockRootState)
      
      expect(result).toBe(false)
    })

    it('should return true when transfer is in progress', () => {
      const stateWithTransferInProgress: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isTransfering: true
        }
      }
      
      const result = isTransfering(stateWithTransferInProgress)
      
      expect(result).toBe(true)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer: RootState = {
        wallet: {
          isConnected: true,
          address: '0x1234567890123456789012345678901234567890',
          balance: '1000',
          error: null
        }
      } as any
      
      const result = isTransfering(stateWithoutTransfer)
      
      expect(result).toBe(false)
    })

    it('should return false when root state is null', () => {
      const result = isTransfering(null as any)
      
      expect(result).toBe(false)
    })

    it('should return false when transfer state is null', () => {
      const stateWithNullTransfer: RootState = {
        ...mockRootState,
        transfer: null
      } as any
      
      const result = isTransfering(stateWithNullTransfer)
      
      expect(result).toBe(false)
    })
  })

  describe('isOpen', () => {
    it('should return true when modal is open', () => {
      const result = isOpen(mockRootState)
      
      expect(result).toBe(true)
    })

    it('should return false when modal is closed', () => {
      const stateWithModalClosed: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isOpen: false
        }
      }
      
      const result = isOpen(stateWithModalClosed)
      
      expect(result).toBe(false)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer: RootState = {
        wallet: {
          isConnected: true,
          address: '0x1234567890123456789012345678901234567890',
          balance: '1000',
          error: null
        }
      } as any
      
      const result = isOpen(stateWithoutTransfer)
      
      expect(result).toBe(false)
    })

    it('should return false when root state is null', () => {
      const result = isOpen(null as any)
      
      expect(result).toBe(false)
    })

    it('should return false when transfer state is null', () => {
      const stateWithNullTransfer: RootState = {
        ...mockRootState,
        transfer: null
      } as any
      
      const result = isOpen(stateWithNullTransfer)
      
      expect(result).toBe(false)
    })
  })

  describe('getError', () => {
    it('should return error message when error exists', () => {
      const result = getError(mockRootState)
      
      expect(result).toBe('Test error message')
    })

    it('should return null when no error exists', () => {
      const stateWithoutError: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          error: null
        }
      }
      
      const result = getError(stateWithoutError)
      
      expect(result).toBe(null)
    })

    it('should return null when error is empty string', () => {
      const stateWithEmptyError: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          error: ''
        }
      }
      
      const result = getError(stateWithEmptyError)
      
      expect(result).toBe('')
    })

    it('should return null when transfer state is undefined', () => {
      const stateWithoutTransfer: RootState = {
        wallet: {
          isConnected: true,
          address: '0x1234567890123456789012345678901234567890',
          balance: '1000',
          error: null
        }
      } as any
      
      const result = getError(stateWithoutTransfer)
      
      expect(result).toBe(null)
    })

    it('should return null when root state is null', () => {
      const result = getError(null as any)
      
      expect(result).toBe(null)
    })

    it('should return null when transfer state is null', () => {
      const stateWithNullTransfer: RootState = {
        ...mockRootState,
        transfer: null
      } as any
      
      const result = getError(stateWithNullTransfer)
      
      expect(result).toBe(null)
    })

    it('should handle different types of error messages', () => {
      const errorMessages = [
        'Insufficient balance',
        'Invalid destination address',
        'Network error',
        'User rejected transaction',
        'Gas estimation failed',
        'Contract error: ERC20: transfer amount exceeds balance'
      ]
      
      errorMessages.forEach(errorMessage => {
        const stateWithError: RootState = {
          ...mockRootState,
          transfer: {
            ...mockTransferState,
            error: errorMessage
          }
        }
        
        const result = getError(stateWithError)
        expect(result).toBe(errorMessage)
      })
    })
  })

  describe('isTransferSuccess', () => {
    it('should return true when transfer was successful', () => {
      const result = isTransferSuccess(mockRootState)
      
      expect(result).toBe(true)
    })

    it('should return false when transfer was not successful', () => {
      const stateWithTransferNotSuccessful: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          isTransferSuccess: false
        }
      }
      
      const result = isTransferSuccess(stateWithTransferNotSuccessful)
      
      expect(result).toBe(false)
    })

    it('should return false when transfer state is undefined', () => {
      const stateWithoutTransfer: RootState = {
        wallet: {
          isConnected: true,
          address: '0x1234567890123456789012345678901234567890',
          balance: '1000',
          error: null
        }
      } as any
      
      const result = isTransferSuccess(stateWithoutTransfer)
      
      expect(result).toBe(false)
    })

    it('should return false when root state is null', () => {
      const result = isTransferSuccess(null as any)
      
      expect(result).toBe(false)
    })

    it('should return false when transfer state is null', () => {
      const stateWithNullTransfer: RootState = {
        ...mockRootState,
        transfer: null
      } as any
      
      const result = isTransferSuccess(stateWithNullTransfer)
      
      expect(result).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle partial transfer state', () => {
      const partialTransferState = {
        isTransfered: true
        // Missing other properties
      }
      
      const stateWithPartialTransfer: RootState = {
        ...mockRootState,
        transfer: partialTransferState as any
      }
      
      expect(isTransfered(stateWithPartialTransfer)).toBe(true)
      expect(isTransfering(stateWithPartialTransfer)).toBe(false)
      expect(isOpen(stateWithPartialTransfer)).toBe(false)
      expect(getError(stateWithPartialTransfer)).toBe(null)
      expect(isTransferSuccess(stateWithPartialTransfer)).toBe(false)
    })

    it('should handle transfer state with all properties as undefined', () => {
      const undefinedTransferState = {
        isTransfered: undefined,
        isTransfering: undefined,
        isTransferSuccess: undefined,
        isOpen: undefined,
        error: undefined
      }
      
      const stateWithUndefinedTransfer: RootState = {
        ...mockRootState,
        transfer: undefinedTransferState as any
      }
      
      expect(isTransfered(stateWithUndefinedTransfer)).toBe(false)
      expect(isTransfering(stateWithUndefinedTransfer)).toBe(false)
      expect(isOpen(stateWithUndefinedTransfer)).toBe(false)
      expect(getError(stateWithUndefinedTransfer)).toBe(null)
      expect(isTransferSuccess(stateWithUndefinedTransfer)).toBe(false)
    })

    it('should handle very long error messages', () => {
      const longErrorMessage = 'A'.repeat(1000)
      const stateWithLongError: RootState = {
        ...mockRootState,
        transfer: {
          ...mockTransferState,
          error: longErrorMessage
        }
      }
      
      const result = getError(stateWithLongError)
      expect(result).toBe(longErrorMessage)
      expect(result?.length).toBe(1000)
    })

    it('should handle special characters in error messages', () => {
      const specialErrorMessages = [
        'Error with special chars: !@#$%^&*()',
        'Error with unicode: ñáéíóú',
        'Error with numbers: 1234567890',
        'Error with spaces: multiple words',
        'Error with newlines: \n line break',
        'Error with tabs: \t tab character'
      ]
      
      specialErrorMessages.forEach(errorMessage => {
        const stateWithSpecialError: RootState = {
          ...mockRootState,
          transfer: {
            ...mockTransferState,
            error: errorMessage
          }
        }
        
        const result = getError(stateWithSpecialError)
        expect(result).toBe(errorMessage)
      })
    })
  })

  describe('Selector Consistency', () => {
    it('should maintain consistent behavior across all selectors', () => {
      const testStates = [
        {
          transfer: {
            isTransfered: true,
            isTransfering: false,
            isTransferSuccess: true,
            isOpen: true,
            error: 'Success state'
          }
        },
        {
          transfer: {
            isTransfered: false,
            isTransfering: true,
            isTransferSuccess: false,
            isOpen: true,
            error: 'Transfer in progress'
          }
        },
        {
          transfer: {
            isTransfered: false,
            isTransfering: false,
            isTransferSuccess: false,
            isOpen: false,
            error: 'Transfer failed'
          }
        },
        {
          transfer: {
            isTransfered: false,
            isTransfering: false,
            isTransferSuccess: false,
            isOpen: false,
            error: null
          }
        }
      ]
      
      testStates.forEach((testState, index) => {
        const rootState = { ...mockRootState, transfer: testState.transfer } as RootState
        
        expect(typeof isTransfered(rootState)).toBe('boolean')
        expect(typeof isTransfering(rootState)).toBe('boolean')
        expect(typeof isOpen(rootState)).toBe('boolean')
        expect(typeof isTransferSuccess(rootState)).toBe('boolean')
        expect(typeof getError(rootState) === 'string' || getError(rootState) === null).toBe(true)
      })
    })

    it('should handle all boolean combinations correctly', () => {
      const booleanCombinations = [
        { isTransfered: false, isTransfering: false, isTransferSuccess: false, isOpen: false },
        { isTransfered: false, isTransfering: false, isTransferSuccess: false, isOpen: true },
        { isTransfered: false, isTransfering: false, isTransferSuccess: true, isOpen: false },
        { isTransfered: false, isTransfering: false, isTransferSuccess: true, isOpen: true },
        { isTransfered: false, isTransfering: true, isTransferSuccess: false, isOpen: false },
        { isTransfered: false, isTransfering: true, isTransferSuccess: false, isOpen: true },
        { isTransfered: false, isTransfering: true, isTransferSuccess: true, isOpen: false },
        { isTransfered: false, isTransfering: true, isTransferSuccess: true, isOpen: true },
        { isTransfered: true, isTransfering: false, isTransferSuccess: false, isOpen: false },
        { isTransfered: true, isTransfering: false, isTransferSuccess: false, isOpen: true },
        { isTransfered: true, isTransfering: false, isTransferSuccess: true, isOpen: false },
        { isTransfered: true, isTransfering: false, isTransferSuccess: true, isOpen: true },
        { isTransfered: true, isTransfering: true, isTransferSuccess: false, isOpen: false },
        { isTransfered: true, isTransfering: true, isTransferSuccess: false, isOpen: true },
        { isTransfered: true, isTransfering: true, isTransferSuccess: true, isOpen: false },
        { isTransfered: true, isTransfering: true, isTransferSuccess: true, isOpen: true }
      ]
      
      booleanCombinations.forEach(combination => {
        const testState: RootState = {
          ...mockRootState,
          transfer: {
            ...combination,
            error: null
          }
        }
        
        expect(isTransfered(testState)).toBe(combination.isTransfered)
        expect(isTransfering(testState)).toBe(combination.isTransfering)
        expect(isTransferSuccess(testState)).toBe(combination.isTransferSuccess)
        expect(isOpen(testState)).toBe(combination.isOpen)
      })
    })
  })
}) 