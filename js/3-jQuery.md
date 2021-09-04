# Start

## 两把利器
- jQuery 函数
  - `window.jQuery = window.$ = jQuery`

- jQuery 对象
  - 习惯地 `var $el = $('#el')`
  - 是一个包含了选择器匹配的多个DOM元素的伪数组对象，提供如下方法：
    - `size()/length` 元素个数
    - `[index]/get(index)`
    - `each( func( index, item) )`
    - `index()` 当前元素，在它兄弟中的index

## 两种使用方式
### 作为函数使用 (一般用来获取 html 元素)
- `$( func(){...} )` 会确保DOM加载完后再执行 func
- `$('el_selector')` 选择元素，并封装成一个 jQuery 对象
  - `$('#date>tbody>tr:odd).css(..)`
- `$(dom_obj)` 根据 dom_obj 代码生成一个 jQuery 对象
- `$('html_str')` 根据 html 代码生成一个 jQuery 对象
### 作为对象使用 (提供一些工具方法)
- 工具方法
  - `$.each( [..], func( index, item) )`


## 选择器
![picture 1](https://p1.kodo-oss.dronekumo.xyz/cb3d37c4619ae2031c0e5de49000ca35c5cb7e54d3955e38c6cd204b3f5069a8.png)  

## 筛选 (过滤、查找)
![picture 2](https://p1.kodo-oss.dronekumo.xyz/24a8b6542b54ef806c809b49bf7df13bc15dba9d05dca1de68dc4819fb4529d1.png)  

## 事件委托/代理
![picture 3](https://p1.kodo-oss.dronekumo.xyz/fa89772528fc0b61a4752ececfc4861bc3db1ac4b81cc5ea351fb777d38bd686.png)
- func 里面的 this 将是触发事件的子元素，即 event.target
