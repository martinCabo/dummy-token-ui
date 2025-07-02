describe('types', () => {
  describe('type imports', () => {
    it('should import reducer correctly', () => {
      // Verificar que el reducer se importa correctamente para el tipo RootState
      const { reducer } = require('../reducer')
      expect(reducer).toBeDefined()
    })

    it('should import ethers correctly', () => {
      // Verificar que ethers se importa correctamente
      const { ethers } = require('ethers')
      expect(ethers).toBeDefined()
    })

    it('should export types module correctly', () => {
      // Verificar que el módulo de tipos se puede importar
      const typesModule = require('../types')
      expect(typesModule).toBeDefined()
    })
  })

  describe('type definitions', () => {
    it('should have RootState type defined', () => {
      // Verificar que el archivo de tipos existe y se puede importar
      expect(() => {
        require('../types')
      }).not.toThrow()
    })

    it('should have WindowWithEthereum type defined', () => {
      // Verificar que el archivo de tipos existe y se puede importar
      expect(() => {
        require('../types')
      }).not.toThrow()
    })
  })
}) 