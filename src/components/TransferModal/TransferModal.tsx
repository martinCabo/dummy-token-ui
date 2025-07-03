import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Props } from './TransferModal.types'
import { Button, Modal, Field, Close, Message } from 'decentraland-ui'
import { validateAmount, validateEthereumAddress } from '../../utils/validations'
import './TransferModal.css'

const TransferModal: React.FC<Props> = ({isOpen, error, isTransfering, onClose, onTransfer}) => {
    const [amount, setAmount] = useState('')
    const [destination, setDestination] = useState('')
    const [amountErrorMsg, setAmountErrorMsg] = useState('')
    const [destinationErrorMsg, setDestinationErrorMsg] = useState('')

    // Clean state when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setAmount('')
            setDestination('')
            setAmountErrorMsg('')
            setDestinationErrorMsg('')
        }
    }, [isOpen])

    // Handlers with real-time validation
    const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = e.target.value
        setAmount(newAmount)
        
        // Real-time validation (only if there's content)
        if (newAmount.trim()) {
            const validation = validateAmount(newAmount)
            setAmountErrorMsg(validation.errorMessage)
        } else {
            setAmountErrorMsg('')
        }
    }, [])

    const handleDestinationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newDestination = e.target.value
        setDestination(newDestination)
        
        // Real-time validation (only if there's content)
        if (newDestination.trim()) {
            const validation = validateEthereumAddress(newDestination)
            setDestinationErrorMsg(validation.errorMessage)
        } else {
            setDestinationErrorMsg('')
        }
    }, [])

    const handleTransfer = useCallback(async () => {
        try {
            // Final validation before transferring
            const amountValidation = validateAmount(amount)
            const destinationValidation = validateEthereumAddress(destination)
            
            if (!amountValidation.isValid) {
                setAmountErrorMsg(amountValidation.errorMessage)
                return
            }
            
            if (!destinationValidation.isValid) {
                setDestinationErrorMsg(destinationValidation.errorMessage)
                return
            }
            
            // Proceed with transfer
            await onTransfer(Number(amount), destination.trim())
            
        } catch (error) {
            console.error('Transfer error:', error)
            // Error is handled in the parent component
        }
    }, [amount, destination, onTransfer])
    
    // Check if the form is complete
    const isFormValid = useMemo(() => {
        const amountValidation = validateAmount(amount)
        const destinationValidation = validateEthereumAddress(destination)
        return amountValidation.isValid && destinationValidation.isValid
    }, [amount, destination])

    return (
        <Modal 
            className="transfer-modal" 
            size="small" 
            open={isOpen} 
            closeIcon={<Close onClick={onClose}/>}
        >
            <Modal.Header className="modal-header">Transfer</Modal.Header>
            <Modal.Description className="modal-description">
                Transfer tokens to a destination address
            </Modal.Description>
            <Modal.Content>
                <Field 
                    label="Amount" 
                    tabIndex={1} 
                    type="number" 
                    value={amount} 
                    error={!!amountErrorMsg}
                    message={amountErrorMsg}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    disabled={isTransfering}
                />
                <Field 
                    label="Destination" 
                    tabIndex={2} 
                    type="text" 
                    value={destination} 
                    error={!!destinationErrorMsg}
                    message={destinationErrorMsg}
                    onChange={handleDestinationChange}
                    placeholder="0x..."
                    disabled={isTransfering}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button 
                    primary 
                    tabIndex={3} 
                    loading={isTransfering} 
                    disabled={!isFormValid || isTransfering}
                    onClick={handleTransfer}
                >
                    Transfer
                </Button>
            </Modal.Actions>
            {error && (
                <Message 
                    error 
                    content={error} 
                    className="general-error"
                />
            )}
        </Modal>
    )
}

export default TransferModal