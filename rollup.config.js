import ts from '@rollup/plugin-typescript'

export default [{
  input: ['./src/base58check.ts'],
  output: {
    dir: './',
    format: 'es'
  },
  plugins: [
    ts({
      compilerOptions: {
        target: 'es2022'
      }
    })
  ],
  external: ['@vandeurenglenn/base58']
}]