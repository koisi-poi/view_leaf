# webpack
![picture 6](https://p1.kodo-oss.dronekumo.xyz/228b4584a5e4827e81864a44ec62c53f44b70bf37f6053c499dcec3d97161f87.png)  

## 简介
- 前端资源构建工具 build → dist
- 静态模块打包器 module bundler

## 打包
- `main(index.js)` → `[ ...js, ...less]` → chunk → `bundle`

## 五个核心概念
- **Entry** `main(index.js)`
- **Output**
- **Loader** 处理 非js 文件
- **Plugins** 如优化、压缩
- **Mode** development production
- `webpack.config.js` 即 配置这5个东西

## 性能优化
- 开发环境
  - 打包速度
- 生产环境
  - 打包速度
  - 性能

### hmr 热模块替换
- devServer.hot true

### 多进程
- thread-loader
- 长时间任务才有用，创建进程、同步也都要时间

### webpack.DllPlugin

... todo 待补充

# 操作记录
```shell
npm init
npm config set registry http://registry.npm.taobao.org
npm install jquery
npm install webpack webpack-cli --save-dev
npx webpack ./src/index.js -o ./build --mode=production

npm i css-loader style-loader less less-loader --save-dev
# with webpack.config.js
npx webpack 
```