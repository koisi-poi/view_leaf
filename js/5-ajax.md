# ajax
- Asynchronous Javascript And XML(now is json)
- 是一种编程模式
- 本质，即: 通过 js 按需、异步修改 html 内容

## 优缺点
- 优点: 动态网页内容(即设计目标)
- 缺点: 跨域问题，SEO不友好(因为内容是异步请求得到的)

## 实现
### js原生
```js
el.event = ()=>{
    let xhr = new XMLHttpRequest()
    let isSending = false // 避免重复请求
    function func{
        xhr.timeout = ms
        xhr.open('GET','url')
        xhr.send()
        xhr.onreadystatechange = ()=>{
            ...
        }
    }
    return func
}
```
### jQuery
```js
$('#id').eq(0).click( ()=>{
    $.get( url, {param..}, callback(data) )
})

$('#id').eq(0).click( ()=>{
    $.ajax({
        url:  '...',
        data: {...},       // request param
        type: 'GET',
        headers: {...},
        dataType: 'json',  // response type
        success: (data)=>{...},
        timeout: ms,
        error: ()=>{...}
    })
})
```
### axios
```js
axios.default.baseURL = 'endpoint_url'
el.event = ()=>{
    axios.post( '/api..', {
        params:   {...},  // get
        data:     {...},  // post
        hearders: {...}
    }).then( res => {...} )
}

el.event = ()=>{
    axios({
        url:      '...',
        params:   {...},
        data:     {...},
        hearders: {...},
        method:   'GET',
    }).then( res => {...} )
}
```

## 同源策略
- 同源: 协议、域名、端口， 三者都必须协同。
- 不同源，即: 跨域。

### 跨域解决方案
#### JSONP (非官方)
- 利用具备跨域能力的标签，如 img,link,iframe,script
- JSONP 利用的是 script
  - 这就要求 服务端 返回的得是一段 js_code_str , 就很有局限性。
  - html 里面声明一个函数 func ，然后，服务端返回 func(data)

```js
$('#id').eq(0).click( ()=>{
    $.getJSON( 'url?callback=?', callback(data) )
})
// 固定写法: ?callback=?
// jQuery 会自动注册一个函数
// 服务端接收、处理 callback 参数，并作为返回的目标函数名
```

#### CORS (Cross-origin resource sharing)
- `Access-Control-Allow-Origin:  *`
- `Access-Control-Allow-Methods: *`
- `Access-Control-Allow-Headers: *`
