### watch

- `watch`

  - 函数写法
    - 无法监听到对象属性的改变
    ```
        watch:{
            a(newval,oldval){
                ...
            }
        }
    ```
  - 对象写法

    - 对象写法可以选择选项,同时单独可以监听对象的属性
    - 选项
      - deep
        - 可以发现对象内部值的变化
      - immediate
        - 将立即以表达式的当前值触发回调
        - 注意在带有 `immediate` 选项时，你不能在第一次回调时取消侦听给定的 `property`。

    ```
        watch:{
            obj:{
                handler(new,old){
                    ...
                },
                deep:true //当对象内部的属性改变时会触发回调
            },
            "obj.a":{
                handler(new,old){
                    ...
                },
                immediate:true  //我的理解是当侦听器创建好马上就执行一次回调,并且第一次回调无法取消当前的侦听属性(用$watch时会有)
            }
        }
    ```

- `$watch`
  - 基本和 watch 一样
  - 有一个返回值`unwatch`
    ```
        let unwatch = vm.$watch(
          'value',
          function () {
            if (unwatch) {  //内部调用时需要判断是否可用
              unwatch()
            }
          },
          { immediate: true }
        )
    ```
    - 调用 `unwatch()`就会取消当前侦听
