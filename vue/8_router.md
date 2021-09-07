# Router
- 背景: 实现 SPA(single page application)
- 是编译行为
- 切换路由时，不可见的组件会被销毁

## 基本使用
- `npm i vue-route -D`
- `<router-link class=".." active_class=".." to="/about"></router-link>`
- `<router-view class=".." active_class=".."></router-view`
- 每个 vc 有一个自己的 `$route`
- 全局共享一个 `$router`

### 示例
#### `{home}/src/router/index.js`
```js
import VueRouter from 'vue-route'
import About     from '../pages/About'
import Home      from '../pages/Home'
import New       from '../pages/New'

export default new VueRouter({
  routes:{
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          // <router-link to="/home/new">
          // <router-link :to="{name:xx}">
          name: 'home-new'
          path: 'new',
          component: New
        },
        { ... }
      ]
    }
  }
})
```
#### `main.js`
```js
import Vue from 'vue'
import App from './App.vue'
// index 可以不写
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: "#id",
  render: h => h(App),
  router: 
})
```
### 目录约定
```md
- package.json
- src/
  - main.js
  - router/
  - store/
  - components/
    - 一般组件,基础组件
    - 直接以组件名引用: `<Vc></Vc>`
  - pages/
    - `<router-view/>`

```

## `<router-link replace to="url">`
- 这里是在 渲染的前端组件间 传递参数，而不是向后端传参数！
- 历史记录模式
  - push 模式，往当前历史记录栈里面push新的记录
  - replace 替换栈顶记录
### query
```js
to="url?argA=xxx&argB=xxxx
// 解释为js_expr
:to="`url?argA=${valA}&argB=${valB}`"
:to="{
  path: 'url', // or name: named
  query: {
    id: id,
    title: title
  }
}"

// html
$route.query.argA
```
### params props
- `query` 定义在 `<router-link>`
- `params` `props` 定义在 `router`
  - `params`: `path: 'hub/:hub/stream/:s'`
  - `props`:  `props($route){ $route.query.hub }`
#### 定义
```js
{
  routes: [{
    path: 'hub/:hub/stream/:s', 
    // 自动将 params(hub、s) 封装成 props
    // props: true,
    // props($route){
    //   return { hub:$route.query.hub }
    // }
    props({query:{hub}}){ // 解构赋值
      return { hub }
    }
    ..
  }, .. ]
}
```

#### 在 route-link 模板传递 params
```js
:to="{name:'name', params:{..}}"
:to="`hub/${hub}/stream/${s}`"
```

#### 引用
```js
```

# 编程式 路由导航
- 即: 不使用 `<route-link>`
- 背景: `<route-link>` 会转换成 `<a>`, 而有些场景不用`<a>`标签
```js
{
  methods: {
    func(...val){
      this.$router.push({
        name: ..,
        query: ..
      })
    }
  }
}
```

# this.$router
## push
## replace
## back
## forward

# 缓存路由组件 keep-alive
- 切换路由时，指定 router-view 不销毁
```js
// <keep-alive :include="[...Vc]">
<keep-alive include="Component">
  <router-view></router-view>
</keep-alive>
```
## activated deactivated
- 组件被切换掉时，可能需要自己通过 `deactivated` 关掉一下异步、周期任务

# 路由守卫
## 前置
```js
const router = new VueRouter({
  routes: [ {
    meta: { isAuth:false }
  },...]
})

router.beforeEach((to,from,next)=>{
  if to.meta.isAuth
  ok → next()
})

export default router
```
## 后置
- `afterEach(to,from)` 用的少
- 比如，修改浏览器Tab的文本 `document.title`

## 独享路由守卫
```js
const router = new VueRouter({
  routes: [ {
    name:
    path:
    beforeEnter(to,from,next){},
    // 没有独享的后置守卫
  },...]
})
```

## 组件内守卫
```js
// Page.vue
export default {
  ...,
  beforeRouteEnter(to,from,next),
  beforeRouteLeave(to,from,next)
}
```