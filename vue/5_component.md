# 组件 component
- 一个元素只由一个Vue实例接管 `new Vue({})`
- 一个Vue实例可以引用多个组件 `const component = Vue.extend({})`
  - `Vue.extend({})`可以不写，如果直接传一个对象给Vue实例，会自动调用
- `VueComponent.prototype.__proto__ === Vue.prototype`

