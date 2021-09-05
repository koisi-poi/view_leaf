/*
  index.js: webpack入口起点文件

  1. 运行指令：
    npx webpack ./src/index.js -o ./build --mode=production

  2. 结论：
    1. webpack能处理js/json资源，不能处理css/img等其他资源(需要添加Loader)
    2. 将ES6模块化编译成浏览器能识别的、兼容的语法
    3. 生产模式下会压缩js代码。
*/

import './index.css'
import './index.less'

import data from './data.json'
console.log(data)

function add(x, y) {
  return x + y
}

console.log(add(1, 2))