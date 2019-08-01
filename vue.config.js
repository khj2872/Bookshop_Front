module.exports = {
  transpileDependencies: ['vuex-persist'],
  publicPath: '',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost:8442',
        changeOrigin: true
      }
    }
  }
}