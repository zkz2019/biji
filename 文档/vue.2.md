# 组件

- 组件是可复用的 Vue 实例，且带有一个名字。

#### 组件的创建
1. data必须是个函数
```js
 data() {
            return {

            }
        },
```
2. 声明组件名字，第一个字母必须大写或者使用驼峰命名(用来和html的标签进行区分)
```js
  // 全局组件声明加挂载
    Vue.component('Vbtn', {
        template: `
           <button>点击</button>
        `
    })
 //1.局部组件的声明
    var App = {
        data() {
            return {

            }
        },
        methods:{
           clickHanlder(){
               console.log(this)
           }
        },
        template: `
           <div>
            
            <button @click = 'clickHanlder'> 点击 </button>
           </div>
        `
    };
```
#### 局部组件的使用
```js
 // 入口组件
    var App = {
        data() {
            return {

            }
        },
          // 挂载组件
        components: {
            Vheader, Vaside, Vcontent
        },
         // 使用组件
        template: `
           <div> 
               <Vheader class="top" />
               <div>
                   <Vaside class="left" />
                   <Vcontent class="right" />
               </div>
           </div>
       `
    }
```
#### 全局组件的使用
```js
var Vcontent = {
        template: `
           <div>
             我是内容组件
             <!--这里放在了子组件中 -->
             <Vbtn />
            </div>
           
       `
    }
```
> qwq

## 父子组件
- 父传子
 1. 先给父组件绑定自定义属性
 2. 在子组件中使用props接收父组件传递的数据
 3. 可以在子组件中任意的使用
- 子传父
 1. 先在父组件中绑定自定义事件
 2. 在子组件中触发原生的事件 在函数中使用$emit触发自定义的childHanlder
```js
 Vue.component('Child', {
      //在子组件使用该值时需要经过新变量重新传递，这样当这个值变更时，不会造this.childData的更改(父===>子)
        data(){
           return {
               req : this.childData
           }
        },
        // 3.可以在子组件中任意的使用(父===>子)
        template: `
           <div>
             <p>我是一个子组件</p>
             <p>{{req}}</p>
             <input type="text" v-model = "req" @input = "changeValue(req)" />
           </div>
        `,
        props:['childData'],
        // 2. 在子组件中触发原生的事件 在函数中使用$emit触发自定义的childHanlder(子===>父)
        methods:{
            changeValue(val){
                //$emit(自定义的事件名，传递的消息)
                this.$emit('childHanlder',val)
            }
        }
    })

    

    Vue.component('Parent', {
       
        data() {
            return {
                msg: "我是父组件的数据",
                res:""
            }
        },
         // 1.先给父组件绑定自定义属性(父===>子)
        template: `
           <div>
             <p>我是一个父组件+{{res}}</p>
             <Child :childData = 'msg' @childHanlder = "childHanlder"/>
           </div>
        `,
        //1. 先在父组件中绑定自定义事件(子===>父)
        methods:{
            childHanlder(val){
                console.log(val)
                 this.res = val;
                console.log(this.res)
            }
        }
    })
```
> 由于父组件childHanlder()方法中更改了this.childData值，childHanlder方法除了父组件触发这个方法，子组件也会触发，即子组件会更改childData的值，但是由于父子组件的传递机制，会造成报错Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders....
因此在子组件使用该值时需要经过新变量（req）重新传递，这样当这个值变更时，不会造childData的更改

作者：saintkl
链接：https://www.jianshu.com/p/392145843afe
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。


## 多层父子组件通信
![我是图片](./img/1.png)

![我是图片](./img/4.png)

## 兄弟组件通信
![我是图片](./img/2.png)

## 父子组件通信 [provide](https://blog.csdn.net/viewyu12345/article/details/83011618)
![我是图片](./img/3.png)

## 父子组件通信 [\$parent和$children](https://www.cnblogs.com/phptree/p/10082684.html)

> qwq
### 插槽
1. 内置组件 slot 作为承载分发内容的出口 
```js
Vue.component('Vbtn', {
        template: `
           <!-- 插槽 内置组件 slot 作为承载分发内容的出口 -->
           <button class="default" :class="type">
                <slot>
                按钮
                </slot>
           </button>
        `,
        props:[
            'type'
        ]
    })

var Vcontent = {
        template: `
           <div>
             我是内容组件
             <!--这里放在了子组件中 -->
             <Vbtn type='main'>主要按钮</Vbtn>
             <Vbtn type='success'>成功按钮</Vbtn>
            </div>  
       `
    }
```
2. 具名插槽
有名字的插槽
```js
  Vue.component("myLi", {
        template: `
           <li>
                预留的第一个坑<br>
              <slot name="one"></slot>
              预留的第二个坑<br>
              <slot name="two"></slot>
           </li>
        
        `
    })

    var App = {
        template: `
           <div>
               <ul>
                 <myLi>
                   <h2 slot="two">我是第一个坑</h2>
                   <h3 slot="one">我是第二个坑</h2>
                 </myLi>
                </ul>
           </div>
        `
    }

    new Vue({
        el: "#app",
        components: {
            App
        },
        template: `
          <App />
       `
    })
```
### 过滤器
过滤器的作用：为页面中的数据进行添油加醋。
 - 局部过滤器
 - 全局过滤器
___
 >
 > > 作者 ：周子瑜
 > > 日期 ：2019/3/18
 > 



