## iconfont 随笔

### 今天在项目中遇到一个需要使用多色图标的需求,之前多色一般都是用的图片,没用过多色 iconfont,很自然的踩坑了;我们项目的引用方式是 font-class,他并不支持多色图标,不过也在意料之中,之所以去试一下就是抱着侥幸心理(最后将该图标改为 Symbol 引用解决).

### 字体图标支持改变字体颜色,但通常只支持单色,也可以利用 css3 设置渐变色;

### 总结一下 iconfont 的三种引用方式:

1. Unicode (Unicode 是字体在网页端最原始的应用方式):
   - 兼容性最好，支持 IE6+，及所有现代浏览器。
   - 支持按字体的方式去动态调整图标大小，颜色等等。
   - 但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。
   - 使用步骤:
     - 拷贝项目下面生成的 @font-face
       ```
           @font-face {
           font-family: 'iconfont';
           src: url('iconfont.eot');
           src: url('iconfont.eot?#iefix') format('embedded-opentype'),
           url('iconfont.woff2') format('woff2'),
           url('iconfont.woff') format('woff'),
           url('iconfont.ttf') format('truetype'),
           url('iconfont.svg#iconfont') format('svg');
           }
       ```
     - 定义使用 iconfont 的样式
       ```
           .iconfont {
           font-family: "iconfont" !important;
           font-size: 16px;
           font-style: normal;
           -webkit-font-smoothing: antialiased;
           -moz-osx-font-smoothing: grayscale;
           }
       ```
     - 挑选相应图标并获取字体编码，应用于页面
       ```
          <span class="iconfont">&#x33;</span>
       ```
       > "iconfont" 是你项目下的 font-family。可以通过编辑项目查看，默认是 "iconfont"。

---

2.  Font class (font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题):

    - 兼容性良好，支持 IE8+，及所有现代浏览器。
    - 相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。
    - 因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。
    - 不过因为本质上还是使用的字体，所以多色图标还是不支持的。
    - 使用步骤:
      - 引入项目下面生成的 fontclass 代码：
        ```
            <link rel="stylesheet" href="./iconfont.css">
        ```
      - 挑选相应图标并获取类名，应用于页面：
        ```
           <span class="iconfont icon-xxx"></span>
        ```
    - **我现在的项目就是用的 Font class 引用方式;大部分的图标类名通过后端传过来的,因为一般有图标的地方是按钮,按钮需要后端进行权限控制;我们只需要将 ttf 和 woff 放到项目内,然后将 css 文件进行改写,改写用到了两个 css3 的选择器`[class*="xxx"]`和
      `[class^="xxx"]`,他们会选择包含 xxx 或以 xxx 开头的所有类,然后将该类的字体设置为我们自定义的字体;[查看 css 选择器](https://www.runoob.com/cssref/css-selectors.html)**

           ```
               @font-face {
               font-family: xxx;
               src: url(fonts/iconfont.woff) format("woff"), url(fonts/iconfont.       ttf) format("truetype");
               font-weight: 400;
               font-style: normal;
               }

               [class*=" ficon-"],
               [class^=ficon-] {
                   font-family: "xxx" !important;
                   font-style: normal;
                   -webkit-font-smoothing: antialiased;
                   -moz-osx-font-smoothing: grayscale;
                   /*抗锯齿,可以使字体看起来更清晰*/
               }
           ```

---

3. Symbol (这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个 SVG 的集合):
   - 支持多色图标了，不再受单色限制。
   - 通过一些技巧，支持像字体那样，通过 font-size, color 来调整样式。
   - 兼容性较差，支持 IE9+，及现代浏览器。
   - 浏览器渲染 SVG 的性能一般，还不如 png。
   - 引用步骤:
     - 引入项目下面生成的 symbol 代码
       ```
           <script src="./iconfont.js"></script>
       ```
     - 加入通用 CSS 代码（引入一次就行)
       ```
       <style>
       .icon {
         width: 1em;
         height: 1em;
         vertical-align: -0.15em;
         fill: currentColor;
         overflow: hidden;
       }
       </style>
       ```
     - 挑选相应图标并获取类名，应用于页面
       ```
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xxx"></use>
            </svg>
       ```
   - **Symbol 引用方式需要引用 icon-font 的 js 文件;并且标签需要使用 [svg](https://www.runoob.com/svg/svg-intro.html)**
