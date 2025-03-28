const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .end(); // 显式调用 .end() 方法
  }
});
