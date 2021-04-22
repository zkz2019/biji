# JS 错误类型

## 开发中难免会碰到各种报错,理解 js 的错误类型能够帮助更快的进行错误/异常定位,提升开发效率

### JS 的报错信息主要分为两大类,语法错误和异常;语法错误会在解析/编译时遇到,它会导致整个 JS 无法执行;异常会在出现错误的那一行终止运行 JS 代码,那一行之前的代码会正常运行;

- SyntaxError -- 语法错误

  - js 编译时碰到无法解析的代码

  ```
    const str = "你好 // Uncaught SyntaxError: Invalid or unexpected token
  ```

- ReferenceError -- 引用错误

  - 引用一个不存在的变量时发生的错误。将一个值分配给无法分配的对象，比如对函数的运行结果或者函数赋值

  ```
    const obj = {}
    console.log("arr") // Uncaught ReferenceError: arr is not defined
  ```

- RangeError -- 范围错误

  - 当一个值超出有效范围时发生的错误。主要有数组长度为负数或特别大，Number 对象的方法参数超出范围，函数堆栈超过最大值。

  ```
      const arr = []
      arr.length = -1 // Uncaught RangeError: Invalid array length
      -----------------
      function fun(){
          fun()
      }
      fun() // Uncaught RangeError: Maximum call stack size exceeded
  ```

- TypeError -- 类型错误

  - 变量或参数不是预期类型时发生的错误。比如使用 new 字符串、布尔值等原始类型和调用对象不存在的方法就会抛出这种错误，因为 new 命令的参数应该是一个构造函数。

  ```
      obj.push("a")  // Uncaught TypeError: obj.push is not a function
  ```

- URIError -- URL 错误

  - 主要是相关函数的参数不正确。

  ```
   decodeURI("%") // Uncaught URIError: URI malformed at decodeURI
  ```

  - URI 相关参数不正确时抛出的错误，主要涉及 encodeURI、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和 unescape(）六个函数。

- EvalError -- eval()函数执行错误

  - 在 ES5 以下的 JavaScript 中，当 eval()函数没有被正确执行时，会抛出 evalError 错误。

  ```
   var myEval = eval;
   myEval("alert('call eval')");
  ```

  - 需要注意的是：ES5 以上的 JavaScript 中已经不再抛出该错误，但依然可以通过 new 关键字来自定义该类型的错误提示。
