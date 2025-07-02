import { isErrorWithMessage, TOKEN_ABI } from '../utils'

describe('utils', () => {
  describe('isErrorWithMessage', () => {
    it('should return true for Error objects', () => {
      const error = new Error('Test error')
      expect(isErrorWithMessage(error)).toBe(true)
    })

    it('should return true for objects with message property', () => {
      const error = { message: 'Custom error message' }
      expect(isErrorWithMessage(error)).toBe(true)
    })

    it('should return false for undefined', () => {
      expect(isErrorWithMessage(undefined)).toBe(false)
    })

    it('should return false for null', () => {
      expect(isErrorWithMessage(null)).toBe(false)
    })

    it('should return false for strings', () => {
      expect(isErrorWithMessage('error message')).toBe(false)
    })

    it('should return false for numbers', () => {
      expect(isErrorWithMessage(123)).toBe(false)
    })

    it('should return false for objects without message property', () => {
      const obj = { code: 500, status: 'error' }
      expect(isErrorWithMessage(obj)).toBe(false)
    })
  })

  describe('TOKEN_ABI', () => {
    it('should contain the expected ABI functions', () => {
      expect(TOKEN_ABI).toHaveLength(3)
      expect(TOKEN_ABI).toContain('function symbol() view returns (string)')
      expect(TOKEN_ABI).toContain('function balanceOf(address) view returns (uint)')
      expect(TOKEN_ABI).toContain('function transfer(address to, uint amount)')
    })

    it('should be an array of strings', () => {
      expect(Array.isArray(TOKEN_ABI)).toBe(true)
      TOKEN_ABI.forEach(item => {
        expect(typeof item).toBe('string')
      })
    })
  })
}) 