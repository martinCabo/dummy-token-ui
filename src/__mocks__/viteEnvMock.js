// Mock para import.meta.env de Vite
global.import = {
  meta: {
    env: {
      VITE_TOKEN_ADDRESS: '0x1234567890123456789012345678901234567890',
      VITE_NODE_ENV: 'test',
      VITE_APP_TITLE: 'Dummy Token UI Test'
    }
  }
}

// Mock para import.meta
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_TOKEN_ADDRESS: '0x1234567890123456789012345678901234567890',
        VITE_NODE_ENV: 'test',
        VITE_APP_TITLE: 'Dummy Token UI Test'
      }
    }
  },
  writable: true
}) 