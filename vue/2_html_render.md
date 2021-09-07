# 样式
## 接管 Class 与 Style
- `:class` `:style`
```html
<div id="root">
  <!-- class样式 字符串写法,  样式类名不确定，需要动态指定 -->
  <div class="basic" :class="mood" @click="chMood">{{name}}</div> <br/>
  <!-- class样式 数组写法,    样式个数不确定、名字也不确定 -->
  <div class="basic" :class="classArr">{{name}}</div> <br/>
  <!-- class样式 对象写法,    样式个数确定、名字也确定，但要动态决定用不用 -->
  <div class="basic" :class="classObj">{{name}}</div> <br/>

  <!-- 绑定style样式--对象写法 -->
  <div class="basic" :style="styleObj">{{name}}</div> <br/>
  <!-- 绑定style样式--数组写法 -->
  <div class="basic" :style="styleArr">{{name}}</div>
</div>
```
```js
const vm = new Vue({
  el:'#root',
  data:{
    name:'poi',
    mood:'normal',
    classArr:['c1','c2','c3'],
    classObj:{
      c1: false,
      c2: false,
    },
    styleObj:{ fontSize: '40px', color:'red' },
    styleObj2:{ backgroundColor:'orange' },
    styleArr:[
      { fontSize: '40px',color:'blue' },
      { backgroundColor:'gray' }
    ]
  },
  methods: {
    chMood(){
      const arr = ['happy','sad','normal']
      const index = Math.floor(Math.random()*3)
      this.mood = arr[index]
    }
  }
})
```

# html 元素渲染
## 使用 `<template>` 无侵染

## 条件渲染 `v-if` `v-show`
- `v-show="bool_expr"`
  - false: 隐藏元素
  - 频繁变换，高效
- `v-if="bool_expr"` `v-else-if="bool_expr"` `v-else`
  - false: 直接移除元素
  - 编译时，基本上就确定了要不要渲染
  - `v-else` `v-else-if` 必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后
  - **template**: `<template v-if=v-if="bool_expr">`
  - 不推荐同时使用 `v-if` 和 `v-for`

## 列表渲染 `v-for`
- 数组
  ```html
  <ul id="example-2">
    <!-- 少用 index, item 有 id 就用 id -->
    <!-- 只读才勉强可以用 index(甚至可以不用) -->
    <li v-for="(item, index) in items" :key="index">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
  </ul>
  ```
  ```js
  var vm = new Vue({
    el: '#example-2',
    data: {
      parentMessage: 'Parent',
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
  })
  ```
- 对象
  ```html
  <ul id="v-for-object" class="demo">
    <li v-for="(value, key) in object">
      {{ value }}
    </li>
  </ul>
  ```
  ```js
  new Vue({
    el: '#v-for-object',
    data: {
      object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  })
  ```

### `:key`
- 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute：`:key="item.id"`

#### 虚拟DOM中key的作用
- key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较。
        
#### 对比规则
1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
     ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
     ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

2. 旧虚拟DOM中未找到与新虚拟DOM相同的key,创建新的真实DOM，随后渲染到到页面。

#### 用index作为key可能会引发的问题
1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作: 会产生没有必要的真实DOM更新，效率低。
2. 如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题。

#### 开发中如何选择key?
1. 使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

### 过滤/模糊搜索 → 计算属性
```js
<li v-for="n in evenNumbers">{{ n }}</li>

new Vue({
  data: {
    filter: 2
    numbers: [ 1, 2, 3, 4, 5 ]
  },
  computed: {
    filterNumbers: function () {
      return this.numbers.filter( (number)=>{
        return number % this.filter === 0
      })
    }
  }
})
```

## 动态侦听原理 (数据劫持)
- 数据劫持 (由ob的setter劫持)
  1. 加工创建对象时传入的data(创建观察者ob)
  2. `vm._data = data = ob`
- 对象侦听: 通过ob的 setter 实现响应式
- 数组侦听: 重写部分方法
  - 重写了的: push pop shift unshift splice sort reverse

### 实现: 观察者模式
```js
// 这里面存了一个入参: obj(闭包)
function Observer(obj){
  const keys = Object.keys(obj)
  keys.forEach( (k)=>{
    // 执行 setter/getter 时，调用的是 obj
    // 而不是 this，否则会循环调用
    Object.defineProperty(this,k,{
      get( ){ return obj[k] },
      set(v){
        doReander()
        obj[k] = v 
      }
    })
  })
}

// 这个demo只考虑了一层
// 如果data内包含对象、数组，需要设计递归的Observe
let data = {
  name: "poi",
  level: 233
}
const obs = new Observer(data)
let vm = {}
vm._data = data = obs // 原data引用保存在obs的入参里面
```
### Vue.set (后期添加属性)
- 用于后期添加属性(自动补充 ob getter setter)
- `Vue.set( vm._data.prop, "subProp", value)`
- `vm.$set( vm._data.prop, "subProp", value)`
- `vm._data.prop` 可以简写为 `vm.prop`
- 局限性: 不能在`vm` `vm._data`上新增，只能是`vm._data.obj`
- 修改数组`Vue.set( vm._data.arr, index, value)`

### 渲染无效的例子
```js
const vm = new Vue({
  el:'#root',
  data:{
    persons:[
      {id:'001',name:'1122',age:14,sex:'女'},
      {id:'002',name:'2233',age:16,sex:'女'}
    ]
  },
  methods: {
    updateMei(){
      // 有效，基于对象的 setter
      // this.persons[0].name = '2211'
      // this.persons[0].age = 12

      // 无效，数组没有 setter
      // this.persons[0] = {id:'001',name:'1234',age:15,sex:'男'}
      // 有效，splice 被重写了
      this.persons.splice( 0, 1, {id:'001',name:'1234',age:15,sex:'男'})
    }
  }
}) 
```