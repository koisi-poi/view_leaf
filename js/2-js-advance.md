# Advanced

## IIFE（立即调用函数表达式）
- 补充，避免解析是被当成`(参数)`,前加 `;`
  - ps，类似的还有`[`和行首(避免多文件合并时出问题)也要加
- 将 模块 注入 window (下面的闭包才是真正的模块)
```js
;(()=>{
    ...
    window.$ = ()={
        return {
            funcA: funcA,
            funcB: funcB,
        }
    }
})()
```

## 闭包 closure
- 类似其他语言的，利用外层函数，创建一个共享的，static区域。
```js
function outer(){
    static{ ... }
    function inner(){
        ...
    }
    return inner
}

function module(){
    static{ ... }
    funcA
    funcB
    return {
        funcA: funcA,
        funcB: funcB
    }
}

// 生命周期
  // start:
  var func = outer
  // end:
      func = null
```
- 可能需要及时释放闭包(→null)，否则可能会导致内存泄漏，从而更容易发生内存溢出(数组越界是这种)

## 面向对象
### 创建对象
```js
// 1. 临时起意
    var obj = new Object()
    var obj = {}

// 2. 工厂方法
    function objFactory(...){
        var obj = {...}
        return obj
        // 类型一直是Object
    }

// 3. 构造函数  有自定义类型
    function Poi(...){
        this.prop = ...
    }
    Poi.prototype.prop = ...
    var poi = new Poi(...)
```
### 继承
```js
// 1. 原型链继承 即: 子类的原型 是 父类的一个实例对象  (主要是拿方法)
    Sub.prototype = new Supper()
    Sub.prototype.constructor = Sub
    Sub.prototype.newProp = ...

// 2. 借用构造函数  (主要是拿属性)
    function Sub(...){
        Supper.call(this, ...)
        this.prop = ...
    }

// 3. 综上:
    function Sub(...){
        Supper.call(this, ...)
        this.prop = ...
    }
    Sub.prototype = new Supper()
    Sub.prototype.constructor = Sub
```

# Lits
- js是单线程的 (H5 Web Worker可多线程)
  - 定时器不一定按时执行，如果当前工作负载很大，可能会延迟很久
  - `alert` 会暂停当前线程~~和计时~~(2020年底后，不暂停计时了？)
  - js先执行完所有声明的代码(同步)后，才会执行回调函数(异步)

- 事件循环模型
![picture 4](https://p1.kodo-oss.dronekumo.xyz/7699facbd3cf3aadfd2bc21b93f8d3a245bf590103150561510ae1c4bb005a2a.png)  
  - 先在Stack里面把同步函数执行完了
  - 然后，一个一个地执行回调队列里面的函数
  - js(前端)的同步函数是一定可以执行完的。(不会有while true)
  - 后面就是一直在等有没有回调、事件触发了

- 浏览器内核，Chrome、Safari都是webkit
