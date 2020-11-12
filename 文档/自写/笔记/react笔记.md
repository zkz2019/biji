# react 学习笔记

## JSX

### JSX 是一个 JavaScript 的语法扩展,它可以很好地描述 UI 应该呈现出它应有交互的本质形式,并具有 JavaScript 的全部功能

### 优势

- JSX 执行更快，因为它在编译为 JavaScript 代码后 进行了优化。
- 它是类型安全的，在编译过程中就能发现错误。
- 使用 JSX 编写模板更加简单快速。

### 细节

- JSX 语法中,可以在大括号内放置任何有效的 JavaScript 表达式;
- JSX 也是一个表达式 ;
- 可以通过使用引号，来将属性值指定为字符串字面量;也可以使用大括号，来在属性值中插入一个 JavaScript 表达式;
- React DOM 在渲染所有输入内容之前，默认会进行转义,所以 JSX 可以防止注入攻击 ;
- Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

## 元素渲染

### 元素描述了你在屏幕上想看到的内容;与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

### 细节

- React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性;更新 UI 唯一的方式是创建一个全新的元素;
- React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

## 组件

### 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

### 渲染组件

- 定义组件最简单的方式就是编写 JavaScript 函数：

  ```
  // 函数组件
  function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
  }
  ```

- 还可以使用 ES6 的 class 来定义组件:
  ```
  // class组件
  class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
  }
  ```

### 组合组件

#### 组件可以在其输出中引用其他组件

### 提取组件

#### 将组件拆分为更小的组件。

- 如果 UI 中有一部分被多次使用,或者组件本身就足够复杂，那么它就是一个可复用组件的候选项;

### Props 的只读性

#### 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props

## state

- state

  - 构造函数是唯一可以给 this.state 赋值的地方,修改 state 要使用 setState();
  - State 的更新可能是异步的:

    - 因为 this.props 和 this.state 可能会异步更新，所以不要依赖他们的值来更新下一个状态。

      ```
          this.setState({
            counter: this.state.counter + this.props.increment,
          });
      ```

    - 要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。
      ```
          this.setState((state, props) => ({
            counter: state.counter + props.increment
          }));
      ```

  - 当调用 setState() 的时候，React 会把你提供的对象合并到当前的 state

## 事件处理

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时需要传入一个函数作为事件处理函数，而不是一个字符串。
- 在 React 中不能通过返回 false 的方式阻止默认行为。必须显式的使用 preventDefault 。

  ```
  function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
        );
  }
  ```

  ### this 绑定

  - 在 JavaScript 中，class 的方法默认不会绑定 this。如果忘记绑定 this.handleClick 并把它传入了 onClick，当调用这个函数的时候 this 的值为 undefined
    - 解决方法 [react 事件处理](https://react.docschina.org/docs/handling-events.html);
      - 使用 bind()绑定 this;
      - 使用 public class fields 语法;
      - 在回调中使用箭头函数(每次都会创建不同的回调函数,不建议);
