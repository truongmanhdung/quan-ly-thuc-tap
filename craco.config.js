module.exports = {
    devServer: {
        proxy: {
          '/api': {
            target: process.env.REACT_APP_API,
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
          },
        },
      },
  };