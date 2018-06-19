var fs = require('fs');

module.exports = {
  parallel: false,
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
        .loader('ts-loader')
        .tap(options => {
          options.transpileOnly = false
          return options
        })
  }
}
