import React, { useState, useEffect } from 'react'
import { Props } from './TransferModal.types'
import { Button, Modal, Field, Close } from 'decentraland-ui'
import './TransferModal.css'


const TransferModal: React.FC<Props> = ({isOpen,error, isTransfering, onClose, onTransfer}) => {
    const [amount, setAmount] = useState(0)
    const [destination, setDestination] = useState('')
    useEffect(() => {
        if(isOpen){
            setAmount(0)
            setDestination('')
        }
    }, [isOpen])
    
    return (
        <>
            <Modal className="transfer-modal" size="small" open={isOpen} closeIcon={<Close onClick={onClose}/>} >
                <Modal.Header className="modal-header">Transfer</Modal.Header>
                <Modal.Description>Transfer tokens to a destination address</Modal.Description>
                <Modal.Content>
                    <Field label="Amount" tabIndex='1' type='number' placeholder="100" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                    <Field label="Destination" tabIndex='2' type='text' value={destination} onChange={(e) => setDestination(e.target.value)} />
                </Modal.Content>
                <Modal.Actions>
                    <Button primary tabIndex='3' loading={isTransfering} onClick={() => onTransfer(amount, destination)}>Transfer</Button>
                </Modal.Actions>
                {error && <p className="error">{error}</p>}
            </Modal>
        </>
    )
}

export default TransferModal