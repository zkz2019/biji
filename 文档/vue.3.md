### 计算属性

##### 什么是计算属性
模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。 <b> 所以，对于任何复杂逻辑，你都应当使用计算属性。 </b>
```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```
这里我们声明了一个计算属性 reversedMessage。我们提供的函数将用作属性 vm.reversedMessage 的 getter 函数。
#### 计算属性缓存 vs 方法
我们可以通过在表达式中调用方法来达到同样的效果,两种方式的最终结果确实是完全相同的。然而，<b>不同的是计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。</b>这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。<b> 只要视图层的数据发生变化，方法就会被调用 </b>

##### 侦听属性
Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。

### 计算属性的 setter
计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter 。
```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

### 侦听器
虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。<b>当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。</b>
```html
<div id="watch-example">
        <img src="img/1.jpg" alt="">
        <p :class="">
            你可以问我一个简单的对错问题:<br>
            <input v-model="question">
        </p>
        <p>{{ answer }}</p>
        <div v-html="img">
        </div>
    </div>
```
```js
 <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
    <script>
        var watchExampleVM = new Vue({
          el: '#watch-example',
          data: {
            question: '',
            answer: '你还没给我一个问题呢！讨厌！',
            img:""
          },
          watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            question: function (newQuestion, oldQuestion) {
              this.answer = '快写！快写！'
              this.debouncedGetAnswer()
            }
          },
          created: function () {
            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
            // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
            // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
            // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
            // 请参考：https://lodash.com/docs#debounce
            this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
          },
          methods: {
            getAnswer: function () {
              if (this.question.indexOf('?') === -1 && this.question.indexOf('？') === -1) {
                this.answer = '问题的结束不是应该有个?号吗，你个大坏蛋 ;-)'
                return
              }
              this.answer = '让我想想...'
              var vm = this
              axios.get('https://yesno.wtf/api')
                .then(function (response) {
                  vm.answer = _.capitalize(response.data.answer);
                  vm.img = "<img src='" + _.capitalize(response.data.image) + "'/>";
                })
                .catch(function (error) {
                  vm.answer = 'Error! Could not reach the API. ' + error
                })
            }
          }
        })
        </script>
```
在这个示例中，使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

除了 watch 选项之外，您还可以使用命令式的 vm.$watch API。

### 生命周期钩子
> 所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着你不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())。这是因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同，this.fetchTodos 的行为未定义。

```js
 Vue.component("Test", {
        data() {
            return {
                msg: 'hello world'
            }
        },
        template: `
           <div>
              <p>{{ msg }}</p>
            </div>
        `,
        // 生命周期钩子
        // 组件创建之前
        beforeCreate() {
            console.log(this.msg) //undefind
        },
        // 组件创建完成
        created() {
            // 使用该组件，就会调用created方法
            // 在created这个方法中可以操作后端的数据（数据驱动视图）
            // 应用：发起ajax请求
            console.log(this.msg) //hello world
        },
        // 挂载数据到Dom之前
        beforeMount: function () {
            console.log(document.getElementById("app"))
        },
        // 挂载数据到Dom完成
        mounted: function () {
            // 应用：操作Dom
            console.log(document.getElementById("app"))
        },
        // 更新（Dom）数据之前
        beforeUpdate() {
            // 应用：获取原始Dom
            console.log(this)
        },
        // 更新（Dom）数据之后
        updated() {
        // 应用：获取最新Dom
        },
        beforeDestroy(){

        },
        destroyed(){
            
        }
    })
```

___
 >
 > > 作者 ：周子瑜
 > > 日期 ：2019/3/19
 > 



