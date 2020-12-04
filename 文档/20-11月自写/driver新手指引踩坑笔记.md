- nuxt 配置

  1. 可以直接在 plugins 里通过 `Vue.prototype` 全局挂载

     ```
         import Vue from 'vue';
         import Driver from 'driver.js';
         import 'driver.js/dist/driver.min.css';
         export default ({store}, inject) => {
           const driver = new Driver({
             // 全局配置
               ...
           });
           Vue.prototype.$guide = driver;
         };

     ```

  2. 在 nuxt.config.js 中配置

     ```
       plugins: [
       '@/plugins/guide',
       ]
     ```

  3. 在 mixin 中配置

  - 因为路由跳转的时候所配置的 dom 还拿不到,所以`driver`需要在路由跳转完成后才开始运行;
  - 步骤列表先一次性全部配置好,每次跳转后要重新传入(应该还有办法优化)
    - 步骤列表中的参数会覆盖全局的参数,步骤列表中配置的参数会导致全局参数失效,包括回调
    - 文本参数可以传递 html
    - 可以通过`className`修改弹框的样式
    - 路由跳转时的下一步也会触发结束的回调,会导致无法分辨当前操作是在进行路由跳转还是结束指引
      - 可以在 vuex 中增加一个参数`isNext`,因为如果点击的是下一步就会触发下一步的回调,这时候设置`isNext`为`true`;然后在`onReset`钩子中判断当前的`isNext`如果为`true`则表示当前操作为下一步操作,同时将`isNext`的值设置为 false;如果`isNext`的参数为`false`则执行结束操作
    - 路由跳转时还会有遮罩透明度为 0 的情况
      - 可以在顶级页面中自己添加一个遮罩然后用`vuex`储存状态(如果要跳转路由遮罩最好手动设置，不然在路由跳转的瞬间会闪白)
        - 该状态在点击进入指引时为`true`,退出指引是为`false`
    - 路由的跳转可以根据用`vuex`储存的步数判断,到了指定的步数就在`onNext`或者`onPrevious`回调中进行跳转(回调参数不会返回当前步数，需要手动设置)
    - 每次上一步和下一步操作都要改变`vuex`中储存的步数
    - 每次结束都要将`vuex`的数据重置
    - 只要有路由跳转就必须要在`mounted`中调用
