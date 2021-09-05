# 组件 component
- 一个元素只由一个Vue实例接管 `new Vue({})`
- 一个Vue实例可以引用多个组件 `const component = Vue.extend({})`
  - `Vue.extend({})`可以不写，如果直接传一个对象给Vue实例，会自动调用
- `VueComponent.prototype.__proto__ === Vue.prototype`

# 单文件组件 .vue
## .vue
- 需要通过 `Vue脚手架(Vue-CLI)` 构建成浏览器可以识别的代码(用nodejs引擎构建)
  ```shell
  sudo npm install -g @vue/cli
  vue create [app_name]
  ```

### `App.vue`
```js
<template>
  <div>
    <slot>默认值，如果上层调用者没有传递内容</slot>
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

// 可以指定 lang="less"
<style> ... </style>
```
### `main.js`
```js
// 引入一个运行时版本的 vue ，必须使用 render()
// import Vue from 'vue'
import App from './App'

new Vue({
  el: "#root",
  components: { App },
})
```
### `index.html`


## vue-cli 脚手架
### 默认配置
- 查看默认配置 `vue inspect > output.js`
- 自定义配置, 新建 `vue.config.js`
### 常用配置项
- 语法检查 `lintOnSave`

# vc组件模板 标签
## ref `<el ref=[val]>..</el>`
- vue自己定义的id选择器
- 打标记 `<el ref=[val]>..</el>`
- 获取元素 `this.$refs.[ref]`
- `id` 和 `ref` 加给`<Vc></Vc>`时的行为不同，ref标记的是vc对象，id是vc内的根html元素

## props `<el [...props]>..</el>`
- 如果值要是数字 `:prop`  `<el name="koisi" :age=16 >..</el>`
- `props` 是只读的(如果是对象，是可以改成员的)
```html
<script>
  export default {
    data: {
      // 创建 vc 实例时， 将 this.age(来自props) 的值赋给响应式变量
      return { age2: this.age }
    },
    method: { updAge(){ ++age2 } } //age2是响应式的，可以修改
    // props: [...props]
    // or
    // props: { name: String, age: Number }
    props: {
      name: {
        type: String,
        required: true
        // default: ..
      }
    }
  }
</script>
```

## $emit & 自定义事件
- 子组件 `$emit` → 父组件
- 禁用目标事件的 emit
  - `this.$off('eventInPoi')` 
  - `this.$off([...])` 
  - `this.$off()` 禁用全部
- 组件使用原生事件 `<Poi @click.native="funcInParent" />`
```js
// 对比 props:
// <Poi :propToPoi="funcInParent" />
<Poi v-on:eventInPoi="funcInParent" />
<Poi @eventInPoi.once="funcInParent" />
// Poi.vue
export default {
  ...
  methods: {
    func(){
      this.$emit('eventInPoi', ...args)
    }
  }
}

// 也可以不写 <Poi v-on:eventInPoi="funcInParent" />
<Poi ref='poi' />
// 在 Parent 里面写
{ 
  ...
  mounted(){ 
    this.$refs.poi.$once('eventInPoi', funcInParent)
    //this.$refs.poi.$on('eventInPoi', funcInParent)
  }
}
```

# 插槽 slot
## 默认插槽
- `<slot></slot>`
## 具名插槽
- 即 支持多个插槽
- `<el slot="key"></el>`
- `<template slot="key"></template>`
- `<template v-slot:key></template>`
- `<slot name="key"></slot>`
## 作用域插槽
- `<template scoped="todos" slot="key"></template>`
- `<slot :todos="todos" name="key"></slot>`

# 组件间通信 
## 全局事件总线
- 这个还是比较繁琐的，不推荐
```js
// 安装全局事件总线
BusPoi = Vue.extend({})
Vue.prototype.$bus = new BusPoi()
// or
new Vue({
  ...
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})

this.$bus.$emit('event', ...args)
this.$bus.$on('event', (...args)=>{...})
// 这里的自定义事件不会随组件销毁而解绑
// 如果有需要，得自行通过 销毁钩子 来解绑 $off
```
## 消息订阅与发布 (推荐)
- 第三方库 `pubsub.js`
```js
import pubsub from 'pubsub-js'

this.subId = pubsub.subscribe('topic',(topic,data)=>{...})
pubsub.publish('topic', data)
pubsub.unsubscribe(this.subId)
```
## 见 vuex

# mixin 共享/混合 Vue实例配置
```js
const shared = {}

// 全局混合
Vue.mixin(shared)

new Vue({
  ...
  mixins: [shared]
})
```

# 自定义插件 plugins
- myPlugin.js
  ```js
  export default {
    install(Vue, ...args){
      // 配置全局过滤器
      Vue.filter()
      // 配置全局指令
      Vue.directuve()
      ...
    }
  }
  ```
- 引入插件
  ```js
  import plg from './myPlugin'

  Vue.use(plg, ...args)
  new Vue({...})
  ```

# 样式 与 scoped
- 背景: 所有vue组件的style配置默认最终会合成在一起
- `scoped` 指明只在自身生效，原理: 自动生成、添加唯一 id选择器
- 一般是靠近叶的vc用，靠近根的不用