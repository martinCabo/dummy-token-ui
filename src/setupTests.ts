import '@testing-library/jest-dom';

// Mock de ethers para evitar problemas en los tests
jest.mock('ethers', () => ({
  ethers: {
    Eip1193Provider: jest.fn(),
  },
}));

// Mock de window.ethereum
Object.defineProperty(window, 'ethereum', {
  value: {
    request: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  },
  writable: true,
}); 