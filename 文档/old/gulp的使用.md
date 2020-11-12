#### 1. 什么是gulp
    是一个流式(任务模式)是前端构建工具.
    
#### 2.gulp的使用

注意:npm 是国外的服务器,下载慢,使用淘宝代理
cnpm,使用cnpm要配置一下
```js
    npm install -g cnpm --registry=https://registry.npm.taobao.org
```

##### 1.全局安装gulp与处体验
```js
    npm install gulp -g //g 全局安装
```
##### 2.配置一个包管理工具

```js
    npm init -y
```

#####  3. 局部安装gulp,当前项目的根目录
```js
    cnpm i gulp --save-dev
```
##### 4.在根目录下,新建一个 `gulpfile.js`文件

##### 5. 运行指令
```js
    gulp
```

#### 一、压缩html方式
1. 在当前的项目里面下载 `gulp-htmlmin` 模块
```js
   cnpm i gulp-htmlmin --save-dev
```
2.使用 gulp-htmlmin
 匹配符“!”，“*”，“**”，“{}”
```js

  let optsHtml={
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }

    const htmlmin=require("gulp-htmlmin");
    //创建html压缩的任务
    gulp.task("htmlmin",function(){
        gulp.src(["./src/*.html","./src/*.htm"])
        .pipe(htmlmin(optsHtml))
        .pipe(gulp.dest("./dist"));
    })
```

#### 二、压缩JavaScript的方式和使用gulp-babel 处理ES6的代码
1.下载 `gulp-uglify` 模块 ,注意:它不能直接压缩es6的代码,要使用 `gulp-babel`(7.0.1)模块
还需要 `babel-preset-env`  (es6的不同版本,加载不同的新特效)
```js
    cnpm i gulp-uglify  gulp-babel@7 babel-preset-env@1 --save-dev
```
2.使用 `gulp-uglify`模块
```js
 const uglify=require("gulp-uglify");
  const babel=require("gulp-babel");
    gulp.task('jsmin', function () {
    gulp.src(['src/js/animate.toolsB.js']) //多个文件以数组形式传入
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    });
```

3.`gulp-babel`需要依赖`babel-core`,需要再下载 `babel-core@6.26.3`,接着
在项目的跟目录下,配置一个babel配置文件,这个文件有一定要求规范
    
    1.文件名称必须叫做`.babelrc`
    2. 这个`.babelrc`的内容代码如下:
    
.babelrc的内容
```js
        {
         "presets": ["env"]
        }
```
#### 三、使用`gulp-imagemin`模块处理图片
1.下载这个`gulp-imagemin`
```js
cnpm i  gulp-imagemin -D
```
2.使用 gulp-imagemin
```js
 const imagemin=require("gulp-imagemin");
 gulp.task("imagemin",function(){
    // （**匹配src/js的0个或多个子文件夹）
    gulp.src(['./src/images/*.{png,jpg,gif,svg,jpeg}','./src/**/*.{png,jpg,gif,svg,jpeg}'])
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"))
     
 });
```

#### 四、压缩CSS
1. 下载 `gulp-clean-css`模块,但是遇到css3的私有前缀就没法处理,要使用
`gulp-autoprefixer`模块
```js
    cnpm i gulp-clean-css --save-dev
```
2.使用
```js
const  cssmin = require('gulp-clean-css');
gulp.task('Cssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

```

#### 五、使用`gulp-autoprefixer`模块
1.下载 `gulp-autoprefixer`
```js
    cnpm i gulp-autoprefixer --save-dev
```
2.使用
```js
    gulp.task('testAutoFx', function () {
    gulp.src('src/css/index.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});

```

#### 六.自动刷新测试服务器组件`browser-sync`
1.全局安装`browser-sync`
```js
    cnpm i browser-sync -g
```
2. 在当前的项目下面再次安装局部模块
```js
    cnpm i browser-sync --save-dev
```


    // 设置任务---使用代理
    gulp.task('browser-sync', function () {
        browserSync.init({
            files:['./src/**'],
            //proxy:'localhost', // 设置本地服务器的地址
            port:8083,  // 设置访问的端口号
            server:{
                baseDir: "./"
            },
            directory:true
        });
    
        gulp.watch(["./src/*.html","./src/*.htm","./src/css/*.css","./src/js/*.js"],
        ["htmlmin", "jsmin", "imagemin", "Cssmin"],browserSync.reload);
    });



#### 完整代码
编写完项目后运行
`gulp run`或`gulp`
```js
const gulp = require("gulp");

const htmlminA = require("gulp-htmlmin");
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const cssmin = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


//压缩html
gulp.task("htmlmin", function(){

    gulp.src(["./src/*.html", "./src/*.htm"])
        .pipe(htmlminA({
            removeComments : true,//清除HTML注释
            collapseWhitespace : true,//压缩HTML
            collapseBooleanAttributes : true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes : true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes : true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes : true,//删除<style>和<link>的type="text/css"
            minifyJS : true,//压缩页面JS
            minifyCSS : true//压缩页面CSS
        }))
        .pipe(gulp.dest("./dist"));
});
//压缩js
// 不想参与任务的文件,在文件路径的前面 !
gulp.task('jsmin', function(){
    gulp.src(['src/js/animate.toolsB.js']) //多个文件以数组形式传入
        .pipe(babel()) //注意,压缩js之前,就先要进行ES6的代码处理
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//压缩,处理图片文件


gulp.task("imagemin", function(){
    // （**匹配src/js的0个或多个子文件夹）
    gulp.src(['./src/images/*.{png,jpg,gif,svg,jpeg}', './src/**/*.{png,jpg,gif,svg,jpeg}'])
        .pipe(imagemin({
            optimizationLevel : 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive : true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced : true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass : true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest("./dist/images"))

});


//压缩css
gulp.task('Cssmin', function(){
    gulp.src('src/css/*.css')
    //自动补全浏览器的私有前缀
        .pipe(autoprefixer({
            browsers : ['last 2 versions', 'Android >= 4.0'],
            cascade : true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove : true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("run",["htmlmin", "jsmin", "imagemin", "Cssmin"]);

gulp.task("default", ["htmlmin", "jsmin", "imagemin", "Cssmin","browser-sync"]);

// 设置任务---使用代理
gulp.task('browser-sync', function () {
    browserSync.init({
        files:['./src/**'],
        //proxy:'localhost', // 设置本地服务器的地址
        port:8083,  // 设置访问的端口号
        server:{
            baseDir: "./"
        },
        directory:true
    });

    gulp.watch(["./src/*.html","./src/*.htm","./src/css/*.css","./src/js/*.js"],["htmlmin", "jsmin", "imagemin", "Cssmin"],browserSync.reload);
});

```


