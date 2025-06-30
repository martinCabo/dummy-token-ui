import { walletReducer } from '../reducer';
import {
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  updateBalance,
} from '../actions';
import { WalletState } from '../types';

describe('Wallet Reducer', () => {
  const initialState: WalletState = {
    address: null,
    balance: null,
    isConnecting: false,
    isTransferActive: true,
    isTransferSuccess: false,
    error: null,
  };

  describe('Estado inicial', () => {
    it('debería retornar el estado inicial', () => {
      expect(walletReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
    });
  });

  describe('CONNECT_WALLET_REQUEST', () => {
    it('debería manejar la solicitud de conexión de wallet', () => {
      const action = connectWalletRequest();
      const expectedState = {
        ...initialState,
        isConnecting: true,
        error: null,
      };

      expect(walletReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('CONNECT_WALLET_SUCCESS', () => {
    it('debería manejar el éxito de conexión de wallet', () => {
      const address = '0x1234567890123456789012345678901234567890';
      const balance = '100.0';
      const action = connectWalletSuccess(address, balance);
      
      const stateWithRequest = {
        ...initialState,
        isConnecting: true,
      };

      const expectedState = {
        ...initialState,
        isConnecting: false,
        address,
        balance,
        error: null,
      };

      expect(walletReducer(stateWithRequest, action)).toEqual(expectedState);
    });
  });

  describe('CONNECT_WALLET_FAILURE', () => {
    it('debería manejar el fallo de conexión de wallet', () => {
      const error = 'Usuario rechazó la conexión';
      const action = connectWalletFailure(error);
      
      const stateWithRequest = {
        ...initialState,
        isConnecting: true,
      };

      const expectedState = {
        ...initialState,
        isConnecting: false,
        error,
      };

      expect(walletReducer(stateWithRequest, action)).toEqual(expectedState);
    });
  });

  describe('UPDATE_BALANCE', () => {
    it('debería actualizar el balance del wallet', () => {
      const newBalance = '150.5';
      const action = updateBalance(newBalance);
      
      const stateWithWallet = {
        ...initialState,
        address: '0x1234567890123456789012345678901234567890',
        balance: '100.0',
      };

      const expectedState = {
        ...stateWithWallet,
        balance: newBalance,
      };

      expect(walletReducer(stateWithWallet, action)).toEqual(expectedState);
    });
  });

  describe('Acción desconocida', () => {
    it('debería retornar el estado actual para acciones desconocidas', () => {
      const currentState = {
        ...initialState,
        address: '0x1234567890123456789012345678901234567890',
        balance: '100.0',
      };

      expect(walletReducer(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState);
    });
  });
}); 