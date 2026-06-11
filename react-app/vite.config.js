import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['Chrome >= 45', 'Safari >= 10', 'iOS >= 10', 'Android >= 5'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  base: './'
})
