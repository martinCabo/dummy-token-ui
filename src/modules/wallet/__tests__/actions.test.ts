import {
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  updateBalance,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  UPDATE_BALANCE,
} from '../actions';

describe('Wallet Actions', () => {
  describe('connectWalletRequest', () => {
    it('debería crear una acción de solicitud de conexión de wallet', () => {
      const expectedAction = {
        type: CONNECT_WALLET_REQUEST,
        payload: {},
      };

      expect(connectWalletRequest()).toEqual(expectedAction);
    });
  });

  describe('connectWalletSuccess', () => {
    it('debería crear una acción de éxito de conexión de wallet', () => {
      const address = '0x1234567890123456789012345678901234567890';
      const balance = '100.0';

      const expectedAction = {
        type: CONNECT_WALLET_SUCCESS,
        payload: {
          address,
          balance,
        },
      };

      expect(connectWalletSuccess(address, balance)).toEqual(expectedAction);
    });
  });

  describe('connectWalletFailure', () => {
    it('debería crear una acción de fallo de conexión de wallet', () => {
      const error = 'Usuario rechazó la conexión';

      const expectedAction = {
        type: CONNECT_WALLET_FAILURE,
        payload: {
          error,
        },
      };

      expect(connectWalletFailure(error)).toEqual(expectedAction);
    });
  });

  describe('updateBalance', () => {
    it('debería crear una acción de actualización de balance', () => {
      const newBalance = '150.5';

      const expectedAction = {
        type: UPDATE_BALANCE,
        payload: {
          balance: newBalance,
        },
      };

      expect(updateBalance(newBalance)).toEqual(expectedAction);
    });
  });
}); 