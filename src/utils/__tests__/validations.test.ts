import {
  validateAmount,
  validateEthereumAddress,
  validateTransferForm,
  ValidationResult,
  ETHEREUM_ADDRESS_LENGTH,
  ETHEREUM_ADDRESS_REGEX,
  MAX_DECIMAL_PLACES
} from '../validations'

describe('Validation Functions', () => {
  describe('validateAmount', () => {
    it('should return valid for positive numbers', () => {
      const validAmounts = ['1', '100', '0.5', '999.999', '1.000000000000000001']
      
      validAmounts.forEach(amount => {
        const result = validateAmount(amount)
        expect(result.isValid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })

    it('should return invalid for empty or whitespace', () => {
      const invalidAmounts = ['', '   ', '\t', '\n']
      
      invalidAmounts.forEach(amount => {
        const result = validateAmount(amount)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe('Amount is required')
      })
    })

    it('should return invalid for non-numeric values', () => {
      const invalidAmounts = ['abc', '12abc', 'abc12', '12.34.56', '1,000']
      
      invalidAmounts.forEach(amount => {
        const result = validateAmount(amount)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe('Amount must be a valid number')
      })
    })

    it('should return invalid for zero or negative numbers', () => {
      const invalidAmounts = ['0', '-1', '-0.5', '-100']
      
      invalidAmounts.forEach(amount => {
        const result = validateAmount(amount)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe('Amount must be greater than 0')
      })
    })

    it('should return invalid for too many decimal places', () => {
      const invalidAmount = '1.' + '0'.repeat(MAX_DECIMAL_PLACES + 1)
      const result = validateAmount(invalidAmount)
      
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe(`Amount cannot have more than ${MAX_DECIMAL_PLACES} decimal places`)
    })

    it('should return valid for maximum decimal places', () => {
      const validAmount = '1.' + '0'.repeat(MAX_DECIMAL_PLACES)
      const result = validateAmount(validAmount)
      
      expect(result.isValid).toBe(true)
      expect(result.errorMessage).toBe('')
    })

    it('should handle edge cases', () => {
      const edgeCases = [
        { input: '0.000000000000000001', expected: true },
        { input: '999999999999999999', expected: true },
        { input: 'NaN', expected: false }
      ]
      
      edgeCases.forEach(({ input, expected }) => {
        const result = validateAmount(input)
        expect(result.isValid).toBe(expected)
      })
    })
  })

  describe('validateEthereumAddress', () => {
    it('should return valid for correct Ethereum addresses', () => {
      const validAddresses = [
        '0x1234567890123456789012345678901234567890',
        '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD',
        '0x0000000000000000000000000000000000000000'
      ]
      
      validAddresses.forEach(address => {
        const result = validateEthereumAddress(address)
        expect(result.isValid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })

    it('should return invalid for empty or whitespace', () => {
      const invalidAddresses = ['', '   ', '\t', '\n']
      
      invalidAddresses.forEach(address => {
        const result = validateEthereumAddress(address)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe('Destination is required')
      })
    })

    it('should return invalid for addresses not starting with 0x', () => {
      const invalidAddresses = [
        '123456789012345678901234567890123456789043',
        '0X1234567890123456789012345678901234567890',
        '0Cx123456789012345678901234567890123456789'
      ]
      
      invalidAddresses.forEach(address => {
        const result = validateEthereumAddress(address)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe('Destination must start with 0x')
      })
    })

    it('should return invalid for wrong length addresses', () => {
      const invalidAddresses = [
        '0x123456789012345678901234567890123456789', // 41 chars
        '0x12345678901234567890123456789012345678901', // 43 chars
        '0x1234', // Too short
        '0x' + 'a'.repeat(100) // Too long
      ]
      
      invalidAddresses.forEach(address => {
        const result = validateEthereumAddress(address)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe(`Destination must be ${ETHEREUM_ADDRESS_LENGTH} characters long`)
      })
    })

    it('should return invalid for non-hexadecimal characters', () => {
      const invalidAddresses = [
        '0x123456789012345678901234567890123456789g', // Contains 'g'
        '0x123456789012345678901234567890123456789G', // Contains 'G'
        '0x123456789012345678901234567890123456789!', // Contains '!'
      ]
      
      invalidAddresses.forEach(address => {
        const result = validateEthereumAddress(address)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe('Destination must be a valid Ethereum address')
      })
    })

    it('should handle whitespace trimming', () => {
      const address = '0x1234567890123456789012345678901234567890'
      const addressesWithWhitespace = [
        ` ${address}`,
        `${address} `,
        `  ${address}  `,
        `\t${address}\t`,
        `\n${address}\n`
      ]
      
      addressesWithWhitespace.forEach(addressWithWhitespace => {
        const result = validateEthereumAddress(addressWithWhitespace)
        expect(result.isValid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })

    it('should handle case sensitivity', () => {
      const address = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
      const upperCaseAddress = '0xABCDEFABCDEFABCDEFABCDEFABCDEFABCDEFABCD'
      
      expect(validateEthereumAddress(address).isValid).toBe(true)
      expect(validateEthereumAddress(upperCaseAddress).isValid).toBe(true)
    })
  })

  describe('validateTransferForm', () => {
    it('should return valid when both amount and destination are valid', () => {
      const validAmount = '100'
      const validDestination = '0x1234567890123456789012345678901234567890'
      
      const result = validateTransferForm(validAmount, validDestination)
      
      expect(result.isValid).toBe(true)
      expect(result.errorMessage).toBe('')
    })

    it('should return amount error when amount is invalid', () => {
      const invalidAmount = '0'
      const validDestination = '0x1234567890123456789012345678901234567890'
      
      const result = validateTransferForm(invalidAmount, validDestination)
      
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe('Amount must be greater than 0')
    })

    it('should return destination error when destination is invalid', () => {
      const validAmount = '100'
      const invalidDestination = 'invalid-address'
      
      const result = validateTransferForm(validAmount, invalidDestination)
      
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe('Destination must start with 0x')
    })

    it('should prioritize amount validation over destination validation', () => {
      const invalidAmount = ''
      const invalidDestination = 'invalid-address'
      
      const result = validateTransferForm(invalidAmount, invalidDestination)
      
      expect(result.isValid).toBe(false)
      expect(result.errorMessage).toBe('Amount is required')
    })

    it('should handle edge cases', () => {
      const edgeCases = [
        { amount: '', destination: '', expectedError: 'Amount is required' },
        { amount: '0', destination: '', expectedError: 'Amount must be greater than 0' },
        { amount: '100', destination: '', expectedError: 'Destination is required' },
        { amount: '100', destination: '0x123', expectedError: 'Destination must be 42 characters long' }
      ]
      
      edgeCases.forEach(({ amount, destination, expectedError }) => {
        const result = validateTransferForm(amount, destination)
        expect(result.isValid).toBe(false)
        expect(result.errorMessage).toBe(expectedError)
      })
    })
  })

  describe('Constants', () => {
    it('should have correct Ethereum address length', () => {
      expect(ETHEREUM_ADDRESS_LENGTH).toBe(42)
    })

    it('should have correct max decimal places', () => {
      expect(MAX_DECIMAL_PLACES).toBe(18)
    })

    it('should have valid Ethereum address regex', () => {
      const validAddress = '0x1234567890123456789012345678901234567890'
      const invalidAddress = '0x123456789012345678901234567890123456789g'
      
      expect(ETHEREUM_ADDRESS_REGEX.test(validAddress)).toBe(true)
      expect(ETHEREUM_ADDRESS_REGEX.test(invalidAddress)).toBe(false)
    })
  })

  describe('ValidationResult interface', () => {
    it('should have correct structure', () => {
      const result: ValidationResult = {
        isValid: true,
        errorMessage: ''
      }
      
      expect(result).toHaveProperty('isValid')
      expect(result).toHaveProperty('errorMessage')
      expect(typeof result.isValid).toBe('boolean')
      expect(typeof result.errorMessage).toBe('string')
    })
  })
}) 