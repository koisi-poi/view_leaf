# Tips
## 空值检查 `let v = target || {}`

# 浏览器本地存储
## WebStorage
### localStorage
- 浏览器关闭还在
```js
localStorage.setItem(key,value)
localStorage.getItem(key)
localStorage.removeItem(key)
localStorage.clear()
```
### SessionStorage
- 浏览器关闭就没了
```js
sessionStorage.setItem(key,value)
sessionStorage.getItem(key)
sessionStorage.removeItem(key)
sessionStorage.clear()
```
