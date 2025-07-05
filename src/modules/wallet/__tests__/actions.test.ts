import {
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  UPDATE_BALANCE,
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  updateBalance,
  ConnectWalletRequestAction,
  ConnectWalletSuccessAction,
  ConnectWalletFailureAction,
  UpdateBalanceAction
} from '../actions'

describe('Wallet Actions', () => {
  describe('Action Types', () => {
    it('should have correct action type constants', () => {
      expect(CONNECT_WALLET_REQUEST).toBe('[Request] Connect Wallet')
      expect(CONNECT_WALLET_SUCCESS).toBe('[Success] Connect Wallet')
      expect(CONNECT_WALLET_FAILURE).toBe('[Failure] Connect Wallet')
      expect(UPDATE_BALANCE).toBe('[Update] Balance')
    })
  })

  describe('connectWalletRequest', () => {
    it('should create a connect wallet request action', () => {
      const action = connectWalletRequest()
      
      expect(action).toEqual({
        type: CONNECT_WALLET_REQUEST,
        payload: {}
      })
    })

    it('should have correct action type', () => {
      const action = connectWalletRequest()
      
      expect(action.type).toBe(CONNECT_WALLET_REQUEST)
    })

    it('should have empty payload', () => {
      const action = connectWalletRequest()
      
      expect(action.payload).toEqual({})
    })
  })

  describe('connectWalletSuccess', () => {
    it('should create a connect wallet success action with address and balance', () => {
      const address = '0x1234567890123456789012345678901234567890'
      const balance = '1000'
      
      const action = connectWalletSuccess(address, balance)
      
      expect(action).toEqual({
        type: CONNECT_WALLET_SUCCESS,
        payload: {
          address,
          balance
        }
      })
    })

    it('should handle different address formats', () => {
      const addresses = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        '0x0000000000000000000000000000000000000000',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
      ]
      
      addresses.forEach(address => {
        const action = connectWalletSuccess(address, '1000')
        expect(action.payload.address).toBe(address)
        expect(action.payload.balance).toBe('1000')
      })
    })

    it('should handle different balance formats', () => {
      const balances = [
        '0',
        '1000',
        '1000000000000000000',
        '9999999999999999999999999999999999999999999999999999999999999999',
        '0.1',
        '1000.5'
      ]
      
      balances.forEach(balance => {
        const action = connectWalletSuccess('0x1234567890123456789012345678901234567890', balance)
        expect(action.payload.balance).toBe(balance)
        expect(action.payload.address).toBe('0x1234567890123456789012345678901234567890')
      })
    })

    it('should handle empty address', () => {
      const action = connectWalletSuccess('', '1000')
      
      expect(action.payload.address).toBe('')
      expect(action.payload.balance).toBe('1000')
    })

    it('should handle empty balance', () => {
      const action = connectWalletSuccess('0x1234567890123456789012345678901234567890', '')
      
      expect(action.payload.address).toBe('0x1234567890123456789012345678901234567890')
      expect(action.payload.balance).toBe('')
    })

    it('should have correct action type', () => {
      const action = connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000')
      
      expect(action.type).toBe(CONNECT_WALLET_SUCCESS)
    })
  })

  describe('connectWalletFailure', () => {
    it('should create a connect wallet failure action with error message', () => {
      const errorMessage = 'User rejected the connection'
      
      const action = connectWalletFailure(errorMessage)
      
      expect(action).toEqual({
        type: CONNECT_WALLET_FAILURE,
        payload: {
          error: errorMessage
        }
      })
    })

    it('should handle empty error message', () => {
      const errorMessage = ''
      
      const action = connectWalletFailure(errorMessage)
      
      expect(action.payload.error).toBe('')
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
        const action = connectWalletFailure(errorMessage)
        expect(action.payload.error).toBe(errorMessage)
        expect(action.type).toBe(CONNECT_WALLET_FAILURE)
      })
    })

    it('should have correct action type', () => {
      const action = connectWalletFailure('Test error')
      
      expect(action.type).toBe(CONNECT_WALLET_FAILURE)
    })
  })

  describe('updateBalance', () => {
    it('should create an update balance action with new balance', () => {
      const newBalance = '1500'
      
      const action = updateBalance(newBalance)
      
      expect(action).toEqual({
        type: UPDATE_BALANCE,
        payload: {
          balance: newBalance
        }
      })
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
        const action = updateBalance(balance)
        expect(action.payload.balance).toBe(balance)
        expect(action.type).toBe(UPDATE_BALANCE)
      })
    })

    it('should handle empty balance', () => {
      const action = updateBalance('')
      
      expect(action.payload.balance).toBe('')
    })

    it('should handle zero balance', () => {
      const action = updateBalance('0')
      
      expect(action.payload.balance).toBe('0')
    })

    it('should have correct action type', () => {
      const action = updateBalance('1000')
      
      expect(action.type).toBe(UPDATE_BALANCE)
    })
  })

  describe('Action Type Definitions', () => {
    it('should have correct ConnectWalletRequestAction type', () => {
      const action: ConnectWalletRequestAction = connectWalletRequest()
      
      expect(action.type).toBe(CONNECT_WALLET_REQUEST)
      expect(action.payload).toEqual({})
    })

    it('should have correct ConnectWalletSuccessAction type', () => {
      const action: ConnectWalletSuccessAction = connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000')
      
      expect(action.type).toBe(CONNECT_WALLET_SUCCESS)
      expect(action.payload).toHaveProperty('address')
      expect(action.payload).toHaveProperty('balance')
    })

    it('should have correct ConnectWalletFailureAction type', () => {
      const action: ConnectWalletFailureAction = connectWalletFailure('Test error')
      
      expect(action.type).toBe(CONNECT_WALLET_FAILURE)
      expect(action.payload).toHaveProperty('error')
    })

    it('should have correct UpdateBalanceAction type', () => {
      const action: UpdateBalanceAction = updateBalance('1000')
      
      expect(action.type).toBe(UPDATE_BALANCE)
      expect(action.payload).toHaveProperty('balance')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long addresses', () => {
      const longAddress = '0x' + 'a'.repeat(100)
      
      const action = connectWalletSuccess(longAddress, '1000')
      
      expect(action.payload.address).toBe(longAddress)
      expect(action.payload.address.length).toBe(102)
    })

    it('should handle very long balances', () => {
      const longBalance = '9'.repeat(1000)
      
      const action = updateBalance(longBalance)
      
      expect(action.payload.balance).toBe(longBalance)
      expect(action.payload.balance.length).toBe(1000)
    })

    it('should handle very long error messages', () => {
      const longErrorMessage = 'A'.repeat(1000)
      
      const action = connectWalletFailure(longErrorMessage)
      
      expect(action.payload.error).toBe(longErrorMessage)
      expect(action.payload.error.length).toBe(1000)
    })

    it('should handle special characters in addresses', () => {
      const specialAddress = '0x1234567890abcdefABCDEF1234567890abcdefAB'
      
      const action = connectWalletSuccess(specialAddress, '1000')
      
      expect(action.payload.address).toBe(specialAddress)
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
        const action = connectWalletFailure(errorMessage)
        expect(action.payload.error).toBe(errorMessage)
      })
    })

    it('should handle decimal balances with many decimal places', () => {
      const decimalBalances = [
        '0.000000000000000001',
        '1.123456789012345678',
        '999999.999999999999999999'
      ]
      
      decimalBalances.forEach(balance => {
        const action = updateBalance(balance)
        expect(action.payload.balance).toBe(balance)
      })
    })
  })

  describe('Action Immutability', () => {
    it('should not mutate the original parameters in connectWalletSuccess', () => {
      const address = '0x1234567890123456789012345678901234567890'
      const balance = '1000'
      
      const action = connectWalletSuccess(address, balance)
      
      // Modify the action payload
      action.payload.address = '0xmodified'
      action.payload.balance = '2000'
      
      // Original parameters should remain unchanged
      expect(address).toBe('0x1234567890123456789012345678901234567890')
      expect(balance).toBe('1000')
    })

    it('should not mutate the original error in connectWalletFailure', () => {
      const originalError = 'Original error'
      
      const action = connectWalletFailure(originalError)
      
      // Modify the action payload
      action.payload.error = 'Modified error'
      
      // Original error should remain unchanged
      expect(originalError).toBe('Original error')
    })

    it('should not mutate the original balance in updateBalance', () => {
      const originalBalance = '1000'
      
      const action = updateBalance(originalBalance)
      
      // Modify the action payload
      action.payload.balance = '2000'
      
      // Original balance should remain unchanged
      expect(originalBalance).toBe('1000')
    })
  })

  describe('Action Consistency', () => {
    it('should maintain consistent action structure across all actions', () => {
      const actions = [
        connectWalletRequest(),
        connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000'),
        connectWalletFailure('Test error'),
        updateBalance('1000')
      ]
      
      actions.forEach(action => {
        expect(action).toHaveProperty('type')
        expect(action).toHaveProperty('payload')
        expect(typeof action.type).toBe('string')
        expect(typeof action.payload).toBe('object')
      })
    })

    it('should have unique action types', () => {
      const actionTypes = [
        CONNECT_WALLET_REQUEST,
        CONNECT_WALLET_SUCCESS,
        CONNECT_WALLET_FAILURE,
        UPDATE_BALANCE
      ]
      
      const uniqueTypes = new Set(actionTypes)
      expect(uniqueTypes.size).toBe(actionTypes.length)
    })
  })

  describe('Real-world Scenarios', () => {
    it('should handle typical wallet connection flow', () => {
      // Request connection
      const requestAction = connectWalletRequest()
      expect(requestAction.type).toBe(CONNECT_WALLET_REQUEST)
      
      // Success connection
      const successAction = connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000')
      expect(successAction.type).toBe(CONNECT_WALLET_SUCCESS)
      expect(successAction.payload.address).toBe('0x1234567890123456789012345678901234567890')
      expect(successAction.payload.balance).toBe('1000')
      
      // Update balance
      const updateAction = updateBalance('1500')
      expect(updateAction.type).toBe(UPDATE_BALANCE)
      expect(updateAction.payload.balance).toBe('1500')
    })

    it('should handle wallet connection failure flow', () => {
      // Request connection
      const requestAction = connectWalletRequest()
      expect(requestAction.type).toBe(CONNECT_WALLET_REQUEST)
      
      // Failure connection
      const failureAction = connectWalletFailure('User rejected the connection')
      expect(failureAction.type).toBe(CONNECT_WALLET_FAILURE)
      expect(failureAction.payload.error).toBe('User rejected the connection')
    })

    it('should handle balance updates after connection', () => {
      // Initial connection
      const successAction = connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000')
      
      // Multiple balance updates
      const update1 = updateBalance('1500')
      const update2 = updateBalance('2000')
      const update3 = updateBalance('0')
      
      expect(update1.payload.balance).toBe('1500')
      expect(update2.payload.balance).toBe('2000')
      expect(update3.payload.balance).toBe('0')
    })
  })
}) 