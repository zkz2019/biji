##axios 获取远程数据
###  后端需要下载模块 前端需要引入
```angular2html
var axios = require("axios");  // npm install axios

	axios.get("http://localhost:8081/?a=1&b=2").then(result=>{
		console.log( result.data );
	})

	axios.post("http://localhost:8081/", {a:"你好", b:"abc123"}).then(result=>{
		console.log( result.data );
	})

```
#####官网有文档
```官网有文档
    <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
```
###接收数据格式仿佛需要字符串
####多组数据可用"&"连接
```一般格式
          var obj="type="+type.value+
                  "&title="+title.value+
                  "&price="+price.value+
                  "&content="+ediHtml+
                  "&revtime="+time.toLocaleString()+
                  "&id="+id;
```
####form表单可用  new FormData();
```form表单提交
form1.onsubmit = function () {
            var data = new FormData();
            data.append("type", type.value);
            data.append("title", title.value);
            data.append("price", price.value);
            data.append("content", editor.txt.html());
            data.append("img", img.files[0]);
            let headers = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            axios.post("/goods", data, headers).then(res => {
                console.log(res.data);
            })
            return false;
        }
```

###fs模块  
#####系统模块,无需安装  可直接使用 var fs = require("fs")
| a | b | c |
| -------------- | -------------- | :----- |
|readFile()读文件|unlink()删文件|writeFile()创建文件写入内容|
|appendFile()创建文件追加内容|exists()文件及文件夹是否存在|rename()文件改名|
|mkdir()创建目录|readdir()读目录|rmdir()删目录|
|stat()相关信息
|

##mongodb 环境搭建
```angular2html
var mongodb = require("mongodb"); //npm install mongodb
	var MongoClient = mongodb.MongoClient;
	var ObjectId = mongodb.ObjectID;
	var url = "mongodb://localhost:27017/";
	MongoClient.connect(url, (err, database)=>{
		// 操作数据库的代码，必须写在里面
	});
```
### 创建或使用数据库
```angular2html
	 var db = database.db("数据库名称");
```
####创建集合
```angular2html
	 db.createCollection("表名", (err, result)=>{});
```
##mongodb 增删查改
###id查询需要ObjectId()进行转换
```
var {id}=req.query;
var where={"_id":ObjectId(id)};
```
###接收数据类型为对象
```angular2html

```
####插入数据
#####insert 插入数据时，如果表原本就不存在，那么会自动创建这个表。
```angular2html
	var myobj = {"user":"张三", "pwd":"123"}
	db.collection("表名").insertOne( myobj, (err, result)=>{} );
	var myobj = [{...},{...},{...},{...}.....]
	db.collection("表名").insertMany( myobj, (err, result)=>{} );
```
####查询数据方法
```angular2html
var where = {}
	db.collection("表名").find(where).toArray( (err, result)=>{} );
	1表示显示；0表示隐藏		...find().project({user:1,pwd:1}).toArray...
	1表示升序；-1表示降序		...find().sort({user:1,pwd:-1}).toArray...
	skip(5)表示跳过5条；limit(5)表示取出5条	...find().skip(5).limit(5).toArray...
	查询数量			...find().count().then(result=>{console.log(result);})
	{_id:ObjectId("5b2f7211368e95581be262a6")}
```
#### 更新数据方法
#####修改数据需要使用"$set" 数据类型为对象,"$set"为对象名
```angular2html
    var whereObj = {user:"张三"}
	var updateObj = {$set:{"user":"李四"}}
	db.collection("表").updateOne(whereObj, updateObj, (err, result)=>{});
```
####删除数据
#####删除多条数据使用deleteMany
```angular2html
	var whereObj = {user:"张三"}
	db.collection("表").deleteOne(whereObj, (err, result)=>{})
```
