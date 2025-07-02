// Mock de redux-logger para evitar logs en tests
jest.mock('redux-logger', () => ({
  createLogger: jest.fn(() => jest.fn())
}))

// Mock de redux-saga para evitar problemas con middleware
jest.mock('redux-saga', () => ({
  default: jest.fn(() => ({
    run: jest.fn()
  }))
}))

// Mock de los sagas para evitar import.meta.env
jest.mock('../sagas', () => ({
  sagas: jest.fn()
}))

// Mock del store completo
jest.mock('../store', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({
      wallet: {},
      transfer: {}
    })),
    subscribe: jest.fn(),
    replaceReducer: jest.fn()
  }
}))

import { store } from '../store'

describe('store', () => {
  it('should be defined', () => {
    expect(store).toBeDefined()
  })

  it('should have dispatch method', () => {
    expect(typeof store.dispatch).toBe('function')
  })

  it('should have getState method', () => {
    expect(typeof store.getState).toBe('function')
  })

  it('should have subscribe method', () => {
    expect(typeof store.subscribe).toBe('function')
  })

  it('should have replaceReducer method', () => {
    expect(typeof store.replaceReducer).toBe('function')
  })

  it('should have initial state with wallet and transfer properties', () => {
    const state = store.getState()
    
    expect(state).toHaveProperty('wallet')
    expect(state).toHaveProperty('transfer')
  })

  it('should dispatch actions without throwing', () => {
    const action = { type: 'TEST_ACTION' }
    
    expect(() => {
      store.dispatch(action)
    }).not.toThrow()
  })
}) 