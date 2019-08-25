module.exports = {
  transpileDependencies: ['vuex-persist'],
  publicPath: '',

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      // 'http://localhost:8080': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     'http://localhost:8080': ''
      //   }
      // }
    }
  }
}
