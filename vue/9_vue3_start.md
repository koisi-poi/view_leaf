# Vue3
- 似乎是变得像 react 了？
  
## 更新变化
- 不向前兼容
- 性能优化
  - 减小体积，减低内存，提高速度
- 响应式实现 defineProperty → Proxy
- 拥抱 ts
- Composition API
- data 始终被声明为一个函数
- `<template>`可以没有根标签

## 创建 Vue3 工程
### vue-cli
### vite 
- 新一代构建工具(对应旧的webpack)
- 更快更好
- npm内置: `npm init vite <project-name> -- --template vue`

### main.js
```js
import { createApp } from 'vue'
import App from './App.vue'

// 比vue2中的vm实例更轻，因为这里只是一个入口，所以去掉了一些不需要的属性
// 且不兼容以前的写法
createApp(App).mount('#app')
```

# 常用的 Composition API
- 组合式 api

## setup
- 一个配置项，是一个函数
- 所有 Composition API `表演的舞台`
- 组件的 data、methods 等，都改写到 `setup` 里面(原理的写法也可以，但不建议)
- 在 `beforeCreate` 之前执行，此时 `this` 还是 `undefined`
```js
import {ref,reactive} from 'vue'
export default {
  name: 'App',
  props: [],
  emits: [], // 声明本组件会抛出的事件, 非必须
  // context: attr, slot, emit
  setup(props,context){
    let name = ref('poi') // 页面引用时直接 {{ name }}
    let age = 16 // 不支持响应式
    // obj 也可以用 ref(), 但是调用时要加 .value
    let obj = reactive(// 利用了 es6 的 window.Proxy
      prop: ...  // {{ obj.prop }}
    )
    function func(){
      set  name.value = v
      // 如果是通过ref创建的: obj.value.prop = v
      set  obj.prop = v
      echo `${age}`
    }
    // return 的 属性、方法 可以在模板里面引用
    return { name, obj, func}
  }
}

// 基操
setup(){
  let data = reactive()
  methods = {
    func
  }
  return { ...data, ...methods }
}
```
## 赋予 属性 响应式的能力
- 和 vue2 对比:
  - 性能更好
  - vue2响应 新增、删除 属性，配置较复杂
  - vue2响应数组有局限性，必须调用特定方法
### ref 函数
- 基本类型用这个
- 基于: Object.defineProperty 的 getter setter
- 使用:
  - `{{ prop }}`
  - ` prop.value `
### reactive
- 对象、数组用这个, 响应式是深层次的
- 基于 es6 的 window.Proxy
- 使用:
  -  `{{ obj.prop }}`
  -  ` obj.prop `

### 原理 Proxy & Reflect
- Proxy
  ```js
  const proxy = new Proxy{ target,{
    // 增加新属性时，也会调用 get
    get( target, prop){ ..., return target[prop] },
    set( target, prop, value){ ..., target[prop] = value },
    deleteProperty( target, prop){ ..., return delete target[prop] }
  }}
  ```
- Reflect
  - 目前 ECMA 正在尝试将 Obejct 的一些方法迁移至 Reflect
  - 改进点(相比Obejct): 不直接抛出异常，而是返回状态(就不用try..catch..了)
  ```js
  Reflect.get(obj,'prop')
  Reflect.set(obj,'prop',value)
  Reflect.deleteProperty()
  ```

## computed
```js
import {ref,reactive,computed} from 'vue'

export default {
  name: 'poi',
  setup(){
    let data = reactive({...})
    // 反正 setup 时， this 还是 undefined
    // 只读可以直接用 箭头函数
    let cpd  = computed(()=>{...})
    data.newPorp = computed({
      get(){},
      set(v){}
    })
    return { data, cpd}
  },
  ...
}
```

## watch
```js
import {watch,...} from 'vue'
export default {
  name: 'poi',
  setup(){ 
    let data = reactive({...})
    watch(data,(new,old)=>{})
    // 监视一组 ref
    watch([ref1,ref2],(n,o)=>{})
    // 监视reactive部分性
    // 如果prop依然是对象，要按需配置{deep: true}
    watch(()=>obj.prop,(n,o)=>{},{deep: true})
    watch([()=>obj.prop,()=>obj.prop2],(n,o)=>{})
  }
}
```

## watchEffect
![picture 1](https://p1.kodo-oss.dronekumo.xyz/b2496ef62fe4f82aa2d09b647aae2ee5591177ca2b423017da51387bc393f47b.png)  

# 生命周期
- 也提供了函数式方法，可以在 `setup` 里面调用(配置)
![picture 2](https://p1.kodo-oss.dronekumo.xyz/f44c1d1aaa2476099879233f5cf6628d5f159769af89067354c7bc681863a870.svg)  

# 自定义 hook
- 类似 vue2 的 mixin
```js
// {home}/src/hooks/useSomething.js
import { reactive,onMounted, ...} from 'vue'
export default function(){
  // subOfSetup:
  let ...
  function ...
  onHook ...
  return { ... }
}

// 使用:
import useSomething from '../hooks/useSomething'
{
  setup(){
    let sth = useSomething()
    return { sth }
  }
}
```

# toRef
```js
{
  setup(){
    let obj = reactive({})
    return { 
      prop: toRef(obj,'prop'),
      prop2: toRef(obj.subObj,'prop2') ,
      ...toRefs(obj2)
    }
  }
}
```
