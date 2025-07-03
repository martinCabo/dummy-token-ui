import { 
    transferRequest,
    transferSuccess,
    transferFailure,
    openTransferModal,
    closeTransferModal,
    TRANSFER_REQUEST,
    TRANSFER_SUCCESS,
    TRANSFER_FAILURE,
    OPEN_TRANSFER_MODAL,
    CLOSE_TRANSFER_MODAL
 } from '../actions'

 describe('Transfer Actions', () => {
    describe('transferRequest', () => {
        it('should create an action to request a transfer', () => {
            const amount = 100;
            const destination = '0x1234567890123456789012345678901234567890';
            const expectedAction = {
                type: TRANSFER_REQUEST,
                payload: { amount, destination },
            };
            expect(transferRequest(amount, destination)).toEqual(expectedAction);
        });
    });

    describe('transferSuccess', () => {
        it('should create an action to a success transfer', () => {
            const expectedAction = {
                type: TRANSFER_SUCCESS,
                payload:{}
            };
            expect(transferSuccess()).toEqual(expectedAction);
        });
    });

    describe('transferFailure', ()=>{
        it('should create an action to check a fail transfer', ()=>{
            const error = "error"
            const expectedAction ={
                type: TRANSFER_FAILURE,
                payload:{error}
            };
            expect(transferFailure(error)).toEqual(expectedAction);
        })
    })

    describe('openTransferModal', ()=>{
        it('should create an action to open the transfer modal', ()=>{
            const expectedAction ={
                type: OPEN_TRANSFER_MODAL,
                payload:{}
            };
            expect(openTransferModal()).toEqual(expectedAction);
        })
    })

    describe('closeTransferModal', ()=>{
        it('should create an action to close the transfer modal', ()=>{
            const expectedAction ={
                type: CLOSE_TRANSFER_MODAL,
                payload:{}
            };
            expect(closeTransferModal()).toEqual(expectedAction);
        })
    })
 });
