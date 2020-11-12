 ## v-if和v-for哪个优先级高？如果两个同时出现，应该怎么优化得到更好的性能？
- v-for的优先级要高于v-if;
- 优化:

    `<div v-if="false" v-for="item of list">{{item}}</div>`

    `<div v-if="item%2" v-for="item of 10">{{item}}</div>`
    1. 如果v-if是要将整个列表隐藏的情况 
        - 可以在列表外套一个template或套一个盒子,然后在外层盒子进行v-if判断
    ```
        <template v-if="false">
            <div :key="item" v-for="item of list">{{item}}</div>
        </template>
    ```

    2. 如果v-if是要隐藏列表的某项
        - 可以用计算属性对列表数据进行筛选
    ```
        <div :key="item" v-for="item of filterList">{{item}}</div>
    ```
    ```
        data:{list:[1,2,3,4,5]},
        computed:{
            filterList(){
                return this.list.filter(item=>{
                    if(item%2){
                        return item;
                    }
                })
            }
        }
    ```