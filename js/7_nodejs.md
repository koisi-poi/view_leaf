# Start
- 在服务器运行的 JavaScript
- 可以与操作系统交互
- 基于 Google V8 引擎
- Nodejs 也是单线程的，用多进程，分布式来实现高并发
- 浏览器内核 和 nodejs 一样，都是拿来解释、运行 js 的

## js解释、运行
- 每一个 js 文件，都会被自动包装成:
  ```js
  function(exports, requires, module,
                __filename, __dirname){
      js_file_content
      ...
  }
  ```

## 模块化
```js
exports.value = ...
exports.func  = ...
or
module.exports = {
    value: ..
    func: ..
}
---
// .js 可以省略
// 内置 or install 的模块，可以只写 模块名
const module = require('path/xx.js')
```

## global
- 全局对象，类型 BOM 中的 window

# npm
## 包 package
- CommonJS 规范
- 包结构
  - package.json 描述文件
  - 其他的无硬性要求

## 常用命令
```shell
npm -v
npm init
npm install # 根据 package.json 自动下载依赖
# --save: 添加依赖至 package.json
npm install/i [-g] [--save] [pkg]
npm remove/r  [-g] [--save] [pkg]
node path/file.js

npm view [pkg] versions
```