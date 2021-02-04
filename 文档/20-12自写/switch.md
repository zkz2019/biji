### 写这个文档我真的是感到太没面子了...

#### 最基础的东西总是忘记,还是得靠笔记啊

- switch 语法

  ```
  let value = 0;
  switch(2){
      case 2:
          value=val*2;
      case 3:
          value=val*3;
          break;
      default:
          value=val*4;
  }
  ```

- switch 会匹配传入的参数跟 case 的条件
  - 如果匹配上就会执行该 case 后面的代码
    - 这里有一个坑,如果没有 break 或者 return 的话就会继续执行后面的代码
      - 比如上面这里匹配了 2,就会将后面的 3 和 default 都执行;但是如果匹配的是 3,则不会执行 2 和 default
      - 从匹配到的 case 开始执行,直到遇到 break || return
  - 最后一条语句可以不写 break
  - default 随便放在哪个位置,如果 case 都没匹配到;则会执行 default 后的语句;default 如果有需要同样应该用 break 结束
  - 如果多种 case 匹配一个 case 值，则选择第一个 case。
  - Switch case 使用严格比较（===）