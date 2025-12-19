import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // Use relative base path for GitHub Pages compatibility
    define: {
      // Polyfill process.env.API_KEY for the bundled app
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    }
  }
})