## 插槽

- 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
- 后备内容
  - 在`slot`标签里加上的内容
  - 它只会在父级没有提供插槽内容的时候被渲染
- 具名插槽
  - `slot`标签里有一个 `name`属性,可以用来命名
  - 未命名的`slot`默认为`default`
  - 向具名插槽提供内容的时候可以在一个`<template>`元素上使用` v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：
    ```
    v-slot:header
    ```
- `v-slot`可以用`#`简写

- `v-slot` 只能添加在 `<template>` 上,除非提供的内容只有默认插槽;

- 作用域插槽

  - 在子组件使用`v-bind`绑定值`v-bind:user="user"`可以在父组件使用`v-slot`使用`v-slot:default="slotProps"`

    ```
    //current-user组件
        <span>
            <slot v-bind:user="user">
              {{ user.lastName }}
            </slot>
        </span>

    //父组件
        <current-user>
          <template v-slot:default="slotProps">
            {{ slotProps.user.firstName }}
          </template>
        </current-user>
    ```

- 不带参数的`v-slot`被假定对应默认插槽

  ```
      <current-user v-slot="slotProps">
        {{ slotProps.user.firstName }}
      </current-user>
  ```

- 作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里

  ```
      function (slotProps) {
          // 插槽内容
      }
  ```

- 动态指令参数也可以用在 v-slot 上

  ```
      <base-layout>
        <template v-slot:[dynamicSlotName]>
          ...
        </template>
      </base-layout>
  ```

- [vm.\$slots](https://cn.vuejs.org/v2/api/#vm-slots)

  - 用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.\$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
  - 请注意插槽不是响应性的。如果你需要一个组件可以在被传入的数据发生变化时重渲染，我们建议改变策略，依赖诸如 props 或 data 等响应性实例选项。

- `vm.$scopedSlots`
  - 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。
  - 这个属性会将父级所有的插槽内容逐级往下传递(包括 default)
