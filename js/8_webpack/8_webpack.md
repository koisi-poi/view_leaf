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

# 操作记录
```shell
npm init
npm config set registry http://registry.npm.taobao.org
npm install jquery
npm install webpack webpack-cli --save-dev
npx webpack ./src/index.js -o ./build --mode=production

npm i css-loader style-loader --save-dev
# with webpack.config.js
npx webpack 
```