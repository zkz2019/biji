# vue-router 深入理解

### vue-router 就是利用监听路由哈希值,然后实现 router-link 和 router-view 两个组件,从而进行页面切换

- 实现 router-link

  - 利用 render 函数创建一个 a 标签
  - 接参数 to 参数,并通过 attrs 传入 a 标签的 href 属性
  - 利用插槽 this.\$slots.default 传入 a 标签的内容

- 实现 router-view

  - 也是利用 render 函数创建一个需跳转的页面
  - 从 this.\$router 中取出路由表和当前路由哈希中的路由
  - 匹配出路由表中的组件
  - return 出匹配的组件

- 实现路由插件 vue-router

  - 声明一个 Vue 不赋值,在 install 方法中赋值可以节省空间,避免打包多余的依赖
  - 创建 vueRouter 类
  - 接收路由表 routes
  - 利用 vue.util.defineReactive 创建动态的当前被选中路由

    `vue.util.defienReactive(this,'current','')`

  - 监听 hashchange 和 load 事件,监听函数需要 bind 当前 this
  - 实现监听函数 onHashChange 获取当前路由 hash 并给 this.current 赋值

    `this.current=window.location.hash.slice(1)`

    - 将接收到的路由表映射到当前 this 下(方便在 router-view 中直接通过解构赋值获取,也可以在 router-view 中通过 this.$router.$options.routes 获取)

    - 实现 vueRouter 的 install 方法

      - 通过 install 自带的 Vue 给全局 Vue 赋值;
      - 通过全局的 Vue.mixin()混入 beforeCreate();
      - 在 beforeCreate 生命周期函数中判断当前组件的 this.$options是否有$router(因为在创建 Vue 顶级 App 组件的时候会将 router 实例传入并挂载在$options上,所以其他组件并不会拥有\$router 属性),然后将当前组件中的 router 利用 prototype 赋值给 Vue

        `Vue.prototype.$router=this.$options.router`
