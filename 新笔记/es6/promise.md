# Promise

### Promise 是一种异步编程的解决方案

### 简单说 Promise 就是一个容器,里面保存着未来才会结束的事件的结果;从语法上说,它是一个对象,从它可以获取异步操作的消息

### Promise 有两个特点

- 对象状态不受外界影响

  1. pending-进行中
  2. fulfilled-已成功
  3. rejected-已失败

- 一旦状态改变就不会再变,任何时候都可以得到这个结果
  1. pending -> fulfilled
  2. pending -> rejected

---

## 用法

#### Promise 对象是一个构造函数,用来生成 Promise 实例

    ```
        const promise = new Promise((resolve,reject)=>{
            if(sucess){
                resolve(value)
            }else{
                reject(err)
            }
        })
    ```

#### Promise 构造函数接受一个函数作为参数,该函数分别有`resolve`和`reject`两个参数,他们由 JS 引擎提供;

- `resolve` 函数的作用是将 `Promise` 的状态由`进行中(pending)`变为`已完成(fulfilled)`
- `reject` 函数的作用是将 `Promise` 的状态由`进行中(pending)`变为`已失败(rejected)`

##### resolve 和 reject 函数如果调用时带有参数,那么参数将会传递给回调函数;

- `resolve` 函数的参数除了是正常值外还可以是另一个 Promise 实例
  - 如果 `resolve` 返回的仍然是一个 Promise 实例,那么外部实例的状态取决于内部实例的状态
- reject 函数的参数通常是一个 Error 对象的实例

##### 调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行

- 一般调用了 `resolve` 或 `reject` 以后,Promise 的使命就完成了,后续额逻辑应该放到`then`方法里面,所以最好在它们前面加上`return`

#### Promise 新建后会立即执行

---

## then 方法

#### then 方法是定义在 Prmoise 原型对象`Promise.prototype`上的

- then 方法的第一个参数是 `fulfilled` 状态的回调函数,第二个参数是 `rejected` 状态的回调函数,它们都是可选的
- then 方法返回的是一个新的 Promise 实例,所以可以采用链式写法

---

## catch 方法 是.then(null,rejection) 或 .then(undefined,rejection)的别名,它也定义在原型对象 Promise.prototype 上

- 如果 Promise 对象的状态变为 `rejected` 或者运行抛出错误都会被`catch()`方法捕获
  - 但是如果状态已经变成 `fulfilled` 再抛出错误则不会被捕获到
- Promise 对象的错误会一直向后传递,直到被捕获为止
- 一般不要将`rejected`状态的回调放在`then`方法里面,而应该使用`catch`方法
- 如果没有指定`catch`方法,Promise 抛出的错误将不会有任何反应
- 如果 Promise 对象内部有语法错误,浏览器会打印错误,但是不会终止脚本执行;即 Promise 会吃掉错误
  - Node.js 的 `unhandleRejection` 事件可以监听未捕捉的 `reject` 错误
- `catch` 还能再抛出另一个错误能被下一个 `catch` 方法捕捉到,同时 `then` 方法中的错误也能被下一个 `catch` 方法捕捉到

---

## finally 方法用于指定不管 Promise 对象最后状态如何都会执行的操作

- 在执行完 `then` 或 `catch` 指定的回调函数以后都会执行 `finally` 方法指定的回调函数

---

## Promise.all 方法用于将多个 Promise 实例包装成一个新的实例

### 它接收一个数组(或具有 Iterator 接口的对象)作为参数,如果数组内的元素不是 Promise 实例就会调用 Promise.resolve 方法,将参数转为 Promise 实例;

- 如果数组内所有实例都变成了`fulfilled`状态就会将返回值组成一个数组往上传递
- 如果数组内有一个实例变成了`rejected`状态就会将第一个`reject`是的的返回值往上传递
  - 如果作为参数的实例自己定义了 `catch` 方法那么它将不会触发 `Promise.all` 的 `catch` 方法

---

## Promise.race 方法用于将多个 Promise 实例包装成一个新的实例

### 它的参数与 Promise.all 一样

- 如果数组内有一个实例的状态改变了,新实例的状态就跟着一起改变

---

## Promise.allSettled 方法接受一组 Promise 实例作为参数;只有等这些实例都返回结果,不管是什么状态,包装实例才会结束

### 它的使用和 all 方法基本相同,只是抛出错误是不会结束,而是等所有实例结束了才会结束包装实例,并将返回值组成数组往上传递

---

## Promise.any

### 它和 Promise.race 很像,只是结束方式不同

- 如果数组内有一个实例状态变为`fulfilled`,就会结束包装实例
- 如果所有参数实例都变为 `rejected` 就会抛出错误

## Promise.resolve

- 如果参数是 Promise 实例,将直接返回该实例
- 如果参数是一个具有 `then` 方法的对象,会将这个对象转为 Promise 对象,然后立即执行该对象的 `then` 方法
- 如果参数不是具有`then`方法的对象,将返回一个新的 Promise 对象,状态为 `fulfilled`,`resolve` 的参数进行返回
- 如果不带参数将直接返回一个 `fulfilled` 状态的 Promise 对象

---

## Promise.reject

### 该方法会返回一个新的 Promise 实例,状态为 rejected,并将 reject 的参数直接返回

---

## Promise.try

### 在不知方法是异步还是同步时,想用 Promise 来处理,可以使用 Promise.try

### 它是模仿的 try 代码块

### 现在还是一个提案,还不能使用 --- 2021.3
