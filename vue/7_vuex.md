# vuex
- 集中式状态(数据)管理
- 是一个Vue插件 `Vue.use(Vuex)`
- 适用于任意组件间通信
- 用于存储共享数据，有点像分布式服务共享 redis
  - 不仅把数据存了，还是响应式的

## 原理图
![picture 1](https://p1.kodo-oss.dronekumo.xyz/804b3f1726d96efff66e67cdf9cda40a53c0a67f5f8164bde1b8756107768634.png) 
- `store` 操作平台
  - `Actions`  拦截器、前处理、异步处理(ajax)，非必须
  - `Mutations` setter
  - `State` getter
- 结构上和 消息总线，全局消息队列 很像
  - 但是，`Vuex` 帮忙实现了响应式设计(`State` setter & 数据侦听)

## 基本使用
- `npm install vuex -D`
  - `-s: --save` `-D: --save-dev`
- `Vue.use(Vuex)`
  - 使Vue实例具备属性 `store` `$store`
- `{home}/src/store/index.js`
  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  const atctions  = {
    // ctx 是一个 mini-store
    funcInAct( context, ...args){
      context.commint('MUT', ..args)
    }
  }
  const mutations = {
    // 习惯上，方法名全大写
    // 当然，不通过 mutations, 直接在 Vc 操作 state 也可以
    MUT( state, ..args){
      操作: state.shared
    }
  }
  const state     = {
    shared: ...,
  }
  // store 的 computed 属性
  // {{ $store.getters.cop }}
  const getters = {
    cop(shared){ ... }
  }

  // 对象属性名和值相同，可以简写
  export default new Vue.store({
    atctions,
    mutations,
    state
  })
  ```
- 在入口文件配置，即可使所有组件都获得`$store`
  ```js
  {{ $store.state.shared }}
  // App.vue

  // Vc.Vue
  export default {
    data: {},
    methods: {
      funcA(){
        this.$store.dispatch( "funcInAct", ...args)
      },
      funcB(){
        this.$store.commit( "MUT", ...args)
      }
    }

  }
  ```

### `mapState` `mapGetters` → `computed`
```js
import {mapState,mapGetters} from 'vuex'
export default {
  ...,
  computed:{
    ...mapState({
      computedProp: 'stateKey', 
      ...
    }),
    // 名称相同，简写成数组形式
    ...mapState( [ 'stateA', 'stateB', ...]),
    ...mapGetter( [ 'getA', 'getB', ...])
  }
}
```
### `mapActions` `mapMutations` → `methods`
- 这个应该用得少点
```html
<button @click="actA(n)"></button>
<button @click="actB(n)"></button>
```
```js
import {mapMutations,mapActions} from 'vuex'
export default {
  ...,
  methods: {
    // 参数要在使用处指明
    ...mapActions(['actA','actB'])
  }
}
```

## 模块化 namespace
```js
const nsA = {
  actions,
  mutations,
  state,
  getter
}
const nsB = {}

export default new Vue.store({
  modules: {
    nsA,
    nsB
  }
})
```

