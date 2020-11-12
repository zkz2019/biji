# webpack 学习笔记

## Webpack 是⼀一个打包模块化 JavaScript 的⼯工具，它会从⼊入⼝口模块出发， 识别出源码中的模块化导⼊入语句句，递归地找出⼊入⼝口⽂文件的所有依赖，将⼊入 ⼝口和其所有的依赖打包到⼀一个单独的⽂文件中

### webpack 默认支持 JS 模块和 JSON 模块;支持 CommonJS Es moudule AMD 等模块类型;webpack4 支持零配置使⽤用,但是很弱,稍微复杂些的场景都需要额外扩展

### 默认配置

```
const path = require("path");
 module.exports = {
    // 必填 webpack执⾏行行构建⼊入⼝口
    entry: "./src/index.js",
    output: {
        //  将所有依赖的模块合并输出到main.js
        filename: "main.js",
        //  输出⽂文件的存放路路径，必须是绝对路路径
        path: path.resolve(__dirname, "./dist")
    } };

```

#### 配置

1. context 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader;
   `context: path.resolve(__dirname, "app")`

2. entry 指定 webpack 打包⼊口文件:Webpack 执行构建的第一步将从 Entry 开始;

```
    //单入口 SPA，本质是个字符串
    entry:{  main: './src/index.js' }
    ==相当于简写===
    entry:"./src/index.js"
    //如果传递一个数组,数组的每一项都会执行,但只会输出一个chunk
    entry:["./index.js","./login.js"]
    //多入口
    entry是个对象
    entry:{
        index:"./src/index.js",
        login:"./src/login.js"
    }

```

3. output 指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」

```
output: {
    filename: "bundle.js",//输出文件的名称
    path: path.resolve(__dirname, "dist")//输出文件到 磁盘的目录，必须是绝对路径
},
//多入口的处理
output: {
    filename: "[name][chunkhash:8].js",//利用占位符， 文件名称不要重复
    path: path.resolve(__dirname, "dist")//输出文件到 磁盘的目录，必须是绝对路径
},
```

4. mode Mode ⽤用来指定当前的构建环境

- 开发阶段的开启会有利利于热更新的处理，识别哪个模块变化
- 生产阶段的开启会有帮助模块压缩，处理副作用等一些功能
- production 开发环境
- development 生产环境
- none 退出任何默认优化选项

5. module 决定如何处理项目中的不同类型的模块。

#### Webpack 会从配置的 Entry 开始递归找出所有依赖的模块,当 webpack 处理到不认识的模块时，需要在 webpack 中的 module 处进行配置，当检测到是什么格式的模块，使用什么 loader 来处理。

```
module:{
    rules:[{
        test:/\.xxx$/,//指定匹配规则
        use:{
            loader: 'xxx-load'//指定使用的loader
        }
    }]
}
```

- loader webpack 默认只知道如何处理 js 和 JSON 模块，那么其他格式的 模块处理，和处理方式就需要 loader 了

  #### loader 有顺序，从右到左，从下到上;一个 loader 只处理一件事情

  - file-loader 处理静态资源模块

    - 使用场景
      ### 只需要模块从源代码挪移到打包目录， 就可以使用 ﬁle-loader 来处理，txt，svg，csv，excel，图片资源等等
    - 案例

      ```
          module: {
              rules: [{
                  test: /\.(png|jpe?g|gif)$/,
                  //use使用一个loader可以用对象，字符串，两个loader 需要用数组
                  use: {
                      loader: "file-loader",
                          //   options额外的配置，比如资源名称
                      options: {
                          //   placeholder 占位符  [name]老资源模块的名称
                          //   [ext]老资源模块的后缀
                          // https://webpack.js.org/loaders/fileloader#placeholders
                          name: "[name]_[hash].[ext]",
                          //   打包后的存放位置
                          outputPath: "images/"
                      }
                  }
              }]
          }
      ```

  - url-loader ﬁle-loader 加强版本
    - 多一个 limit 字段
      - 可以将符合要求的图片转为 base64 打包到 js 里面;
      - 参数为 X\*1024;1024 为 1kb
  - css-loader 分析 css 模块之间的关系，并合成一个 css
  - style-loader 会把 css-loader 生成的内容，以 style 挂载到页面的 heade 部分
  - less-loader 把 less 语法转换成 css
    ```
      {
          test: /\.scss$/,
          use: [
              "style-loader",
              "css-loader",
              "less-loader"
          ]
      }
    ```
  - Postcss-loader 样式⾃自动添加前缀
    - 新建 postcss.config.js
    ```
    // webpack.config.js
      {
          test: /\.css$/,
          use: [
              "style-loader",
              "css-loader",
              "postcssloader"
          ]
      },
    // postcss.config.js
      module.exports = {
          plugins: [
              require("autoprefixer")({
                  overrideBrowserslist: ["last 2 versions", ">1%"]
              })
          ]
      };
    ```

6. Plugins

   ### 扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情

   - HtmlWebpackPlugin

     #### htmlwebpackplugin 会在打包结束后，⾃自动⽣生成⼀一个 html ⽂文件，并 把打包⽣生成的 js 模块引⼊入到该 html 中。

     ```
     // 配置
         title: 用来生成⻚页⾯面的 title 元素
         filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
         template: 模板文件路路径，支持加载器，比如 html!./index.html
         inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
         favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
         minify: {} | false , 传递 html-minifier 选项给 minify 输出 hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
         cache: true | false，如果为 true, 这是默认值，仅在文件 修改之后才会发布文件。
         showErrors: true | false, 如果为 true, 这是默认值，错误 信息会写入到 HTML 页面中
         chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
         chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
         excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块)
     ```

   - clean-webpack-plugin
     #### 每次构建会清空输出目录里的冗余文件
     ```
         const { CleanWebpackPlugin } = require("cleanwebpack-plugin");
         ...
         plugins: [
             new CleanWebpackPlugin()
         ]
     ```
