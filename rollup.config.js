import ts from '@rollup/plugin-typescript'

import tsconfig from './tsconfig.json' assert { type: 'json' }

export default [{
  input: ['./src/base58check.ts'],
  output: {
    dir: './',
    format: 'es'
  },
  plugins: [
    ts(tsconfig)
  ],
  external: ['@vandeurenglenn/base58']
}]