import { transferReducer } from '../reducer'
import { 
  TRANSFER_REQUEST, 
  TRANSFER_SUCCESS, 
  TRANSFER_FAILURE, 
  OPEN_TRANSFER_MODAL, 
  CLOSE_TRANSFER_MODAL 
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

  describe('TRANSFER_REQUEST', () => {
    it('should set isTransfering to true and clear error when transfer request is made', () => {
      const stateWithError: TransferState = {
        ...initialState,
        error: 'Previous error',
        isTransfered: true,
        isTransferSuccess: true,
      }

      const action = {
        type: TRANSFER_REQUEST,
        payload: { amount: 100, destination: '0x123' }
      }

      const result = transferReducer(stateWithError, action)

      expect(result).toEqual({
        ...stateWithError,
        isTransfering: true,
        error: null,
      })
    })

    it('should preserve other state properties when transfer request is made', () => {
      const customState: TransferState = {
        ...initialState,
        isOpen: true,
      }

      const action = {
        type: TRANSFER_REQUEST,
        payload: { amount: 50, destination: '0x456' }
      }

      const result = transferReducer(customState, action)

      expect(result.isOpen).toBe(true)
      expect(result.isTransfering).toBe(true)
      expect(result.error).toBe(null)
    })
  })

  describe('TRANSFER_SUCCESS', () => {
    it('should set transfer success flags and close modal when transfer succeeds', () => {
      const stateWithTransfering: TransferState = {
        ...initialState,
        isTransfering: true,
        isOpen: true,
        error: 'Some error',
      }

      const action = {
        type: TRANSFER_SUCCESS,
        payload: {}
      }

      const result = transferReducer(stateWithTransfering, action)

      expect(result).toEqual({
        ...stateWithTransfering,
        isTransfered: true,
        isTransfering: false,
        isTransferSuccess: true,
        isOpen: false,
        error: null,
      })
    })

    it('should handle transfer success from any previous state', () => {
      const action = {
        type: TRANSFER_SUCCESS,
        payload: {}
      }

      const result = transferReducer(initialState, action)

      expect(result.isTransfered).toBe(true)
      expect(result.isTransfering).toBe(false)
      expect(result.isTransferSuccess).toBe(true)
      expect(result.isOpen).toBe(false)
      expect(result.error).toBe(null)
    })
  })

  describe('TRANSFER_FAILURE', () => {
    it('should set error and reset transfer flags when transfer fails', () => {
      const stateWithTransfering: TransferState = {
        ...initialState,
        isTransfering: true,
        isTransfered: true,
        isTransferSuccess: true,
        isOpen: true,
      }

      const errorMessage = 'Transfer failed due to insufficient funds'
      const action = {
        type: TRANSFER_FAILURE,
        payload: { error: errorMessage }
      }

      const result = transferReducer(stateWithTransfering, action)

      expect(result).toEqual({
        ...stateWithTransfering,
        isTransfered: false,
        isTransfering: false,
        error: errorMessage,
      })
    })

    it('should preserve modal state when transfer fails', () => {
      const stateWithOpenModal: TransferState = {
        ...initialState,
        isTransfering: true,
        isOpen: true,
      }

      const action = {
        type: TRANSFER_FAILURE,
        payload: { error: 'Network error' }
      }

      const result = transferReducer(stateWithOpenModal, action)

      expect(result.isOpen).toBe(true)
      expect(result.error).toBe('Network error')
      expect(result.isTransfering).toBe(false)
    })
  })

  describe('OPEN_TRANSFER_MODAL', () => {
    it('should open the transfer modal and clear any existing error', () => {
      const stateWithError: TransferState = {
        ...initialState,
        error: 'Previous error message',
      }

      const action = {
        type: OPEN_TRANSFER_MODAL,
        payload: {}
      }

      const result = transferReducer(stateWithError, action)

      expect(result).toEqual({
        ...stateWithError,
        isOpen: true,
        error: null,
      })
    })

    it('should preserve other state properties when opening modal', () => {
      const customState: TransferState = {
        ...initialState,
        isTransfered: true,
        isTransferSuccess: true,
      }

      const action = {
        type: OPEN_TRANSFER_MODAL,
        payload: {}
      }

      const result = transferReducer(customState, action)

      expect(result.isTransfered).toBe(true)
      expect(result.isTransferSuccess).toBe(true)
      expect(result.isOpen).toBe(true)
      expect(result.error).toBe(null)
    })
  })

  describe('CLOSE_TRANSFER_MODAL', () => {
    it('should close the transfer modal and clear any existing error', () => {
      const stateWithOpenModal: TransferState = {
        ...initialState,
        isOpen: true,
        error: 'Some error message',
      }

      const action = {
        type: CLOSE_TRANSFER_MODAL,
        payload: {}
      }

      const result = transferReducer(stateWithOpenModal, action)

      expect(result).toEqual({
        ...stateWithOpenModal,
        isOpen: false,
        error: null,
      })
    })

    it('should preserve other state properties when closing modal', () => {
      const customState: TransferState = {
        ...initialState,
        isTransfered: true,
        isTransferSuccess: true,
        isOpen: true,
      }

      const action = {
        type: CLOSE_TRANSFER_MODAL,
        payload: {}
      }

      const result = transferReducer(customState, action)

      expect(result.isTransfered).toBe(true)
      expect(result.isTransferSuccess).toBe(true)
      expect(result.isOpen).toBe(false)
      expect(result.error).toBe(null)
    })
  })

  describe('State Transitions', () => {
    it('should handle complete transfer flow: request -> success', () => {
      let state = initialState

      // Request transfer
      state = transferReducer(state, {
        type: TRANSFER_REQUEST,
        payload: { amount: 100, destination: '0x123' }
      })
      expect(state.isTransfering).toBe(true)
      expect(state.error).toBe(null)

      // Transfer succeeds
      state = transferReducer(state, {
        type: TRANSFER_SUCCESS,
        payload: {}
      })
      expect(state.isTransfered).toBe(true)
      expect(state.isTransfering).toBe(false)
      expect(state.isTransferSuccess).toBe(true)
      expect(state.error).toBe(null)
    })

    it('should handle complete transfer flow: request -> failure', () => {
      let state = initialState

      // Request transfer
      state = transferReducer(state, {
        type: TRANSFER_REQUEST,
        payload: { amount: 100, destination: '0x123' }
      })
      expect(state.isTransfering).toBe(true)

      // Transfer fails
      state = transferReducer(state, {
        type: TRANSFER_FAILURE,
        payload: { error: 'Insufficient balance' }
      })
      expect(state.isTransfered).toBe(false)
      expect(state.isTransfering).toBe(false)
      expect(state.error).toBe('Insufficient balance')
    })

    it('should handle modal open/close cycle', () => {
      let state = initialState

      // Open modal
      state = transferReducer(state, {
        type: OPEN_TRANSFER_MODAL,
        payload: {}
      })
      expect(state.isOpen).toBe(true)

      // Close modal
      state = transferReducer(state, {
        type: CLOSE_TRANSFER_MODAL,
        payload: {}
      })
      expect(state.isOpen).toBe(false)
    })
  })
}) 