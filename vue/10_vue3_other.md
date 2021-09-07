# Composition 其他 API

## shallowRef shallowReactive
- 都是真的对象数据来用
  - shallowRef，对象内容不会修改，但是引用本身的值会改变(指向一个新的对象)
  - shallowReactive，浅层次响应(仅第一层)
- `let obj = shallowReactive({})`

## readOnly(deep) shallowReadOnly

## toRaw markRaw

## customRef

## provide & inject
- 祖孙组件通信(跨级通信)

## isRef isReactive isReadOnly isProxy

# Composition 优势总结
- 原先Vue2，称为 Options api
- setup 也可以模块化
  - ~~自定义hook 和 vue2 mixin 不是都负责这个吗？~~
  - 见图
<div style="width:250px;height:170px;overflow:hidden;float:left">
    <img src="https://p1.kodo-oss.dronekumo.xyz/vue3_202108_composition_1"style="height:360px"/>
</div>
<div style="width:215px;height:170px;overflow:hidden;float:left">
    <img src="https://p1.kodo-oss.dronekumo.xyz/vue3_202108_composition_2"style="height:360px"/>
</div>

# 新组件

## fragment
- 组件`<template>`可以没有根标签，自动包含到一个 fragment 虚拟元素里面

## teleport
- 直接丢到指定元素的子节点，比如body，从而获取正确的窗口摆放位置

## suspense
- 异步渲染

# 相对 vue2 的其他变化
- 反正 vue2 忘差不多了，就不对比了，直接看3
  