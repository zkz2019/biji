## Reflect 是 ES6 新增的操作对象的新 API

#### Object 对象的一些明显属于语言内部的方法放到了 Reflect 对象上,未来的新方法也将只部署到 Reflect 对象上,也就是说从它身上可以拿到语言内部的方法

#### 修改了某些方法的返回;比如`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误;而`Reflect.defineProperty(obj, name, desc)`则会返回 `false`。

#### 让 Object 操作都变成函数行为

```
'assign' in Object
        ↓
Reflect.has(Object,'assign')
```

#### 与 Proxy 对象的方法对应,只要是 Proxy 对象的方法就能在 Reflect 上找到

## 静态方法

- get(target,name,receiver)

  #### 他查找并返回 target 对象的 name 属性,如果没有就返回 undefined

  #### 如果 name 属性部署了 getter,这读取函数的 this 会绑定 receiver

  #### 如果第一个参数不是对象则会报错

  ```
    var myObject = {
        foo: 1,
        bar: 2,
        get baz() {
          return this.foo + this.bar;
        },
    };

    var myReceiverObject = {
      foo: 4,
      bar: 4,
    };

    Reflect.get(myObject, 'baz', myReceiverObject) // 8
  ```

- set(target,name,value,receiver)
  #### 设置 target 对象的 name 属性等于 value
  #### 如果 name 属性部署了 setter,则赋值函数的 this 绑定 receiver
  #### 如果 Proxy 和 Reflect 对象联合使用,前者拦截赋值操作,后者完成赋值的默认行为,如果传入了 receiver,nameReflect.set 就会触发 Proxy.defineProperty 拦截
