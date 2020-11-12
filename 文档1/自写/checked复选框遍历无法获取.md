##checked遍历时,遍历内部内部有事件无法被获取
####可以将事件放到遍历
```
<script>
    check.forEach(el => {
                el.onclick = function () {
                    for (var i = 0, len = check.length; i < len; i++) {
                        if (!check[i].checked) {
                            allselect.checked=false
                            return;
                        }
                    }
                    allselect.checked=true;
                }
            })   
</script>
```
####获取失败演示:
```
<script>
               
                 for (var i = 0, len = check.length; i < len; i++) {
                    check[i].onclick = function () { 
                        if (!check[i].checked) {      //checked of undefined
                            allselect.checked=false
                            return;
                        }
                        allselect.checked=true;
                    }
                }
</script>

```

