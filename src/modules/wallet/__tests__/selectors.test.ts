import {
  getState,
  getAddress,
  isConnected,
  isConnecting,
  getError,
  getBalance,
} from '../selectors';
import { WalletState } from '../types';
import { RootState } from '../../types';

describe('Wallet Selectors', () => {
  const mockWalletState: WalletState = {
    address: '0x1234567890123456789012345678901234567890',
    balance: '100.5',
    isConnecting: false,
    isTransferActive: true,
    isTransferSuccess: false,
    error: null,
  };

  const mockRootState: RootState = {
    wallet: mockWalletState,
    transfer: {
      isTransfered: false,
      isTransfering: false,
      isTransferSuccess: false,
      isOpen: false,
      error: null,
    },
  };

  describe('getState', () => {
    it('debería retornar el estado completo del wallet', () => {
      expect(getState(mockRootState)).toEqual(mockWalletState);
    });
  });

  describe('getAddress', () => {
    it('debería retornar la dirección del wallet cuando existe', () => {
      expect(getAddress(mockRootState)).toBe('0x1234567890123456789012345678901234567890');
    });

    it('debería retornar string vacío cuando no hay dirección', () => {
      const stateWithoutAddress = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: null,
        },
      };

      expect(getAddress(stateWithoutAddress)).toBe('');
    });
  });

  describe('isConnected', () => {
    it('debería retornar true cuando hay una dirección válida', () => {
      expect(isConnected(mockRootState)).toBe(true);
    });

    it('debería retornar false cuando no hay dirección', () => {
      const stateWithoutAddress = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: null,
        },
      };

      expect(isConnected(stateWithoutAddress)).toBe(false);
    });

    it('debería retornar false cuando la dirección es string vacío', () => {
      const stateWithEmptyAddress = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: '',
        },
      };

      expect(isConnected(stateWithEmptyAddress)).toBe(false);
    });
  });

  describe('isConnecting', () => {
    it('debería retornar el estado de conexión', () => {
      expect(isConnecting(mockRootState)).toBe(false);
    });

    it('debería retornar true cuando está conectando', () => {
      const stateConnecting = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          isConnecting: true,
        },
      };

      expect(isConnecting(stateConnecting)).toBe(true);
    });
  });

  describe('getError', () => {
    it('debería retornar el error cuando existe', () => {
      const stateWithError = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          error: 'Error de conexión',
        },
      };

      expect(getError(stateWithError)).toBe('Error de conexión');
    });

    it('debería retornar null cuando no hay error', () => {
      expect(getError(mockRootState)).toBe(null);
    });
  });

  describe('getBalance', () => {
    it('debería retornar el balance cuando existe', () => {
      expect(getBalance(mockRootState)).toBe('100.5');
    });

    it('debería retornar string vacío cuando no hay balance', () => {
      const stateWithoutBalance = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          balance: null,
        },
      };

      expect(getBalance(stateWithoutBalance)).toBe('');
    });
  });
}); 