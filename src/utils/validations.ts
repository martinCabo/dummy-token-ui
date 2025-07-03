// Types for validations
export interface ValidationResult {
    isValid: boolean
    errorMessage: string
}

// Constants for validations
export const ETHEREUM_ADDRESS_LENGTH = 42
export const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
export const MAX_DECIMAL_PLACES = 18

/**
 * Validates a token amount
 * @param amount - The amount to validate
 * @returns ValidationResult with the validation result
 */
export const validateAmount = (amount: string): ValidationResult => {
    if (!amount || amount.trim() === '') {
        return {
            isValid: false,
            errorMessage: 'Amount is required'
        }
    }
    
    const amountNumber = Number(amount)
    if (isNaN(amountNumber)) {
        return {
            isValid: false,
            errorMessage: 'Amount must be a valid number'
        }
    }
    
    if (amountNumber <= 0) {
        return {
            isValid: false,
            errorMessage: 'Amount must be greater than 0'
        }
    }
    
    // Validate that it doesn't have too many decimal places
    if (amount.includes('.') && amount.split('.')[1].length > MAX_DECIMAL_PLACES) {
        return {
            isValid: false,
            errorMessage: `Amount cannot have more than ${MAX_DECIMAL_PLACES} decimal places`
        }
    }
    
    return {
        isValid: true,
        errorMessage: ''
    }
}

/**
 * Validates an Ethereum address
 * @param destination - The address to validate
 * @returns ValidationResult with the validation result
 */
export const validateEthereumAddress = (destination: string): ValidationResult => {
    if (!destination || destination.trim() === '') {
        return {
            isValid: false,
            errorMessage: 'Destination is required'
        }
    }
    
    const trimmedDestination = destination.trim()
    
    if (!trimmedDestination.startsWith('0x')) {
        return {
            isValid: false,
            errorMessage: 'Destination must start with 0x'
        }
    }
    
    if (trimmedDestination.length !== ETHEREUM_ADDRESS_LENGTH) {
        return {
            isValid: false,
            errorMessage: `Destination must be ${ETHEREUM_ADDRESS_LENGTH} characters long`
        }
    }
    
    if (!ETHEREUM_ADDRESS_REGEX.test(trimmedDestination)) {
        return {
            isValid: false,
            errorMessage: 'Destination must be a valid Ethereum address'
        }
    }
    
    return {
        isValid: true,
        errorMessage: ''
    }
}

/**
 * Validates a complete transfer form
 * @param amount - The amount to validate
 * @param destination - The destination address
 * @returns ValidationResult with the validation result
 */
export const validateTransferForm = (amount: string, destination: string): ValidationResult => {
    const amountValidation = validateAmount(amount)
    if (!amountValidation.isValid) {
        return amountValidation
    }
    
    const destinationValidation = validateEthereumAddress(destination)
    if (!destinationValidation.isValid) {
        return destinationValidation
    }
    
    return {
        isValid: true,
        errorMessage: ''
    }
} 