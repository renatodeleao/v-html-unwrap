import vue from '@vitejs/plugin-vue'

export default {
  test: {
    environment: 'happy-dom', // or 'jsdom', 'node'
  },
  plugins: [vue()],
}