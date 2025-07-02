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

  // Helper to omit wallet property
  const omitWallet = (state: RootState): RootState => {
    const { wallet, ...rest } = state;
    return rest as RootState;
  };

  describe('getState', () => {
    it('should return the complete wallet state', () => {
      expect(getState(mockRootState)).toEqual(mockWalletState);
    });
    it('should return undefined if wallet state is missing', () => {
      const stateWithoutWallet = omitWallet(mockRootState);
      expect(getState(stateWithoutWallet as RootState)).toBeUndefined();
    });
    it('should return undefined if root state is null or undefined', () => {
      expect(getState(null as unknown as RootState)).toBeUndefined();
      expect(getState(undefined as unknown as RootState)).toBeUndefined();
    });
  });

  describe('getAddress', () => {
    it('should return the wallet address when it exists', () => {
      expect(getAddress(mockRootState)).toBe('0x1234567890123456789012345678901234567890');
    });
    it('should return empty string when address is null', () => {
      const stateWithoutAddress = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: null,
        },
      };
      expect(getAddress(stateWithoutAddress)).toBe('');
    });
    it('should return empty string if wallet state is missing', () => {
      const stateWithoutWallet = omitWallet(mockRootState);
      expect(getAddress(stateWithoutWallet as RootState)).toBe('');
    });
    it('should return empty string if root state is null or undefined', () => {
      expect(getAddress(null as unknown as RootState)).toBe('');
      expect(getAddress(undefined as unknown as RootState)).toBe('');
    });
  });

  describe('isConnected', () => {
    it('should return true when there is a valid address', () => {
      expect(isConnected(mockRootState)).toBe(true);
    });
    it('should return false when address is null', () => {
      const stateWithoutAddress = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: null,
        },
      };
      expect(isConnected(stateWithoutAddress)).toBe(false);
    });
    it('should return false when address is empty string', () => {
      const stateWithEmptyAddress = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          address: '',
        },
      };
      expect(isConnected(stateWithEmptyAddress)).toBe(false);
    });
    it('should return false if wallet state is missing', () => {
      const stateWithoutWallet = omitWallet(mockRootState);
      expect(isConnected(stateWithoutWallet as RootState)).toBe(false);
    });
    it('should return false if root state is null or undefined', () => {
      expect(isConnected(null as unknown as RootState)).toBe(false);
      expect(isConnected(undefined as unknown as RootState)).toBe(false);
    });
  });

  describe('isConnecting', () => {
    it('should return the connecting state', () => {
      expect(isConnecting(mockRootState)).toBe(false);
    });
    it('should return true when isConnecting is true', () => {
      const stateConnecting = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          isConnecting: true,
        },
      };
      expect(isConnecting(stateConnecting)).toBe(true);
    });
    it('should return false if wallet state is missing', () => {
      const stateWithoutWallet = omitWallet(mockRootState);
      expect(isConnecting(stateWithoutWallet as RootState)).toBe(false);
    });
    it('should return false if root state is null or undefined', () => {
      expect(isConnecting(null as unknown as RootState)).toBe(false);
      expect(isConnecting(undefined as unknown as RootState)).toBe(false);
    });
  });

  describe('getError', () => {
    it('should return the error when it exists', () => {
      const stateWithError = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          error: 'Connection error',
        },
      };
      expect(getError(stateWithError)).toBe('Connection error');
    });
    it('should return null when there is no error', () => {
      expect(getError(mockRootState)).toBe(null);
    });
    it('should return null if wallet state is missing', () => {
      const stateWithoutWallet = omitWallet(mockRootState);
      expect(getError(stateWithoutWallet as RootState)).toBe(null);
    });
    it('should return null if root state is null or undefined', () => {
      expect(getError(null as unknown as RootState)).toBe(null);
      expect(getError(undefined as unknown as RootState)).toBe(null);
    });
  });

  describe('getBalance', () => {
    it('should return the balance when it exists', () => {
      expect(getBalance(mockRootState)).toBe('100.5');
    });
    it('should return empty string when balance is null', () => {
      const stateWithoutBalance = {
        ...mockRootState,
        wallet: {
          ...mockWalletState,
          balance: null,
        },
      };
      expect(getBalance(stateWithoutBalance)).toBe('');
    });
    it('should return empty string if wallet state is missing', () => {
      const stateWithoutWallet = omitWallet(mockRootState);
      expect(getBalance(stateWithoutWallet as RootState)).toBe('');
    });
    it('should return empty string if root state is null or undefined', () => {
      expect(getBalance(null as unknown as RootState)).toBe('');
      expect(getBalance(undefined as unknown as RootState)).toBe('');
    });
  });
}); 