import { transferReducer } from '../reducer'
import {
  TRANSFER_REQUEST,
  TRANSFER_SUCCESS,
  TRANSFER_FAILURE,
  OPEN_TRANSFER_MODAL,
  CLOSE_TRANSFER_MODAL,
  transferRequest,
  transferSuccess,
  transferFailure,
  openTransferModal,
  closeTransferModal
} from '../actions'
import { TransferState } from '../types'

describe('Transfer Reducer', () => {
  const initialState: TransferState = {
    isTransfered: false,
    isTransfering: false,
    isTransferSuccess: false,
    isOpen: false,
    error: null,
  }

  describe('Initial State', () => {
    it('should return initial state when no action is provided', () => {
      const result = transferReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)
      
      expect(result).toEqual(initialState)
    })

    it('should return initial state when unknown action is dispatched', () => {
      const result = transferReducer(initialState, { type: 'UNKNOWN_ACTION' } as any)
      
      expect(result).toEqual(initialState)
    })

    it('should have correct initial state structure', () => {
      const state = transferReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)
      
      expect(state).toHaveProperty('isTransfered', false)
      expect(state).toHaveProperty('isTransfering', false)
      expect(state).toHaveProperty('isTransferSuccess', false)
      expect(state).toHaveProperty('isOpen', false)
      expect(state).toHaveProperty('error', null)
    })
  })

  describe('TRANSFER_REQUEST', () => {
    it('should handle TRANSFER_REQUEST action', () => {
      const action = transferRequest(100, '0x1234567890123456789012345678901234567890')
      const result = transferReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isTransfering: true,
        error: null,
      })
    })

    it('should set isTransfering to true and clear error', () => {
      const stateWithError: TransferState = {
        ...initialState,
        error: 'Previous error'
      }
      
      const action = transferRequest(50, '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')
      const result = transferReducer(stateWithError, action)
      
      expect(result.isTransfering).toBe(true)
      expect(result.error).toBe(null)
      expect(result.isTransfered).toBe(false)
      expect(result.isTransferSuccess).toBe(false)
      expect(result.isOpen).toBe(false)
    })

    it('should preserve other state properties', () => {
      const customState: TransferState = {
        isTransfered: true,
        isTransfering: false,
        isTransferSuccess: true,
        isOpen: true,
        error: 'Some error'
      }
      
      const action = transferRequest(200, '0x1234567890123456789012345678901234567890')
      const result = transferReducer(customState, action)
      
      expect(result.isTransfering).toBe(true)
      expect(result.error).toBe(null)
      expect(result.isTransfered).toBe(true)
      expect(result.isTransferSuccess).toBe(true)
      expect(result.isOpen).toBe(true)
    })
  })

  describe('TRANSFER_SUCCESS', () => {
    it('should handle TRANSFER_SUCCESS action', () => {
      const action = transferSuccess()
      const result = transferReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isTransfered: true,
        isTransfering: false,
        isTransferSuccess: true,
        isOpen: false,
        error: null,
      })
    })

    it('should set transfer success flags and close modal', () => {
      const transferringState: TransferState = {
        ...initialState,
        isTransfering: true,
        isOpen: true,
        error: 'Some error'
      }
      
      const action = transferSuccess()
      const result = transferReducer(transferringState, action)
      
      expect(result.isTransfered).toBe(true)
      expect(result.isTransfering).toBe(false)
      expect(result.isTransferSuccess).toBe(true)
      expect(result.isOpen).toBe(false)
      expect(result.error).toBe(null)
    })

    it('should work correctly from any previous state', () => {
      const complexState: TransferState = {
        isTransfered: false,
        isTransfering: true,
        isTransferSuccess: false,
        isOpen: true,
        error: 'Transfer error'
      }
      
      const action = transferSuccess()
      const result = transferReducer(complexState, action)
      
      expect(result.isTransfered).toBe(true)
      expect(result.isTransfering).toBe(false)
      expect(result.isTransferSuccess).toBe(true)
      expect(result.isOpen).toBe(false)
      expect(result.error).toBe(null)
    })
  })

  describe('TRANSFER_FAILURE', () => {
    it('should handle TRANSFER_FAILURE action', () => {
      const errorMessage = 'Transfer failed due to insufficient balance'
      const action = transferFailure(errorMessage)
      const result = transferReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isTransfered: false,
        isTransfering: false,
        error: errorMessage,
      })
    })

    it('should set error and reset transfer flags', () => {
      const transferringState: TransferState = {
        ...initialState,
        isTransfering: true,
        isTransfered: true,
        isTransferSuccess: true
      }
      
      const errorMessage = 'Network error'
      const action = transferFailure(errorMessage)
      const result = transferReducer(transferringState, action)
      
      expect(result.isTransfered).toBe(false)
      expect(result.isTransfering).toBe(false)
      expect(result.error).toBe(errorMessage)
      expect(result.isTransferSuccess).toBe(false)
      expect(result.isOpen).toBe(false)
    })

    it('should handle empty error message', () => {
      const action = transferFailure('')
      const result = transferReducer(initialState, action)
      
      expect(result.error).toBe('')
      expect(result.isTransfered).toBe(false)
      expect(result.isTransfering).toBe(false)
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
        const action = transferFailure(errorMessage)
        const result = transferReducer(initialState, action)
        
        expect(result.error).toBe(errorMessage)
        expect(result.isTransfered).toBe(false)
        expect(result.isTransfering).toBe(false)
      })
    })
  })

  describe('OPEN_TRANSFER_MODAL', () => {
    it('should handle OPEN_TRANSFER_MODAL action', () => {
      const action = openTransferModal()
      const result = transferReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isOpen: true,
        error: null,
      })
    })

    it('should open modal and clear error', () => {
      const stateWithError: TransferState = {
        ...initialState,
        error: 'Previous error'
      }
      
      const action = openTransferModal()
      const result = transferReducer(stateWithError, action)
      
      expect(result.isOpen).toBe(true)
      expect(result.error).toBe(null)
      expect(result.isTransfered).toBe(false)
      expect(result.isTransfering).toBe(false)
      expect(result.isTransferSuccess).toBe(false)
    })

    it('should work when modal is already open', () => {
      const openModalState: TransferState = {
        ...initialState,
        isOpen: true
      }
      
      const action = openTransferModal()
      const result = transferReducer(openModalState, action)
      
      expect(result.isOpen).toBe(true)
      expect(result.error).toBe(null)
    })
  })

  describe('CLOSE_TRANSFER_MODAL', () => {
    it('should handle CLOSE_TRANSFER_MODAL action', () => {
      const action = closeTransferModal()
      const result = transferReducer(initialState, action)
      
      expect(result).toEqual({
        ...initialState,
        isOpen: false,
        error: null,
      })
    })

    it('should close modal and clear error', () => {
      const openModalState: TransferState = {
        ...initialState,
        isOpen: true,
        error: 'Some error'
      }
      
      const action = closeTransferModal()
      const result = transferReducer(openModalState, action)
      
      expect(result.isOpen).toBe(false)
      expect(result.error).toBe(null)
      expect(result.isTransfered).toBe(false)
      expect(result.isTransfering).toBe(false)
      expect(result.isTransferSuccess).toBe(false)
    })

    it('should work when modal is already closed', () => {
      const closedModalState: TransferState = {
        ...initialState,
        isOpen: false
      }
      
      const action = closeTransferModal()
      const result = transferReducer(closedModalState, action)
      
      expect(result.isOpen).toBe(false)
      expect(result.error).toBe(null)
    })
  })

  describe('State Immutability', () => {
    it('should not mutate the original state', () => {
      const originalState = { ...initialState }
      const action = transferRequest(100, '0x1234567890123456789012345678901234567890')
      
      transferReducer(originalState, action)
      
      expect(originalState).toEqual(initialState)
    })

    it('should return a new state object', () => {
      const action = transferRequest(100, '0x1234567890123456789012345678901234567890')
      const result = transferReducer(initialState, action)
      
      expect(result).not.toBe(initialState)
    })
  })

  describe('Action Type Handling', () => {
    it('should handle all transfer action types', () => {
      const actions = [
        transferRequest(100, '0x1234567890123456789012345678901234567890'),
        transferSuccess(),
        transferFailure('Test error'),
        openTransferModal(),
        closeTransferModal()
      ]
      
      let state = initialState
      
      actions.forEach(action => {
        state = transferReducer(state, action)
        expect(state).toBeDefined()
        expect(typeof state.isTransfered).toBe('boolean')
        expect(typeof state.isTransfering).toBe('boolean')
        expect(typeof state.isTransferSuccess).toBe('boolean')
        expect(typeof state.isOpen).toBe('boolean')
        expect(typeof state.error === 'string' || state.error === null).toBe(true)
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle null error in TRANSFER_FAILURE', () => {
      const action = {
        type: TRANSFER_FAILURE,
        payload: { error: null }
      }
      
      const result = transferReducer(initialState, action as any)
      
      expect(result.error).toBe(null)
    })

    it('should handle undefined error in TRANSFER_FAILURE', () => {
      const action = {
        type: TRANSFER_FAILURE,
        payload: { error: undefined }
      }
      
      const result = transferReducer(initialState, action as any)
      
      expect(result.error).toBe(undefined)
    })

    it('should handle very long error messages', () => {
      const longErrorMessage = 'A'.repeat(1000)
      const action = transferFailure(longErrorMessage)
      const result = transferReducer(initialState, action)
      
      expect(result.error).toBe(longErrorMessage)
      expect(result.error?.length).toBe(1000)
    })
  })

  describe('State Transitions', () => {
    it('should handle complete transfer flow', () => {
      let state = initialState
      
      // Open modal
      state = transferReducer(state, openTransferModal())
      expect(state.isOpen).toBe(true)
      expect(state.error).toBe(null)
      
      // Start transfer
      state = transferReducer(state, transferRequest(100, '0x1234567890123456789012345678901234567890'))
      expect(state.isTransfering).toBe(true)
      expect(state.error).toBe(null)
      expect(state.isOpen).toBe(true)
      
      // Transfer success
      state = transferReducer(state, transferSuccess())
      expect(state.isTransfered).toBe(true)
      expect(state.isTransfering).toBe(false)
      expect(state.isTransferSuccess).toBe(true)
      expect(state.isOpen).toBe(false)
      expect(state.error).toBe(null)
    })

    it('should handle transfer failure flow', () => {
      let state = initialState
      
      // Open modal
      state = transferReducer(state, openTransferModal())
      expect(state.isOpen).toBe(true)
      
      // Start transfer
      state = transferReducer(state, transferRequest(100, '0x1234567890123456789012345678901234567890'))
      expect(state.isTransfering).toBe(true)
      
      // Transfer failure
      state = transferReducer(state, transferFailure('Insufficient balance'))
      expect(state.isTransfered).toBe(false)
      expect(state.isTransfering).toBe(false)
      expect(state.error).toBe('Insufficient balance')
      expect(state.isOpen).toBe(true) // Modal stays open on failure
    })
  })
}) 