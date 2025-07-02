import { reducer } from '../reducer'

describe('reducer', () => {
  it('should combine wallet and transfer reducers', () => {
    const state = reducer(undefined, { type: '@@INIT' })
    
    expect(state).toHaveProperty('wallet')
    expect(state).toHaveProperty('transfer')
  })

  it('should have initial state structure', () => {
    const state = reducer(undefined, { type: '@@INIT' })
    
    // Verificar que el estado tiene la estructura esperada
    expect(typeof state).toBe('object')
    expect(state).not.toBeNull()
  })

  it('should handle unknown actions without throwing', () => {
    const initialState = reducer(undefined, { type: '@@INIT' })
    const action = { type: 'UNKNOWN_ACTION', payload: 'test' }
    
    expect(() => {
      reducer(initialState, action)
    }).not.toThrow()
  })

  it('should return the same state for unknown actions', () => {
    const initialState = reducer(undefined, { type: '@@INIT' })
    const action = { type: 'UNKNOWN_ACTION', payload: 'test' }
    const newState = reducer(initialState, action)
    
    expect(newState).toBe(initialState)
  })
}) 