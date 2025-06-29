import React from 'react'
import { Props } from './TransferModal.types'
import { Button, Modal, Field } from 'decentraland-ui'


const TransferModal: React.FC<Props> = ({isOpen}) => {
    return (
        <>
            <Modal size="small" open={isOpen}>
                <Modal.Header>Join us!</Modal.Header>
                <Modal.Content>
                    <Field label="Name" placeholder="Luis XVII" />
                    <Field label="Email" placeholder="luigi@mail.com" />
                </Modal.Content>
                <Modal.Actions>
                    <Button primary>Submit</Button>
                    <Button>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default TransferModal