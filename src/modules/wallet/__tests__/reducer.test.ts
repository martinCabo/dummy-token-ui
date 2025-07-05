import { walletReducer } from '../reducer'
import {
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  UPDATE_BALANCE,
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  updateBalance
} from '../actions'
import { WalletState } from '../types'

describe('Wallet Reducer', () => {
  const initialState: WalletState = {
    address: null,
    balance: null,
    isConnecting: false,
    isTransferActive: true,
    isTransferSuccess: false,
    error: null,
  }

  describe('Initial State', () => {
    it('should return initial state when no action is provided', () => {
      const result = walletReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)
      
      expect(result).toEqual(initialState)
    })

    it('should return initial state when unknown action is dispatched', () => {
      const result = walletReducer(initialState, { type: 'UNKNOWN_ACTION' } as any)
      
      expect(result).toEqual(initialState)
    })

    it('should have correct initial state structure', () => {
      const state = walletReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)
      
      expect(state).toHaveProperty('address', null)
      expect(state).toHaveProperty('balance', null)
      expect(state).toHaveProperty('isConnecting', false)
      expect(state).toHaveProperty('isTransferActive', true)
      expect(state).toHaveProperty('isTransferSuccess', false)
      expect(state).toHaveProperty('error', null)
    })
  })

  describe('CONNECT_WALLET_REQUEST', () => {
    it('should handle CONNECT_WALLET_REQUEST action', () => {
      const action = connectWalletRequest()
      const result = walletReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isConnecting: true,
        error: null,
      })
    })

    it('should set isConnecting to true and clear error', () => {
      const stateWithError: WalletState = {
        ...initialState,
        error: 'Previous error'
      }
      
      const action = connectWalletRequest()
      const result = walletReducer(stateWithError, action)
      
      expect(result.isConnecting).toBe(true)
      expect(result.error).toBe(null)
      expect(result.address).toBe(null)
      expect(result.balance).toBe(null)
      expect(result.isTransferActive).toBe(true)
      expect(result.isTransferSuccess).toBe(false)
    })

    it('should preserve other state properties', () => {
      const customState: WalletState = {
        address: '0x1234567890123456789012345678901234567890',
        balance: '1000',
        isConnecting: false,
        isTransferActive: true,
        isTransferSuccess: true,
        error: 'Some error'
      }
      
      const action = connectWalletRequest()
      const result = walletReducer(customState, action)
      
      expect(result.isConnecting).toBe(true)
      expect(result.error).toBe(null)
      expect(result.address).toBe('0x1234567890123456789012345678901234567890')
      expect(result.balance).toBe('1000')
      expect(result.isTransferActive).toBe(true)
      expect(result.isTransferSuccess).toBe(true)
    })
  })

  describe('CONNECT_WALLET_SUCCESS', () => {
    it('should handle CONNECT_WALLET_SUCCESS action', () => {
      const address = '0x1234567890123456789012345678901234567890'
      const balance = '1000'
      const action = connectWalletSuccess(address, balance)
      const result = walletReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isConnecting: false,
        address,
        balance,
        error: null,
      })
    })

    it('should set connection success and clear error', () => {
      const connectingState: WalletState = {
        ...initialState,
        isConnecting: true,
        error: 'Some error'
      }
      
      const address = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
      const balance = '2000'
      const action = connectWalletSuccess(address, balance)
      const result = walletReducer(connectingState, action)
      
      expect(result.isConnecting).toBe(false)
      expect(result.address).toBe(address)
      expect(result.balance).toBe(balance)
      expect(result.error).toBe(null)
      expect(result.isTransferActive).toBe(true)
      expect(result.isTransferSuccess).toBe(false)
    })

    it('should work correctly from any previous state', () => {
      const complexState: WalletState = {
        address: '0xoldaddress',
        balance: '500',
        isConnecting: true,
        isTransferActive: false,
        isTransferSuccess: true,
        error: 'Connection error'
      }
      
      const address = '0xnewaddress'
      const balance = '3000'
      const action = connectWalletSuccess(address, balance)
      const result = walletReducer(complexState, action)
      
      expect(result.isConnecting).toBe(false)
      expect(result.address).toBe(address)
      expect(result.balance).toBe(balance)
      expect(result.error).toBe(null)
      expect(result.isTransferActive).toBe(false)
      expect(result.isTransferSuccess).toBe(true)
    })

    it('should handle empty address and balance', () => {
      const action = connectWalletSuccess('', '')
      const result = walletReducer(initialState, action)
      
      expect(result.address).toBe('')
      expect(result.balance).toBe('')
      expect(result.isConnecting).toBe(false)
      expect(result.error).toBe(null)
    })
  })

  describe('CONNECT_WALLET_FAILURE', () => {
    it('should handle CONNECT_WALLET_FAILURE action', () => {
      const errorMessage = 'User rejected the connection'
      const action = connectWalletFailure(errorMessage)
      const result = walletReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isConnecting: false,
        error: errorMessage,
      })
    })

    it('should set error and reset connecting flag', () => {
      const connectingState: WalletState = {
        ...initialState,
        isConnecting: true,
        address: '0x1234567890123456789012345678901234567890',
        balance: '1000'
      }
      
      const errorMessage = 'Network error'
      const action = connectWalletFailure(errorMessage)
      const result = walletReducer(connectingState, action)
      
      expect(result.isConnecting).toBe(false)
      expect(result.error).toBe(errorMessage)
      expect(result.address).toBe('0x1234567890123456789012345678901234567890')
      expect(result.balance).toBe('1000')
      expect(result.isTransferActive).toBe(true)
      expect(result.isTransferSuccess).toBe(false)
    })

    it('should handle empty error message', () => {
      const action = connectWalletFailure('')
      const result = walletReducer(initialState, action)
      
      expect(result.error).toBe('')
      expect(result.isConnecting).toBe(false)
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
        const result = walletReducer(initialState, action)
        
        expect(result.error).toBe(errorMessage)
        expect(result.isConnecting).toBe(false)
      })
    })
  })

  describe('UPDATE_BALANCE', () => {
    it('should handle UPDATE_BALANCE action', () => {
      const newBalance = '1500'
      const action = updateBalance(newBalance)
      const result = walletReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        balance: newBalance,
      })
    })

    it('should update balance while preserving other state', () => {
      const connectedState: WalletState = {
        address: '0x1234567890123456789012345678901234567890',
        balance: '1000',
        isConnecting: false,
        isTransferActive: true,
        isTransferSuccess: false,
        error: null
      }
      
      const newBalance = '2000'
      const action = updateBalance(newBalance)
      const result = walletReducer(connectedState, action)
      
      expect(result.balance).toBe(newBalance)
      expect(result.address).toBe('0x1234567890123456789012345678901234567890')
      expect(result.isConnecting).toBe(false)
      expect(result.isTransferActive).toBe(true)
      expect(result.isTransferSuccess).toBe(false)
      expect(result.error).toBe(null)
    })

    it('should handle zero balance', () => {
      const action = updateBalance('0')
      const result = walletReducer(initialState, action)
      
      expect(result.balance).toBe('0')
    })

    it('should handle empty balance', () => {
      const action = updateBalance('')
      const result = walletReducer(initialState, action)
      
      expect(result.balance).toBe('')
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
        const result = walletReducer(initialState, action)
        
        expect(result.balance).toBe(balance)
      })
    })
  })

  describe('State Immutability', () => {
    it('should not mutate the original state', () => {
      const originalState = { ...initialState }
      const action = connectWalletRequest()
      
      walletReducer(originalState, action)
      
      expect(originalState).toEqual(initialState)
    })

    it('should return a new state object', () => {
      const action = connectWalletRequest()
      const result = walletReducer(initialState, action)
      
      expect(result).not.toBe(initialState)
    })
  })

  describe('Action Type Handling', () => {
    it('should handle all wallet action types', () => {
      const actions = [
        connectWalletRequest(),
        connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000'),
        connectWalletFailure('Test error'),
        updateBalance('1500')
      ]
      
      let state = initialState
      
      actions.forEach(action => {
        state = walletReducer(state, action)
        expect(state).toBeDefined()
        expect(typeof state.address === 'string' || state.address === null).toBe(true)
        expect(typeof state.balance === 'string' || state.balance === null).toBe(true)
        expect(typeof state.isConnecting).toBe('boolean')
        expect(typeof state.isTransferActive).toBe('boolean')
        expect(typeof state.isTransferSuccess).toBe('boolean')
        expect(typeof state.error === 'string' || state.error === null).toBe(true)
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle null error in CONNECT_WALLET_FAILURE', () => {
      const action = {
        type: CONNECT_WALLET_FAILURE,
        payload: { error: null }
      }
      
      const result = walletReducer(initialState, action as any)
      
      expect(result.error).toBe(null)
    })

    it('should handle undefined error in CONNECT_WALLET_FAILURE', () => {
      const action = {
        type: CONNECT_WALLET_FAILURE,
        payload: { error: undefined }
      }
      
      const result = walletReducer(initialState, action as any)
      
      expect(result.error).toBe(undefined)
    })

    it('should handle very long error messages', () => {
      const longErrorMessage = 'A'.repeat(1000)
      const action = connectWalletFailure(longErrorMessage)
      const result = walletReducer(initialState, action)
      
      expect(result.error).toBe(longErrorMessage)
      expect(result.error?.length).toBe(1000)
    })

    it('should handle very long addresses', () => {
      const longAddress = '0x' + 'a'.repeat(100)
      const action = connectWalletSuccess(longAddress, '1000')
      const result = walletReducer(initialState, action)
      
      expect(result.address).toBe(longAddress)
      expect(result.address?.length).toBe(102)
    })

    it('should handle very long balances', () => {
      const longBalance = '9'.repeat(1000)
      const action = updateBalance(longBalance)
      const result = walletReducer(initialState, action)
      
      expect(result.balance).toBe(longBalance)
      expect(result.balance?.length).toBe(1000)
    })
  })

  describe('State Transitions', () => {
    it('should handle complete wallet connection flow', () => {
      let state = initialState
      
      // Request connection
      state = walletReducer(state, connectWalletRequest())
      expect(state.isConnecting).toBe(true)
      expect(state.error).toBe(null)
      
      // Success connection
      state = walletReducer(state, connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000'))
      expect(state.isConnecting).toBe(false)
      expect(state.address).toBe('0x1234567890123456789012345678901234567890')
      expect(state.balance).toBe('1000')
      expect(state.error).toBe(null)
      
      // Update balance
      state = walletReducer(state, updateBalance('1500'))
      expect(state.balance).toBe('1500')
      expect(state.address).toBe('0x1234567890123456789012345678901234567890')
    })

    it('should handle wallet connection failure flow', () => {
      let state = initialState
      
      // Request connection
      state = walletReducer(state, connectWalletRequest())
      expect(state.isConnecting).toBe(true)
      
      // Connection failure
      state = walletReducer(state, connectWalletFailure('User rejected the connection'))
      expect(state.isConnecting).toBe(false)
      expect(state.error).toBe('User rejected the connection')
      expect(state.address).toBe(null)
      expect(state.balance).toBe(null)
    })

    it('should handle multiple balance updates', () => {
      let state = initialState
      
      // Initial connection
      state = walletReducer(state, connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000'))
      expect(state.balance).toBe('1000')
      
      // Multiple balance updates
      state = walletReducer(state, updateBalance('1500'))
      expect(state.balance).toBe('1500')
      
      state = walletReducer(state, updateBalance('2000'))
      expect(state.balance).toBe('2000')
      
      state = walletReducer(state, updateBalance('0'))
      expect(state.balance).toBe('0')
    })

    it('should handle reconnection after failure', () => {
      let state = initialState
      
      // First connection attempt fails
      state = walletReducer(state, connectWalletRequest())
      state = walletReducer(state, connectWalletFailure('Network error'))
      expect(state.isConnecting).toBe(false)
      expect(state.error).toBe('Network error')
      
      // Second connection attempt succeeds
      state = walletReducer(state, connectWalletRequest())
      state = walletReducer(state, connectWalletSuccess('0x1234567890123456789012345678901234567890', '1000'))
      expect(state.isConnecting).toBe(false)
      expect(state.address).toBe('0x1234567890123456789012345678901234567890')
      expect(state.balance).toBe('1000')
      expect(state.error).toBe(null)
    })
  })
}) 