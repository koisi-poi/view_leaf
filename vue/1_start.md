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

# 示例
## 数据绑定
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
## 事件绑定
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

