## 记录一些 js 的基础性的小技巧

- 判断是否是微信浏览器

```
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
```

- 判断是移动端浏览器还是 PC 端浏览器

```
function is_PC(){
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   return false
} else {
   return true
}
}
```

- 字符串模糊匹配

```
    let a = "AaBbCcDdEe";
    let b = "ab";
    let str = a.toUpperCase();
    let filter = b.toUpperCase();
    str.indexOf(filter)
```
