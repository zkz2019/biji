# js 数据类型

### JavaScript 中有 8 种基本的数据类型（7 种原始类型和 1 种引用类型）。

### JavaScript 是`动态类型`编程语言，意思是虽然编程语言中有不同的数据类型，但是定义的变量并不会在定义后，被限制为某一数据类型。

### 目录

- [Number](#number)
- [BigIng](#bigint)
- [String](#string)
- [Boolean](#boolean)
- [null](#null)
- [undefined](#undefined)
- [Object](#object)
- [Symbol](#symbol)

### 内容

#### <a id="number">Number</a>

#### <a id="bigint">BigIng</a>

#### <a id="string">String</a>

#### <a id="boolean">Boolean</a>

#### <a id="null">null</a>

#### <a id="undefined">undefined</a>

#### <a id="object">Object</a>

##### 对象用来存储键值对和更复杂的实体。在 JavaScript 中，对象几乎渗透到了这门编程语言的方方面面。

- 属性名可以是任何字符串或者 symbol

  - `__proto__` 的属性。我们不能将它设置为一个非对象的值

- 计算属性

  - 当创建一个对象时,可以在对象字面量中使用方括号,这叫做`计算属性`

    ```
        let fruit = prompt("Which fruit to buy?", "apple");

        let bag = {
          [fruit]: 5, // 属性名是从 fruit 变量中得到的
        };

        alert( bag.apple ); // 5 如果 fruit="apple"
    ```

    - 计算属性的含义很简单：[fruit] 含义是属性名应该从 fruit 变量中获取。

- 删除属性：`delete obj.prop`

- `in`操作符可以检查属性是否存在

  ```
  "key" in object   //  true||false
  // key通常需要是一个字符串;果我们省略引号，就意味着左边是一个变量，它应该包含要判断的实际属性名
  ```

  - 使用场景

    ```
      let obj = {
        test: undefined
      };

      alert( obj.test ); // 显示 undefined，所以属性不存在？

      alert( "test" in obj ); // true，属性存在！
    ```

- `for...in`

  ```
      for (key in object) {
        // 对此对象属性中的每个键执行的代码
      }
  ```

- 对象的顺序

  - 对象有`特别的顺序`：整数属性会被进行排序，其他属性则按照创建的顺序显示。
  - 整数属性要按照创建顺序进行排序,我们可以使用非整数属性名来 `欺骗` 程序。只需要给每个键名加一个加号 "+" 前缀就行了。

    ```
        let codes = {
          "+49": "Germany",
          "+41": "Switzerland",
          "+44": "Great Britain",
          // ..,
          "+1": "USA"
        };

        for (let code in codes) {
          alert( +code ); // 49, 41, 44, 1
        }
    ```

- 比较

  ```
    let a = {};
    let b = a; // 复制引用
    alert( a == b ); // true，都引用同一对象
    alert( a === b ); // true

    let c = {};
    let d = {}; // 两个独立的对象
    alert( c == d ); // false
  ```

- `Object.assign`

  ```
      let user = { name: "John" };

      let permissions1 = { canView: true };
      let permissions2 = { canEdit: true };

      // 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
      Object.assign(user, permissions1, permissions2);

      // 现在 user = { name: "John", canView: true, canEdit: true }
  ```

- [垃圾回收](https://zh.javascript.info/garbage-collection)

  - 可达性
    - “可达”值是那些以某种方式可访问或可用的值。它们一定是存储在内存中的
      - 当前函数的局部变量和参数。
      - 嵌套调用时，当前调用链上所有函数的变量与参数。
      - 全局变量。
      - （还有一些内部的）
      - -----(上面这些值被称为根)
      - 如果一个值可以通过引用或引用链从根访问任何其他值，则认为该值是可达的。

- `this`

  - `this` 的值是在代码运行时计算出来的，它取决于代码上下文。
    - 在没有对象的情况下调用
      - 严格模式为`undefined`
      - 非严格模式为全局`window`对象

- 构造函数

  - 可以使用构造函数来创建多个类似的对象。
  - 构造器的 `return`
    - 如果 `return` 返回的是一个对象则返回这个对象,所有其他情况下返回 `this`

- 可选链

- [原始值转换](https://zh.javascript.info/object-toprimitive)

  - 对象到原始值的转换，是由许多期望以原始值作为值的内建函数和运算符自动调用的

- [属性标志](https://zh.javascript.info/property-descriptors#she-ding-yi-ge-quan-ju-de-mi-feng-dui-xiang)
  - 对象还有三个特殊的特性（attributes），也就是所谓的“标志”：
    - `writable` — 如果为 `true`，则值可以被修改，否则它是只可读的。
    - `enumerable` — 如果为 `true`，则会被在循环中列出，否则不会被列出。
    - `configurable` — 如果为 `true`，则此特性可以被删除，这些属性也可以被修改，否则不可以。
      - 不可配置标志 `configurable:false` 有时会预设在内建对象和属性中。
      - 不可配置的属性不能被删除。
        - 确切地说，不可配置性对 `defineProperty` 施加了一些限制：
          - 不能修改 `configurable` 标志。
          - 不能修改 `enumerable` 标志。
          - 不能将 `writable: false` 修改为 `true`（反之亦然）。
          - 不能修改访问者属性的 `get/set`（但是如果没有可以分配它们）。
        - `configurable: false`的用途是防止更改和删除属性标志，但是允许更改对象的值。
  - `Object.getOwnPropertyDescriptor`方法允许查询有关属性的完整信息。
  - `Object.defineProperty`可以修改标志。
    ```
      Object.defineProperty(obj, "name", {
        value: value
        writable: false
        enumerable: false
        configurable: false
      });
    ```
  - `Object.defineProperties(obj, descriptors)`，允许一次定义多个属性。
    ```
      Object.defineProperties(obj, {
        name: { value: "John", writable: false },
        surname: { value: "Smith", writable: false },
        // ...
      });
    ```
  - `Object.getOwnPropertyDescriptors(obj)`可以一次获取所有属性描述符。
    - 它与 `Object.defineProperties` 一起可以用作克隆对象的“标志感知”方式：
      ```
        et clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
      ```
    - `for..in` 会忽略 `symbol` 类型的属性，但是 `Object.getOwnPropertyDescriptors` 返回包含 `symbol` 类型的属性在内的 所有 属性描述符。
    - 还有一些限制访问 整个 对象的方法：
      - `Object.preventExtensions(obj)`
        - 禁止向对象添加新属性
      - `Object.seal(obj)`
        - 禁止添加/删除/修改属性。为所有现有的属性设置 `configurable: false`。
      - `Object.freeze(obj)`
        - 禁止添加/删除/更改属性。为所有现有的属性设置 `configurable: false, writable: false`。
      - 还有针对它们的测试：
        - `Object.isExtensible(obj)`
          - 如果添加属性被禁止，则返回 `false`，否则返回 `true`。
        - `Object.isSealed(obj)`
          - 如果添加/删除属性被禁止，并且所有现有的属性都具有 `configurable: false` 则返回 `true`。
        - `Object.isFrozen(obj)`
          - 如果添加/删除/更改属性被禁止，并且所有当前属性都是 `configurable: false`, `writable: false`，则返回 `true`。
- 属性的 `getter` 和 `setter`

  - 访问器属性

    - 访问器属性由 `getter` 和 `setter` 方法表示。在对象字面量中，它们用 `get` 和 `set` 表示：

      ```
        let user = {
           name: "John",
           surname: "Smith",
           get fullName() {
             return `${this.name} ${this.surname}`;
           }
          set propName(value) {
            // 当执行 obj.propName = value 操作时，setter 起作用
          }
        };
      ```

      - 如果只有 `get` 没有 `set` 则严格模式下会报错,非严格模式下赋值会无效;
      - 如果只有 `set` 没有 `get` 则获取的值是 `undefined`

  - 访问器描述符
    - 对于访问器属性，没有 `value` 和 `writable`，但是有 `get` 和 `set` 函数。
      - 所以访问器描述符可能有：
        - `get` —— 一个没有参数的函数，在读取属性时工作，
        - `set` —— 带有一个参数的函数，当属性被设置时调用，
        - `enumerable` —— 与数据属性的相同，
        - `configurable` —— 与数据属性的相同。
    - 一个属性要么是访问器（具有 `get/set` 方法），要么是数据属性（具有 `value`），但不能两者都是。

- 原型继承

  - 在 JavaScript 中，对象有一个特殊的隐藏属性 [[Prototype]]（如规范中所命名的），它要么为 `null`，要么就是对另一个对象的引用。该对象被称为“原型” - 属性 [[Prototype]] 是内部的而且是隐藏的，但是这儿有很多设置它的方式。
    - 其中之一就是使用特殊的名字 `__proto__`
    - `__proto__` 是 [[Prototype]] 的因历史原因而留下来的 getter/setter
      - 在现代编程语言中，将其替换为函数 `Object.getPrototypeOf/Object.setPrototypeOf` 也能 `get/set` 原型
      - 引用不能形成闭环。如果我们试图在一个闭环中分配 `__proto__`，JavaScript 会抛出错误。
      - `__proto__` 的值可以是对象，也可以是 null。而其他的类型都会被忽略。
    - 只能有一个 [[Prototype]]。一个对象不能从其他两个对象获得继承。
  - 写入不使用原型

    - 原型仅用于读取属性。对于写入/删除操作可以直接在对象上进行。
    - 访问器（accessor）属性是一个例外，因为分配（assignment）操作是由 setter 函数处理的。因此，写入此类属性实际上与调用函数相同。

      ```
        let user = {
          name: "John",
          surname: "Smith",
          set fullName(value) {
            [this.name, this.surname] = value.split(" ");
          },
          get fullName() {
            return `${this.name} ${this.surname}`;
          }
        };
        let admin = {
          __proto__: user,
          isAdmin: true
        };
        alert(admin.fullName); // John Smith (*)
        admin.fullName = "Alice Cooper"; // (**)
        alert(admin.fullName); // Alice Cooper，admin 的内容被修改了
        alert(user.fullName);  // John Smith，user 的内容被保护了
      ```

      - 这里我的理解是调用的是原型的 get 和 set 方法,但是 this 是指向当前对象的;当 get 的时候先找本地 this 是否有需要的属性,如果没有就往上找,当 set 的时候由于是写入或者修改操作,所以不会往上找,如果本地没有需要的属性就会创建;
      - 方法是共享的，但对象状态不是。

  - `for..in` 循环会迭代继承的属性。
    - 如果想排除继承的属性，那么这儿有一个内建方法 obj.hasOwnProperty(key)：如果 obj 具有自己的（非继承的）名为 key 的属性，则返回 true。
  - `Object.keys(obj)` —— 返回一个包含该对象所有的键的数组。
  - `Object.values(obj)` —— 返回一个包含该对象所有的值的数组。
  - `Object.entries(obj)` —— 返回一个包含该对象所有 [key, value] 键值对的数组。
    - 对结果数组使用 `Object.fromEntries(array)` 方法，将结果转回成对象
      ```
        let obj = {
          a: 1,
          b: 2,
        };
        let doublePrices = Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [key, value * 2])
        );
      ```
  - `for..in/Object.keys/values/entries` 会忽略 `symbol` 属性
    - `Object.getOwnPropertySymbols`，它会返回一个只包含 `Symbol` 类型的键的数组。
    - `Reflect.ownKeys(obj)`，它会返回所有键。

#### <a id="symbol">Symbol</a>

- `Symbol` 值表示唯一的标识符
- `Symbol` 不会被自动转换为字符串
  - 如果真的想显示一个 `Symbol`，需要在它上面调用 `.toString()`
- 使用场景
  - `Symbol` 可以创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。
    - 实测`fon...in`和`Object.keys`无法遍历出`Symbol`属性
    - `Object.assign`会复制`Symbol`属性
  - 可以`Symbol.for(key)`读取全局`Symbol`如果没有就会创建
  - `Symbol.keyFor(key)`可以根据`Symbol`返回描述符
