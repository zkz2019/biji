[传送门](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B-property)

- vm.\$data

  - Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问。

- vm.\$props

  - 当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问。

- vm.\$el

  - Vue 实例使用的根 DOM 元素。

- vm.\$options

  - 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：
    ```
        new Vue({
          customOption: 'foo',
          created: function () {
            console.log(this.$options.customOption) // => 'foo'
          }
        })
    ```

- vm.\$parent

  - 父实例，如果当前实例有的话。

- vm.\$root

  - 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

- vm.\$children

  - 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。

- [vm.\$slots](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B-property)

  - 用来访问被插槽分发的内容。每个具名插槽有其相应的 `property` (例如：`v-slot:foo` 中的内容将会在 `vm.$slots.foo` 中被找到)。`default property` 包括了所有没有被包含在具名插槽中的节点，或 `v-slot:default` 的内容。
  - 注意：v-slot:foo 在 2.6 以上的版本才支持。对于之前的版本，你可以使用废弃了的语法。
  - 在使用渲染函数书写一个组件时，访问 `vm.$slots` 最有帮助。

- vm.scopeSlots

  - 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。
  - `vm.$scopedSlots` 在使用渲染函数开发一个组件时特别有用。
  - 注意：从 2.6.0 开始，这个 property 有两个变化：
  - 作用域插槽函数现在保证返回一个 VNode 数组，除非在返回值无效的情况下返回 undefined。
  - 所有的 `$slots` 现在都会作为函数暴露在 `$scopedSlots` 中。如果你在使用渲染函数，不论当前插槽是否带有作用域，我们都推荐始终通过 `$scopedSlots` 访问它们。这不仅仅使得在未来添加作用域变得简单，也可以让你最终轻松迁移到所有插槽都是函数的 Vue 3。

- vm.\$refs

  - 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

- vm.\$isServer

  - 当前 Vue 实例是否运行于服务器。

- vm.\$attrs

  - 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="\$attrs" 传入内部组件——在创建高级别的组件时非常有用。

- vm.\$listeners

  - 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="\$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
