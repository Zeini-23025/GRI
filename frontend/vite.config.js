// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Ajout de cette ligne
  },
  server: {
    host: '0.0.0.0',  // Cela expose le serveur à votre réseau local
    port: 3000,  // Vous pouvez spécifier un port si nécessaire
  }
})

