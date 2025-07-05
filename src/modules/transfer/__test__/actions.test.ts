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
  closeTransferModal,
  TransferRequestAction,
  TransferSuccessAction,
  TransferFailureAction,
  OpenTransferModalAction,
  CloseTransferModalAction
} from '../actions'

describe('Transfer Actions', () => {
  describe('Action Types', () => {
    it('should have correct action type constants', () => {
      expect(TRANSFER_REQUEST).toBe('[Request] Transfer')
      expect(TRANSFER_SUCCESS).toBe('[Success] Transfer')
      expect(TRANSFER_FAILURE).toBe('[Failure] Transfer')
      expect(OPEN_TRANSFER_MODAL).toBe('[Open] Transfer Modal')
      expect(CLOSE_TRANSFER_MODAL).toBe('[Close] Transfer Modal')
    })
  })

  describe('transferRequest', () => {
    it('should create a transfer request action with correct payload', () => {
      const amount = 100
      const destination = '0x1234567890123456789012345678901234567890'
      
      const action = transferRequest(amount, destination)
      
      expect(action).toEqual({
        type: TRANSFER_REQUEST,
        payload: {
          amount,
          destination
        }
      })
    })

    it('should handle zero amount', () => {
      const amount = 0
      const destination = '0x1234567890123456789012345678901234567890'
      
      const action = transferRequest(amount, destination)
      
      expect(action.payload.amount).toBe(0)
      expect(action.payload.destination).toBe(destination)
    })

    it('should handle decimal amounts', () => {
      const amount = 100.5
      const destination = '0x1234567890123456789012345678901234567890'
      
      const action = transferRequest(amount, destination)
      
      expect(action.payload.amount).toBe(100.5)
      expect(action.payload.destination).toBe(destination)
    })

    it('should handle very large amounts', () => {
      const amount = 999999999999999999
      const destination = '0x1234567890123456789012345678901234567890'
      
      const action = transferRequest(amount, destination)
      
      expect(action.payload.amount).toBe(999999999999999999)
      expect(action.payload.destination).toBe(destination)
    })

    it('should handle different destination addresses', () => {
      const amount = 100
      const destinations = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        '0x0000000000000000000000000000000000000000',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
      ]
      
      destinations.forEach(destination => {
        const action = transferRequest(amount, destination)
        expect(action.payload.destination).toBe(destination)
        expect(action.payload.amount).toBe(amount)
      })
    })

    it('should have correct action type', () => {
      const action = transferRequest(100, '0x1234567890123456789012345678901234567890')
      
      expect(action.type).toBe(TRANSFER_REQUEST)
    })
  })

  describe('transferSuccess', () => {
    it('should create a transfer success action', () => {
      const action = transferSuccess()
      
      expect(action).toEqual({
        type: TRANSFER_SUCCESS,
        payload: {}
      })
    })

    it('should have correct action type', () => {
      const action = transferSuccess()
      
      expect(action.type).toBe(TRANSFER_SUCCESS)
    })

    it('should have empty payload', () => {
      const action = transferSuccess()
      
      expect(action.payload).toEqual({})
    })
  })

  describe('transferFailure', () => {
    it('should create a transfer failure action with error message', () => {
      const errorMessage = 'Transfer failed due to insufficient balance'
      
      const action = transferFailure(errorMessage)
      
      expect(action).toEqual({
        type: TRANSFER_FAILURE,
        payload: {
          error: errorMessage
        }
      })
    })

    it('should handle empty error message', () => {
      const errorMessage = ''
      
      const action = transferFailure(errorMessage)
      
      expect(action.payload.error).toBe('')
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
        expect(action.payload.error).toBe(errorMessage)
        expect(action.type).toBe(TRANSFER_FAILURE)
      })
    })

    it('should have correct action type', () => {
      const action = transferFailure('Test error')
      
      expect(action.type).toBe(TRANSFER_FAILURE)
    })
  })

  describe('openTransferModal', () => {
    it('should create an open transfer modal action', () => {
      const action = openTransferModal()
      
      expect(action).toEqual({
        type: OPEN_TRANSFER_MODAL,
        payload: {}
      })
    })

    it('should have correct action type', () => {
      const action = openTransferModal()
      
      expect(action.type).toBe(OPEN_TRANSFER_MODAL)
    })

    it('should have empty payload', () => {
      const action = openTransferModal()
      
      expect(action.payload).toEqual({})
    })
  })

  describe('closeTransferModal', () => {
    it('should create a close transfer modal action', () => {
      const action = closeTransferModal()
      
      expect(action).toEqual({
        type: CLOSE_TRANSFER_MODAL,
        payload: {}
      })
    })

    it('should have correct action type', () => {
      const action = closeTransferModal()
      
      expect(action.type).toBe(CLOSE_TRANSFER_MODAL)
    })

    it('should have empty payload', () => {
      const action = closeTransferModal()
      
      expect(action.payload).toEqual({})
    })
  })

  describe('Action Type Definitions', () => {
    it('should have correct TransferRequestAction type', () => {
      const action: TransferRequestAction = transferRequest(100, '0x1234567890123456789012345678901234567890')
      
      expect(action.type).toBe(TRANSFER_REQUEST)
      expect(action.payload).toHaveProperty('amount')
      expect(action.payload).toHaveProperty('destination')
    })

    it('should have correct TransferSuccessAction type', () => {
      const action: TransferSuccessAction = transferSuccess()
      
      expect(action.type).toBe(TRANSFER_SUCCESS)
      expect(action.payload).toEqual({})
    })

    it('should have correct TransferFailureAction type', () => {
      const action: TransferFailureAction = transferFailure('Test error')
      
      expect(action.type).toBe(TRANSFER_FAILURE)
      expect(action.payload).toHaveProperty('error')
    })

    it('should have correct OpenTransferModalAction type', () => {
      const action: OpenTransferModalAction = openTransferModal()
      
      expect(action.type).toBe(OPEN_TRANSFER_MODAL)
      expect(action.payload).toEqual({})
    })

    it('should have correct CloseTransferModalAction type', () => {
      const action: CloseTransferModalAction = closeTransferModal()
      
      expect(action.type).toBe(CLOSE_TRANSFER_MODAL)
      expect(action.payload).toEqual({})
    })
  })

  describe('Edge Cases', () => {
    it('should handle negative amounts in transferRequest', () => {
      const amount = -100
      const destination = '0x1234567890123456789012345678901234567890'
      
      const action = transferRequest(amount, destination)
      
      expect(action.payload.amount).toBe(-100)
      expect(action.payload.destination).toBe(destination)
    })

    it('should handle very long destination addresses', () => {
      const amount = 100
      const destination = '0x' + 'a'.repeat(100)
      
      const action = transferRequest(amount, destination)
      
      expect(action.payload.amount).toBe(100)
      expect(action.payload.destination).toBe(destination)
    })

    it('should handle special characters in error messages', () => {
      const errorMessages = [
        'Error with special chars: !@#$%^&*()',
        'Error with unicode: ñáéíóú',
        'Error with numbers: 1234567890',
        'Error with spaces: multiple words',
        'Error with newlines: \n line break',
        'Error with tabs: \t tab character'
      ]
      
      errorMessages.forEach(errorMessage => {
        const action = transferFailure(errorMessage)
        expect(action.payload.error).toBe(errorMessage)
      })
    })

    it('should handle very long error messages', () => {
      const longErrorMessage = 'A'.repeat(1000)
      
      const action = transferFailure(longErrorMessage)
      
      expect(action.payload.error).toBe(longErrorMessage)
      expect(action.payload.error.length).toBe(1000)
    })
  })

  describe('Action Immutability', () => {
    it('should not mutate the original parameters in transferRequest', () => {
      const amount = 100
      const destination = '0x1234567890123456789012345678901234567890'
      
      const action = transferRequest(amount, destination)
      
      // Modify the action payload
      action.payload.amount = 200
      action.payload.destination = '0xmodified'
      
      // Original parameters should remain unchanged
      expect(amount).toBe(100)
      expect(destination).toBe('0x1234567890123456789012345678901234567890')
    })

    it('should not mutate the original error in transferFailure', () => {
      const originalError = 'Original error'
      
      const action = transferFailure(originalError)
      
      // Modify the action payload
      action.payload.error = 'Modified error'
      
      // Original error should remain unchanged
      expect(originalError).toBe('Original error')
    })
  })

  describe('Action Consistency', () => {
    it('should maintain consistent action structure across all actions', () => {
      const actions = [
        transferRequest(100, '0x1234567890123456789012345678901234567890'),
        transferSuccess(),
        transferFailure('Test error'),
        openTransferModal(),
        closeTransferModal()
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
        TRANSFER_REQUEST,
        TRANSFER_SUCCESS,
        TRANSFER_FAILURE,
        OPEN_TRANSFER_MODAL,
        CLOSE_TRANSFER_MODAL
      ]
      
      const uniqueTypes = new Set(actionTypes)
      expect(uniqueTypes.size).toBe(actionTypes.length)
    })
  })
}) 