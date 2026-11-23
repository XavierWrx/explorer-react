import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const accessToken = env.REST_COUNTRIES_TOKEN?.trim()

  return {
    plugins: [react(), tailwindcss()],
    envPrefix: 'PUBLIC_',
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        '/api/countries': {
          target: 'https://api.restcountries.com',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/countries/, '/countries/v5'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyRequest) => {
              proxyRequest.removeHeader('origin')
              if (accessToken) {
                proxyRequest.setHeader('Authorization', `Bearer ${accessToken}`)
              }
            })
          },
        },
      },
    },
  }
})
