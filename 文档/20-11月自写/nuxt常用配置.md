# nuxt 常用配置

## 一些常用的稍微记录一下,详细的可以点击内容里面的标题链接查看

### 目录

- [transition](#transition)
- [srcDir](#srcdir)
- [server](#server)
- [router](#router)
- [rootDir](#rootdir)
- [plugins](#plugins)
- [modulesDir](#modulesdir)
- [modules](#modules)
- [loading](#loading)
- [head](#head)
- [env](#env)
  - [环境变量配置](#hjblpz)
  - [自动注入环境变量](#zdzrhjbl)
- [dev](#dev)
- [css](#css)
- [build](#build)

  - [analyze](#analyze)
  - [babel](#babel)
  - [cssSourceMap](#csssourcemap)
  - [extractCSS](#extractcss)
  - [filenames](#filenames)
  - [loaders](#loaders)
  - [ssr](#ssr)
  - [styleResources](#styleresources)
  - [transpile](#transpile)

### 内容

- <a id="transition">[transition](https://www.nuxtjs.cn/api/configuration-transition)</a>

  - 类型: String 或 Object
  - 用于设置页面切换过渡效果的默认属性值。
  - 默认值：

  ```
    {
      name: 'page',
      mode: 'out-in'
    }
  ```

- <a id="dir">[dir](https://www.nuxtjs.cn/api/configuration-dir)</a>
  - 类型: Object
  - 默认:
  ```
      {
        assets: 'assets',
        layouts: 'layouts',
        middleware: 'middleware',
        pages: 'pages',
        static: 'static',
        store: 'store'
      }
  ```
  - 定义 Nuxt.js 应用程序的自定义目录
- <a id="srcdir">[srcDir](https://www.nuxtjs.cn/api/configuration-srcdir)</a>
  - 类型： `String`
  - `默认值：rootDir` 的值
  - 设置` Nuxt.js` 应用的源码目录
- <a id="server">[server](https://www.nuxtjs.cn/api/configuration-server)</a>
  - 类型: `Object`
  - `Nuxt.js` 允许您为应用程序内部`nuxt.config.js`中定义服务器访问主机和端口.
- <a id="router">[router](https://www.nuxtjs.cn/api/configuration-router)</a>
  - router 属性让你可以个性化配置 Nuxt.js 应用的路由（vue-router）。
- <a id="rootdir">[rootDir](https://www.nuxtjs.cn/api/configuration-rootdir)</a>

  - 类型： String
  - 默认值： process.cwd()
  - 设置 Nuxt.js 应用的根目录。
  - 该配置项的值会被 nuxt 命令行 指定的路径参数覆盖（例如：nuxt my-app/ 会将 rootDir 的值覆盖设置为 my-app/ 目录对应的绝对路径）。
  - 该配置项一般是 编码中使用 Nuxt.js 时才会被用到。

- <a id="plugins">[plugins](https://www.nuxtjs.cn/guide/plugins#%E4%BD%BF%E7%94%A8-vue-%E6%8F%92%E4%BB%B6)</a>

  - 类型： `Array`
    - 数组元素类型： `String` 或 `Object`
  - 如果数组元素类型是 `Object，` 其具有以下属性：

  - `src: String` (文件的路径)
  - `ssr: Boolean` (默认为 `true`) 如果值为 `false`，该文件只会在客户端被打包引入。
  - `plugins` 属性使得你可以轻易地为 `Nuxt.js` 配置使用 `Vue.js` 插件。

  - 例如 (`nuxt.config.js`)：

    ```
        module.exports = {
        plugins: ['~plugins/vue-notifications']
        }
    ```

  - 然后, 我们需要创建 `plugins/vue-notifications.js` 文件：
    ```
        import Vue from 'vue'
        import VueNotifications from 'vue-notifications'
        Vue.use(VueNotifications)
    ```
  - `plugins` 属性配置的所有插件会在 `Nuxt.js` 应用初始化之前被加载导入。
  - 每次你需要使用 `Vue.use()` 时，你需要在 `plugins/` 目录下创建相应的插件文件，并在 `nuxt.config.js` 中的 `plugins` 配置项中配置插件的路径。

- <a id="modulesdir">[modulesDir]()</a>

  - 类型: Array
  - 默认: ['node_modules']
  - 用于设置路径解析的模块目录，例如：`webpack resolveLoading，nodeExternal` 和 `postcss`。配置路径为相对路径 `options.rootDir` (默认: process.cwd()).

- <a id="modules">[modules](https://www.nuxtjs.cn/api/configuration-modules)</a>

  - 类型: `Array`
  - `modules` 是 `Nuxt.js` 扩展，可以扩展它的核心功能并添加无限的集成。了解更多
  - 例如 (nuxt.config.js):

    ```
    export default {
    modules: [
    // Using package name
    '@nuxtjs/axios',

                // Relative to your project srcDir
                '~/modules/awesome.js',

                // Providing options
                ['@nuxtjs/google-analytics', { ua: 'X1234567' }],

                // Inline definition
                function () {}
              ]
            }
    ```

  - `Nuxt.js` 尝试使用节点需求路径（在 `node_modules` 中）解析 `modules` 数组中的每个项目，如果使用~别名，则将从项目 srcDir 中解析。模块按顺序执行，因此顺序很重要。

- <a id="loading">[loading](https://www.nuxtjs.cn/api/configuration-loading)</a>

  - 类型： `Boolean` 或 `Object` 或 `String`
  - 在页面切换的时候，`Nuxt.js` 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。
  - 在你的组件中你可以使用` this.$nuxt.$loading.start()`来启动加载条。使用 `this.$nuxt.$loading.finish()`来使加载条结束。
  - 禁用加载进度条
  - 个性化加载进度条
  - 自定义加载组件
  - 进度条时长说明

- <a id="head">[head](https://www.nuxtjs.cn/api/configuration-head)</a>

  - 借助 `head` 属性，`Nuxt.js` 让你可以在 `nuxt.config.js` 中配置应用的 `meta` 信息。

  - 类型： Object
    ```
        module.exports = {
          head: {
            titleTemplate: '%s - Nuxt.js',
            meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width,         initial-scale=1' },
              { hid: 'description', name: 'description', content:   'Meta     description' }
            ]
          }
        }
    ```

- <a id="env">[env](https://www.nuxtjs.cn/api/configuration-env)</a>

  - <a id="hjblpz">环境变量配置</a>
    - 类型： `Object`
    - Nuxt.js 让你可以配置在客户端和服务端共享的环境变量。
    - 可以通过以下两种方式来使用 `baseUrl` 变量：
      - 通过 `process.env.baseUrl`
      - 通过 `context.baseUrl`，请参考 `context api`
  - <a id="zdzrhjbl">自动注入环境变量</a>
    - 如果在构建阶段定义以 NUXT*ENV*开头的环境变量，例如：`NUXT_ENV_COOL_WORD=freezing nuxt build`，它们将自动注入环境变量中。请注意，它们可能优先于 nuxt.config.js 中具有相同名称的已定义变量。

- <a id="dev">[dev](https://www.nuxtjs.cn/api/configuration-dev)</a>
  - 类型： `Boolean`
  - 默认值： `true`
  - 配置 `Nuxt.js` 应用是开发模式还是生产模式。
  - `dev` 属性的值会被 nuxt 命令 覆盖：
  - 当使用 `nuxt` 命令时，`dev` 会被强制设置成 `true`
  - 当使用 `nuxt build`， `nuxt start` 或 `nuxt generate` 命令时，`dev`会被强制设置成 `false`
  - 所以，在编码中使用 `nuxt.js` 时才会用到该配置。
- <a id="css">[css](https://www.nuxtjs.cn/api/configuration-css)</a>

  - 在 Nuxtjs 里配置全局的 CSS 文件、模块、库。 (每个页面都会被引入)
  - 如果要使用 sass 就必须要安装 node-sass 和 sass-loader 。
    `npm install --save-dev node-sass sass-loader`
  - 在 `nuxt.conf.js` 中，添加要使用的 CSS 资源：
    ```
        Type: Array
        Items: string
        module.exports = {
          css: [
            // 直接加载一个 Node.js 模块。（在这里它是一个 Sass 文件）
            'bulma',
            // 项目里要用的 CSS 文件
            '@/assets/css/main.css',
            // 项目里要使用的 SCSS 文件
            '@/assets/css/main.scss'
          ]
        }
    ```
  - Nuxt.js 会自动识别被导入文件的扩展名，之后，webpack 会使用相应的预处理器进行处理。前提是，你安装了对应预处理器。

- <a id="build">[build](https://www.nuxtjs.cn/api/configuration-build)</a>

  - <a id="analyze">`analyze`</a>

    - Nuxt.js 使用 webpack-bundle-analyzer 分析并可视化构建后的打包文件，你可以基于分析结果来决定如何优化它。
    - 类型： `Boolean` 或 `Object`
    - 默认值： `false`

  - <a id="babel">`babel`</a>

    - 为 JS 和 Vue 文件设定自定义的 `babel` 配置。
    - 类型: `Object`
    - 默认:

    ```
       {
           babelrc: false,
           cacheDirectorundefined,
           presets: ['@nubabel-preset-app']
       }
    ```

  - <a id="csssourcemap">`cssSourceMap`</a>

    - 开启 `CSS Source Map` 支持
    - 类型: `boolean`
    - 默认: `true` 为开发模式(development)， `false` 为生产模式(production)。

  - <a id="extractcss">`extractCSS`</a>

    - 使用 Vue 服务器端渲染指南启用常见 CSS 提取。
    - 使用 `extract-css-chunks-webpack-plugin` 将主块中的 CSS 提取到一个单独的 CSS 文件中 （自动注入模板），该文件允许单独缓存文件。当有很多共用 CSS 时建议使用此方法，异步组件 中的 CSS 将保持内联为 JavaScript 字符串并由 `vue-style-loader` 处理。
    - 类型: `Boolean`
    - 默认: `false`

  - <a id="filenames">`filenames`</a>

    - 自定义打包文件名
    - 类型： `Object`
    - 默认:

      ```
          {
              app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
              chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
              css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
              img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
              font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
              video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
          }
      ```

  - <a id="loaders">`loaders`</a>

    - 类型： `Object`
    - 自定义 webpack 加载器
    - Default:
      ```
          {
              file: {},
              fontUrl: { limit: 1000 },
              imgUrl: { limit: 1000 },
              pugPlain: {},
              vue: {
                  transformAssetUrls: {
                  video: 'src',
                  source: 'src',
                  object: 'src',
                  embed: 'src'
                  }
              },
              css: {},
              cssModules: {
                localIdentName: '[local]_[hash:base64:5]'
              },
              less: {},
              sass: {
                indentedSyntax: true
              },
              scss: {},
              stylus: {},
              vueStyle: {}
          }
      ```

  - <a id="ssr">`ssr`</a>

    - 为服务器端渲染创建特殊的 webpack 包。
    - 类型: `Boolean`
    - 默认: `true` 为通用模式，`false` 为 spa 模式
    - 如果未提供，则根据默认模式自动设置此选项。

  - <a id="styleresources">`styleResources`</a>

    - 可以与 build 同级,也可以作为 build 子级
    - 类型: Object
    - 默认: {}
    - 当您需要在页面中注入一些变量和 mixin 而不必每次都 时，这非常有用。
    - 您需要为 css 预处理器指定要包含的 模式 / 路径 ： le sass, scss 或 stylus
    - 不能在此处使用路径别名(~ 和 @)
    - 使用:

      - 安装 style-resources：
        `yarn add @nuxtjs/style-resources`
      - 根据需要安装：

        ```
            SASS: $ yarn add sass-loader node-sass
            LESS: $ yarn add less-loader less
            Stylus: $ yarn add stylus-loader stylus
        ```

      - 修改 nuxt.config.js:

        ```
          export default {
            modules: ['@nuxtjs/style-resources'],
            styleResources: {
              scss: './assets/variables.scss',
              less: './assets/**/*.less'
              // sass: ...
            }
          }
        ```

  - <a id="transpile">`transpile`</a>
    - 类型: Array<string | RegExp>
    - 默认: []
    - 如果要使用 Babel 与特定的依赖关系进行转换，你可以在 build.transpile 中添加它们，transpile 中的选项可以是字符串或正则表达式对象，用于匹配依赖项文件名。
