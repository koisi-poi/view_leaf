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
- IClass 构造函数
  - `prototype`: 0x1122 → 原型对象
- IClass 实例对象
  - `__proto__`: 0x1122 → 原型对象
- 原型对象也可以有原型，Object对象的原型是 null
- 先到当前对象下找prop，没有再一级一级找原型里面有没有该prop
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

# Tips
- js基本写在html最下面
  - 避免影响web加载速度
  - 确保脚本要引用的元素已经加载完毕