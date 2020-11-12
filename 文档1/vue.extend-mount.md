###Vue.extend返回的是一个扩展实例构造器
####其主要用来服务于Vue.component，用来生成组件

####可以简单的理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用扩展实例构造器来生产组件实例，并挂载到自定义元素上。著作权归作者所有。
####如果$mount没有提供参数，模板将被渲染为文档之外的的元素，并且你必须使用原生DOM API把它插入文档中。

####如果在实例化vue的时候指定el，则该vue将会渲染在此el对应的dom中，反之，若没有指定el，则vue实例会处于一种“未挂载”的状态，此时可以通过$mount来手动执行挂载。

```angular2html
var MyComponent = Vue.extend({
  template: '<div>Hello!</div>'
})

// 创建并挂载到 #app (会替换 #app)
new MyComponent().$mount('#app')

// 同上
new MyComponent({ el: '#app' })

// 或者，在文档之外渲染并且随后挂载
var component = new MyComponent().$mount()
document.getElementById('app').appendChild(component.$el)
--------------------- 
```

