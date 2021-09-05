# 组件 component
- 一个元素只由一个Vue实例接管 `new Vue({})`
- 一个Vue实例可以引用多个组件 `const component = Vue.extend({})`
  - `Vue.extend({})`可以不写，如果直接传一个对象给Vue实例，会自动调用
- `VueComponent.prototype.__proto__ === Vue.prototype`

# 单文件组件 .vue
## .vue
- 需要通过 `Vue脚手架(Vue-CLI)` 构建成浏览器可以识别的代码
  ```shell
  sudo npm install -g @vue/cli
  vue create [app_name]
  ```

### `App.vue`
```html
<template>
  <div>
    <Vc></Vc>
    ...
  </div>
</template>

<script>
  import Vc from 'path/Vc'
  export default {
    name: 'App',
    data(){ return {...} },
    methods: { ... },
    components: { Vc }
  }
</script>

<style> ... </style>
```
### `main.js`
```js
import Vue from 'vue'
import App from './App'

new Vue({
  el: "#root",
  components: { App },
})
```
### `index.html`

