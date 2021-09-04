# Starter

## 数据类型
- 基本数据(栈,数组也是)
  1. String
  2. Number
  3. Boolean
  4. Null
  5. undefined
- Object 对象(堆)
  - 内置对象: Math String Number Object
  - 宿主对象: BOM(window) DOM(document)
  - 用户对象:
    -  `var obj = new Object()`
    -  `var obj = {}`
    -  `var obj = {id: 1, name: "name"}`


## Null 和 undefined
```js
// Null 即：
var v = null
typeof v  // → Object

var n
var n2 = undefined
typeof n 
typeof n2 // → undefined

// toString
// (null or undefined).toString() x
String(null); String(undefined)   √

// Number()
// null       →  0 
// undefined  →  NaN
// true 1, false 0

// parseInt: only for string
parseInt("1080px")
``` 

`"\u2610 ☐ \u2611 ☑ \u2612 ☒"`

## 布尔运算
- NaN 不和任何值相等  
  - `NaN == NaN → false`
  - `isNaN(v)`

## 正则 regx
- `var regx_obj = new RegExp("regx_str","mod")`
- `var regx_obj = /regx_str/i`
- mod: i 忽略大小写； g 全局
- 使用: `regx_obj.test(str)`

## 对象
```js
// 枚举属性
for(var prop in obj){
    obj[prop]
}
// 构造函数
function Koi(args){
    this.p1 = ...
    // 成员函数不要直接定义在这里，不然每次new都会创建一个函数对象。
}
Koi.prototype.toString=...

var koi = new Koi(args)
koi instanceof Koi → true
```
### prototype (理解: shared，static 区域)
- IClass 构造函数 显式
  - `prototype`: 0x1122 → 原型对象
- IClass 实例对象 隐式
  - `__proto__`: 0x1122 → 原型对象
- 原型对象也可以有原型，Object对象的原型是 null
- 先到当前对象下找prop，没有再一级一级找原型里面有没有该prop (原型链)
  - `prop in obj` 原型内有也算 true
  - `hasOwnPropery("prop")` 原型内才有的不算

## 函数(function) 和 方法(method)
```js
// function 即 window对象的方法
    // 函数定义
    // new Function()  基本不使用
    var funA = new Function("script...")
    // 函数也是对象，可以添加属性(不过没什么意义)
    funA.poi = 233

    function funB(args...){
        ...
    }
    var funC = function(){
        ...
    }
    
    // 立即执行函数(一次性函数)
    (function(args){
        ...
    })(args);
// method 即 对象的成员函数
```
### 重载
- js没有重载，本质都是 func(args[])
- 如果定义了一个新的同名函数，则会覆盖前面定义的
- 非要实现的话，可以在方法体内，根据 `arguments.length` 来执行
### call & apply
- `fun.call(obj, arg1, arg2, ...)` this → obj
- `fun.apply(obj, [args])` this → obj

## 作用域 Scope
```js
// assign to `window`
var global

function fun(){
    var local
    this  →  window
}

var obj = {
    funInner: fun
    // this → this obj
}

// this 总结:
(window).fun() → window
     obj.fun() → obj
```

## GC
- 引用计数，Auto GC
- `obj = null`

## 数组
```js
var arr  = []
var arr2 = [1,"str",{},[]]
arr[0] = 0
arr[1] = 1
arr[9] = 9 √
arr.length == max_index + 1
// 其他的，未赋值的为 undefined
// length 可以人为修改，修改后，范围外的元素会被删除

// forEach()
arr.forEach( function( el, index, arr){
    ...
})
```

## 事件 event
- 事件触发时，回调函数的第一个参数是 event
### 事件捕获 & 冒泡
- 先从外层捕获，再冒泡出来
- 默认是冒泡时触发
- 内外是html树的结构，跟视图位置无关
![picture 1](https://p1.kodo-oss.dronekumo.xyz/1c9168f10d3cec81e1bd666dc349354848f3454f74be18fe8e8736944a078006.png)  
![picture 2](https://p1.kodo-oss.dronekumo.xyz/d6cda5ed9f92cbd49530777ddb93e10edfde950ac617ef3e36125af735f43f0d.png)  
![picture 3](https://p1.kodo-oss.dronekumo.xyz/fa4c93d65b926c44f8792c74f08251c0a534f4ed39606b55969ea3b88ff39f9b.png)  

### 事件委派
- 利用事件的冒泡，将事件绑定至共同的父元素上。减少重复的绑定，还能提高性能。

### 事件绑定
- `el.event(eg: onclick) = ()=>{...}` 只能绑定一个
- `el.addEventListener("click",()=>{...},bool: 是否在捕获阶段触发)`可以添加多个

# BOM
- window
  - 当前网页

- Navigator
  - 浏览器信息，如版本、内核、客户端类型
  - 一般只用 navigator.userAgent

- Location
  - 获取地址栏信息，或者做页面跳转

- History
  - 只能操作前进后退

- Screen
  - 用得少。移动端稍微多点，用于获取屏幕分辨率。

# DOM
- document == window.document

# Tips
- js基本写在html最下面
  - 避免影响web加载速度
  - 确保脚本要引用的元素已经加载完毕

- href="javascript:;"
  - href目标是一个js，其内容为空。

- 定时 & 延时
  - var id = setInterval(func,ms)
    - clearInterval(id)
  - setTimeout(func,ms)

- babeljs.cn 自动转换兼容代码