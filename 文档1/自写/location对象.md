####location指示了其所连接对象的url位置。Document和window对象中都有location属性，可以通过window.location和document.location访问。
####注意 如果想要获得当前文档的完整url字符串，有四种方式
  ```document.location
             document.location.href
             document.URL
             document.location.toString() 
   ```      
####JS中Location属性 
####hash 设置或返回从井号 (#) 开始的 URL（锚）。如果地址里没有“#”，则返回空字符串。
####host 设置或返回主机名和当前 URL 的端口号。
####hostname 设置或返回当前 URL 的主机名。
####href 设置或返回完整的 URL。在浏览器的地址栏上怎么显示它就怎么返回。
####pathname 设置或返回当前 URL 的路径部分。
####port 设置或返回当前 URL 的端口号，设置或返回当前 URL 的端口号。
####protocol 设置或返回当前 URL 的协议，取值为 ‘http:’,’https:’,’file:’ 等等。
####search 设置或返回从问号 (?) 开始的 URL（查询部分）。 
####JS中Location对象方法
####assign() 加载新的文档。
####reload() 重新加载当前文档，相当于按浏览器上的“刷新”(IE)或“Reload”(Netscape)键。
####replace() 用新的文档替换当前文档，相当于按浏览器上的“刷新”(IE)或“Reload”键。