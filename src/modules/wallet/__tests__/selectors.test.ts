import {
  getState,
  getAddress,
  isConnected,
  isConnecting,
  getError,
  getBalance
} from '../selectors'
import { RootState } from '../../types'
import { WalletState } from '../types'

describe('Wallet Selectors', () => {
  const mockWalletState: WalletState = {
    address: '0x1234567890123456789012345678901234567890',
    balance: '1000',
    isConnecting: false,
    isTransferActive: true,
    isTransferSuccess: false,
    error: null
  }

  const mockRootState: RootState = {
    wallet: mockWalletState,
    transfer: {
      isTransfered: false,
      isTransfering: false,
      isTransferSuccess: false,
      isOpen: false,
      error: null
    }
  }

  describe('getState', () => {
    it('should return the wallet state from root state', () => {
      const result = getState(mockRootState)
      
      expect(result).toEqual(mockWalletState)
    })

    it('should return undefined when wallet state is not present', () => {
      const stateWithoutWallet: RootState = {
        transfer: {
          isTransfered: false,
          isTransfering: false,
          isTransferSuccess: false,
          isOpen: false,
          error: null
        }
      } as any
      
      const result = getState(stateWithoutWallet)
      
      expect(result).toBeUndefined()
    })

    it('should return undefined when root state is null', () => {
      const result = getState(null as any)
      
      expect(result).toBeUndefined()
    })

    it('should return undefined when root state is undefined', () => {
      const result = getState(undefined as any)
      
      expect(result).toBeUndefined()
    })

    it('should return undefined when root state is empty object', () => {
      const result = getState({} as any)
      
      expect(result).toBeUndefined()
    })
  })

  describe('getAddress', () => {
    it('should return address when wallet is connected', () => {
      const result = getAddress(mockRootState)
      
      expect(result).toBe('0x1234567890123456789012345678901234567890')
    })

    it('should return empty string when address is null', () => {
      const stateWithNullAddress: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: null
        }
      }
      
      const result = getAddress(stateWithNullAddress)
      
      expect(result).toBe('')
    })

    it('should return empty string when wallet state is undefined', () => {
      const stateWithoutWallet: RootState = {
        transfer: {
          isTransfered: false,
          isTransfering: false,
          isTransferSuccess: false,
          isOpen: false,
          error: null
        }
      } as any
      
      const result = getAddress(stateWithoutWallet)
      
      expect(result).toBe('')
    })

    it('should return empty string when root state is null', () => {
      const result = getAddress(null as any)
      
      expect(result).toBe('')
    })

    it('should return empty string when root state is undefined', () => {
      const result = getAddress(undefined as any)
      
      expect(result).toBe('')
    })

    it('should return empty string when wallet state is null', () => {
      const stateWithNullWallet: RootState = {
        ...mockRootState,
        wallet: null
      } as any
      
      const result = getAddress(stateWithNullWallet)
      
      expect(result).toBe('')
    })

    it('should handle different address formats', () => {
      const addresses = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        '0x0000000000000000000000000000000000000000',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
      ]
      
      addresses.forEach(address => {
        const stateWithAddress: RootState = {
          ...mockRootState,
          wallet: {
            ...mockWalletState,
            address
          }
        }
        
        const result = getAddress(stateWithAddress)
        expect(result).toBe(address)
      })
    })
  })

  describe('isConnected', () => {
    it('should return true when wallet is connected', () => {
      const result = isConnected(mockRootState)
      
      expect(result).toBe(true)
    })

    it('should return false when address is null', () => {
      const stateWithNullAddress: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: null
        }
      }
      
      const result = isConnected(stateWithNullAddress)
      
      expect(result).toBe(false)
    })

    it('should return false when address is empty string', () => {
      const stateWithEmptyAddress: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: ''
        }
      }
      
      const result = isConnected(stateWithEmptyAddress)
      
      expect(result).toBe(false)
    })

    it('should return false when wallet state is undefined', () => {
      const stateWithoutWallet: RootState = {
        transfer: {
          isTransfered: false,
          isTransfering: false,
          isTransferSuccess: false,
          isOpen: false,
          error: null
        }
      } as any
      
      const result = isConnected(stateWithoutWallet)
      
      expect(result).toBe(false)
    })

    it('should return false when root state is null', () => {
      const result = isConnected(null as any)
      
      expect(result).toBe(false)
    })

    it('should return false when wallet state is null', () => {
      const stateWithNullWallet: RootState = {
        ...mockRootState,
        wallet: null
      } as any
      
      const result = isConnected(stateWithNullWallet)
      
      expect(result).toBe(false)
    })

    it('should return true for any non-empty address', () => {
      const addresses = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        '0x0000000000000000000000000000000000000000',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
        '0x1',
        '0x' + 'a'.repeat(100)
      ]
      
      addresses.forEach(address => {
        const stateWithAddress: RootState = {
          ...mockRootState,
          wallet: {
            ...mockWalletState,
            address
          }
        }
        
        const result = isConnected(stateWithAddress)
        expect(result).toBe(true)
      })
    })
  })

  describe('isConnecting', () => {
    it('should return false when wallet is not connecting', () => {
      const result = isConnecting(mockRootState)
      
      expect(result).toBe(false)
    })

    it('should return true when wallet is connecting', () => {
      const stateWithConnecting: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          isConnecting: true
        }
      }
      
      const result = isConnecting(stateWithConnecting)
      
      expect(result).toBe(true)
    })

    it('should return false when wallet state is undefined', () => {
      const stateWithoutWallet: RootState = {
        transfer: {
          isTransfered: false,
          isTransfering: false,
          isTransferSuccess: false,
          isOpen: false,
          error: null
        }
      } as any
      
      const result = isConnecting(stateWithoutWallet)
      
      expect(result).toBe(false)
    })

    it('should return false when root state is null', () => {
      const result = isConnecting(null as any)
      
      expect(result).toBe(false)
    })

    it('should return false when wallet state is null', () => {
      const stateWithNullWallet: RootState = {
        ...mockRootState,
        wallet: null
      } as any
      
      const result = isConnecting(stateWithNullWallet)
      
      expect(result).toBe(false)
    })
  })

  describe('getError', () => {
    it('should return null when no error exists', () => {
      const result = getError(mockRootState)
      
      expect(result).toBe(null)
    })

    it('should return error message when error exists', () => {
      const stateWithError: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          error: 'Connection failed'
        }
      }
      
      const result = getError(stateWithError)
      
      expect(result).toBe('Connection failed')
    })

    it('should return null when error is empty string', () => {
      const stateWithEmptyError: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          error: ''
        }
      }
      
      const result = getError(stateWithEmptyError)
      
      expect(result).toBe('')
    })

    it('should return null when wallet state is undefined', () => {
      const stateWithoutWallet: RootState = {
        transfer: {
          isTransfered: false,
          isTransfering: false,
          isTransferSuccess: false,
          isOpen: false,
          error: null
        }
      } as any
      
      const result = getError(stateWithoutWallet)
      
      expect(result).toBe(null)
    })

    it('should return null when root state is null', () => {
      const result = getError(null as any)
      
      expect(result).toBe(null)
    })

    it('should return null when wallet state is null', () => {
      const stateWithNullWallet: RootState = {
        ...mockRootState,
        wallet: null
      } as any
      
      const result = getError(stateWithNullWallet)
      
      expect(result).toBe(null)
    })

    it('should handle different types of error messages', () => {
      const errorMessages = [
        'User rejected the connection',
        'No wallet found',
        'Network error',
        'MetaMask not installed',
        'User denied account access',
        'Connection timeout',
        'Invalid network'
      ]
      
      errorMessages.forEach(errorMessage => {
        const stateWithError: RootState = {
          ...mockRootState,
          wallet: {
            ...mockWalletState,
            error: errorMessage
          }
        }
        
        const result = getError(stateWithError)
        expect(result).toBe(errorMessage)
      })
    })
  })

  describe('getBalance', () => {
    it('should return balance when wallet has balance', () => {
      const result = getBalance(mockRootState)
      
      expect(result).toBe('1000')
    })

    it('should return empty string when balance is null', () => {
      const stateWithNullBalance: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          balance: null
        }
      }
      
      const result = getBalance(stateWithNullBalance)
      
      expect(result).toBe('')
    })

    it('should return empty string when balance is empty string', () => {
      const stateWithEmptyBalance: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          balance: ''
        }
      }
      
      const result = getBalance(stateWithEmptyBalance)
      
      expect(result).toBe('')
    })

    it('should return empty string when wallet state is undefined', () => {
      const stateWithoutWallet: RootState = {
        transfer: {
          isTransfered: false,
          isTransfering: false,
          isTransferSuccess: false,
          isOpen: false,
          error: null
        }
      } as any
      
      const result = getBalance(stateWithoutWallet)
      
      expect(result).toBe('')
    })

    it('should return empty string when root state is null', () => {
      const result = getBalance(null as any)
      
      expect(result).toBe('')
    })

    it('should return empty string when wallet state is null', () => {
      const stateWithNullWallet: RootState = {
        ...mockRootState,
        wallet: null
      } as any
      
      const result = getBalance(stateWithNullWallet)
      
      expect(result).toBe('')
    })

    it('should handle different balance formats', () => {
      const balances = [
        '0',
        '1000',
        '1000000000000000000',
        '9999999999999999999999999999999999999999999999999999999999999999',
        '0.1',
        '1000.5',
        '0.000000000000000001'
      ]
      
      balances.forEach(balance => {
        const stateWithBalance: RootState = {
          ...mockRootState,
          wallet: {
            ...mockWalletState,
            balance
          }
        }
        
        const result = getBalance(stateWithBalance)
        expect(result).toBe(balance)
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle partial wallet state', () => {
      const partialWalletState = {
        address: '0x1234567890123456789012345678901234567890'
        // Missing other properties
      }
      
      const stateWithPartialWallet: RootState = {
        ...mockRootState,
        wallet: partialWalletState as any
      }
      
      expect(getAddress(stateWithPartialWallet)).toBe('0x1234567890123456789012345678901234567890')
      expect(isConnected(stateWithPartialWallet)).toBe(true)
      expect(isConnecting(stateWithPartialWallet)).toBe(false)
      expect(getError(stateWithPartialWallet)).toBe(null)
      expect(getBalance(stateWithPartialWallet)).toBe('')
    })

    it('should handle wallet state with all properties as undefined', () => {
      const undefinedWalletState = {
        address: undefined,
        balance: undefined,
        isConnecting: undefined,
        isTransferActive: undefined,
        isTransferSuccess: undefined,
        error: undefined
      }
      
      const stateWithUndefinedWallet: RootState = {
        ...mockRootState,
        wallet: undefinedWalletState as any
      }
      
      expect(getAddress(stateWithUndefinedWallet)).toBe('')
      expect(isConnected(stateWithUndefinedWallet)).toBe(false)
      expect(isConnecting(stateWithUndefinedWallet)).toBe(false)
      expect(getError(stateWithUndefinedWallet)).toBe(null)
      expect(getBalance(stateWithUndefinedWallet)).toBe('')
    })

    it('should handle very long addresses', () => {
      const longAddress = '0x' + 'a'.repeat(100)
      const stateWithLongAddress: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: longAddress
        }
      }
      
      const result = getAddress(stateWithLongAddress)
      expect(result).toBe(longAddress)
      expect(result.length).toBe(102)
    })

    it('should handle very long balances', () => {
      const longBalance = '9'.repeat(1000)
      const stateWithLongBalance: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          balance: longBalance
        }
      }
      
      const result = getBalance(stateWithLongBalance)
      expect(result).toBe(longBalance)
      expect(result.length).toBe(1000)
    })

    it('should handle very long error messages', () => {
      const longErrorMessage = 'A'.repeat(1000)
      const stateWithLongError: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          error: longErrorMessage
        }
      }
      
      const result = getError(stateWithLongError)
      expect(result).toBe(longErrorMessage)
      expect(result?.length).toBe(1000)
    })

    it('should handle special characters in addresses', () => {
      const specialAddress = '0x1234567890abcdefABCDEF1234567890abcdefAB'
      const stateWithSpecialAddress: RootState = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: specialAddress
        }
      }
      
      const result = getAddress(stateWithSpecialAddress)
      expect(result).toBe(specialAddress)
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
          wallet: {
            ...mockWalletState,
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
          wallet: {
            address: '0x1234567890123456789012345678901234567890',
            balance: '1000',
            isConnecting: false,
            isTransferActive: true,
            isTransferSuccess: false,
            error: null
          }
        },
        {
          wallet: {
            address: null,
            balance: null,
            isConnecting: true,
            isTransferActive: true,
            isTransferSuccess: false,
            error: 'Connecting...'
          }
        },
        {
          wallet: {
            address: '0x1234567890123456789012345678901234567890',
            balance: '0',
            isConnecting: false,
            isTransferActive: true,
            isTransferSuccess: false,
            error: 'Insufficient balance'
          }
        },
        {
          wallet: {
            address: '',
            balance: '',
            isConnecting: false,
            isTransferActive: true,
            isTransferSuccess: false,
            error: ''
          }
        }
      ]
      
      testStates.forEach((testState, index) => {
        const rootState = { ...mockRootState, wallet: testState.wallet } as RootState
        
        expect(typeof getAddress(rootState)).toBe('string')
        expect(typeof isConnected(rootState)).toBe('boolean')
        expect(typeof isConnecting(rootState)).toBe('boolean')
        expect(typeof getBalance(rootState)).toBe('string')
        expect(typeof getError(rootState) === 'string' || getError(rootState) === null).toBe(true)
      })
    })

    it('should handle all boolean combinations for isConnecting', () => {
      const booleanCombinations = [
        { isConnecting: false },
        { isConnecting: true }
      ]
      
      booleanCombinations.forEach(combination => {
        const testState: RootState = {
          ...mockRootState,
          wallet: {
            ...mockWalletState,
            ...combination
          }
        }
        
        expect(isConnecting(testState)).toBe(combination.isConnecting)
      })
    })

    it('should handle all address combinations for isConnected', () => {
      const addressCombinations = [
        { address: null, expected: false },
        { address: '', expected: false },
        { address: '0x1234567890123456789012345678901234567890', expected: true },
        { address: '0x1', expected: true }
      ]
      
      addressCombinations.forEach(combination => {
        const testState: RootState = {
          ...mockRootState,
          wallet: {
            ...mockWalletState,
            address: combination.address
          }
        }
        
        expect(isConnected(testState)).toBe(combination.expected)
      })
    })
  })
}) 