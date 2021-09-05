# Tip

## 自定义模板中使用 v-for
```js
<Poi v-for="todo in todos" :key="todo.id" :prop="todo" />

// Poi.vue
export default {
  ...
  props: [prop]
}
```

## 同级别组件共享数据
1. 把数据放给共同的父节点(以`props`传递)
   - 子节点传数据给父节点: 父节点要将一个 receive 方法以props 的方式传给这个子节点(如果目标是对象，直接传引用也可以，但是不建议，设计上props应该是只读的)

## 代理
