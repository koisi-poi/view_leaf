const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // loader的执行顺序是反过来的，从后往前
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },

  plugins: [],

  mode: 'development'
}
