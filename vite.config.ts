import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

declare var process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // Use relative base path for GitHub Pages compatibility
    define: {
      // Polyfill process.env.API_KEY for the bundled app
      // Prioritize process.env.API_KEY (from CI) over env.API_KEY (from .env file)
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY),
    }
  }
})