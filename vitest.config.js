// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/test/**/*.test.jsx'],
    globals: true,
    setupFiles: './src/test/setupTests.js'
  }
})