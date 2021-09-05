# vue
- 引入 vue.js 会在 window 上注册一个 Vue 对象。

## 模板语法
### 插值语法 `{{ js_expr }}`
### 指令
- `v-if v-for`
- 数据绑定
  - 单向绑定(vue→el) `v-bind:`attribute="js_expr" or `:`attribute="js_expr"
  - 双向绑定(只能用在交互元素上，一般是表单) `v-model:values`="js_expr" or `v-model`="js_expr"
- 事件绑定`v-on:click @click`
  - 事件修饰符 @click.`[prevent|stop|once|capture|sefl|passive]`
  - `@wheel` `@scroll`
  - `@keyup` `@keyup.key` `@keydown.tab`(tab会失去焦点，无法被 @keyup 捕获)
  - 除了引用实例方法，也可以直接写一些简单的js语句(只能引用该实例的属性)

# Vue基本属性 示例
## 数据 (data v-model)
- Vue实例、html元素 一对一:
  - 一个Vue实例只能绑定一个html元素 (故一般用`id选择器`，否则，绑定第一个匹配的元素)
  - 一个html元素也只能被一个Vue实例接管 (由最先创建的Vue实例接管)
- `el`两种写法
  - `new Vue{ el: "#app", .. }`
  - 后期按需绑定 `vm.$mount("#app")`
- `data`两种写法
  - `data: {...}`
  - `data(){ return {...} }` (这里不能用箭头函数，this是window有风险)

```html
<div id="app-1">
  {{Date.now()}} {{1 == 2}}

  <!-- v-bind: vue → html 单向绑定 -->
  <input type="text" :value="input"><br/>
  <!-- v-model: vue → html 双向向绑定 -->
  <input type="text" v-model="input"><br/>

  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>

<div>
```
```js
let vm = new Vue({
    el: '#app-1',
    data: {
      todos: [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' }
      ],
      url: 'poi.io',
      info: 'info poi', 
      input: 'input poi'
    }
})
// new 的时候可以不指定 el, 后续按需 $mount()
setTimeout( ()=>{
  vm.$mount("#app-1")
},1000)
```
## 事件 (methods @event)
```html
<div id="app-2">
  <button @click="funcA">点我提示信息1（默认传一个 event）</button>
  <button @click="funcB( $event, argv)">点我提示信息2（传参）</button>
</div>
```
```js
const vm = new Vue({
    el: '#app-1',
    methods: {
      funcA( event)       { ... },
      funcB( event, argv) { ... }
    }
})
```

## 计算属性 (computed v-model) & 姓名案例
```html
<div id="root">
  姓：<input type="text" v-model="firstName"> <br/>
  名：<input type="text"  v-model="lastName"> <br/>
  全名：<span>{{ fullName }}</span> <br/><br/>
</div>
```
```js
const vm = new Vue({
  el:'#root',
  data:{
    firstName:'张',
    lastName:'三',
  },
  // 结果是为了得到一个属性
  computed:{
    //完整写法
    /* fullName:{
      // 调用时机: 1.初次引用时 2.依赖项值改变时
      get(){
        return this.firstName + '-' + this.lastName
      },
      set(value){
        const arr = value.split('-')
        this.firstName = arr[0]
        this.lastName = arr[1]
      }
    } */
    // 简写 (一般情况下，计算属性只读)
    fullName(){
      return this.firstName + '-' + this.lastName
    }
  }
})
```
## 侦听属性 (watch)
```js
const vm = new Vue({
  ...
  data: {
    simple: ...
    obj: {
      a: ..
      b: ..
    }
  }
  // computed 属性也可以 watch
  watch: {
    simple: {
      immediate: true, // 初始化的时候也执行一下
      handler( new, old){ ... }
    },
    'obj.a': { ... }
    // or 深度监视
    obj: {
      deep: true,
      ...
    },
    // 简写
    isGood(new,old){ ... }
  }
})

// or 后期添加
vm.$watch( 'prop',{
  // immediate: true,
  handler( new, old){ ... }
})
vm.$watch( 'prop', function(new, old){...})
```
### 计算 vs 侦听 & ()=>{}
```js
const vm = new Vue({
  ...
  data: { prop: ... }
  computed: {
    c_prop(){
      return ...
    }
  }
  watch: {
    prop(){
      // wacth 才支持异步任务
      // 这里必须用 箭头函数
      // function定义的话， this = window
      ajax( ()=>{ this.prop } )
      // ()=>{} 没有自己的this，往外找一层，即: 声明处的this
      // 即: ()=>{} 一般用作 回调函数(异步)
      //     function 同步函数
    }
  }
})
```

# 底层原理
## 数据代理 Object.defineProperty()
``` js
Object.defineProperty( instance, 'prop',{
  value: "value",
  enumerable: true,  // Object.keys( obj)
  writable: true,
  configurable: true // 控制属性是否可以被移除
})
Object.defineProperty( instance, 'dynamic',{
  get(){ return var },
  set(v){ var = v }
})
```
![picture 1](https://p1.kodo-oss.dronekumo.xyz/aac59655cbef174bba87dd518b7105caaab363a1d5dccd594b7227de8d826bd1.png)  

