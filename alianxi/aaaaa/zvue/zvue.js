
const copyArray = Array.prototype;
const arrayProto = Object.create(copyArray);
["pop","push","shift","unshift","sort","revers","splice"].forEach(method=>{
    console.log(method)
    arrayProto[method]=function(){
        arrayProto[method].apply(this,arguments);
        console.log("ddddd",this,arguments)
    }
})

function defineReactive(obj, key, val) {
    observe(val);
    const dep = new Dep;
    Object.defineProperty(obj, key, {
        get() {
            // console.log("get: " + key + " " + val)
            Dep.target&&dep.addDep(Dep.target);
            return val;
        },
        set(newVal) {
            // console.log("set: " + key + " " + newVal)
            if (newVal != val) {
                observe(newVal);
                val = newVal;
            }
            // watchers.forEach(e=>e.update())
            dep.notify();
        }
    })
}

function set(obj, key, val) {
    defineReactive(obj, key, val);
}

function observe(obj) {
    if (typeof obj !== "object" || obj === null) {
        return;
    }
    new Observe(obj);
}


class Zvue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        observe(options.data);
        proxy(this, "$data");
        new Compiler(options.el,this);
    }
}

class Observe {
    constructor(options) {
        this.value = options;
        console.log("zzzzz",this.value,Array.isArray(this.value));
        if(Array.isArray(this.value)){
            this.isarr(this.value);
            for(let i = 0;i<this.value.length;i++){
                observe(this.value[i])
            }
        }else if (typeof this.value === "object") {
        this.walk(this.value)
        }
    }
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        })
    }
    isarr(arr){
        console.log("jinrudddd",arr,arr.__proto__,arrayProto);
        arr.__proto__=arrayProto;
    }
}


function proxy(vm, currentKey) {
    Object.keys(vm[currentKey]).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[currentKey][key];
            },
            set(newVal) {
                vm[currentKey][key] = newVal;
            }
        })
    })
}

// let watchers=[];
class Watcher{
    constructor(vm,key,updateFn){
        this.vm = vm;
        this.key = key;
        this.updateFn=updateFn;
        // watchers.push(this);

        Dep.target=this;
        this.vm[this.key];
        Dep.target=null;
    }

    update(){
        // console.log("jin入aaaaa",this.vm,this.key,this.vm[this.key])
        this.updateFn.call(this.vm,this.vm[this.key]);
    }
}

class Dep{
    constructor(){
        this.deps = []
    }
    addDep(dep){
        this.deps.push(dep);
    }
    notify(){
        this.deps.forEach(dep=>dep.update());
    }
}






// function proxy(vm,currentKey){
//     Object.keys(vm[currentKey]).forEach(keys=>{
//         Object.defineProperty(vm,keys,{
//             get(){
//                 return vm[currentKey][keys]
//             },
//             set(newVal){
//                 vm[currentKey][keys]=newVal;
//             }
//         })
//     })
// }

// class Zvue {
//     constructor(options) {
//         this.$options = options;
//         this.$data = options.data;
//         observe(this.$data);
//         proxy(this,"$data");
//         new Compile(this,options.el);
//     }
// }

// class Observe {
//     constructor(value) {
//         this.value = value;
//         if (typeof value === "object") {
//             this.walk(value);
//         }
//     }
//     // 对象数据响应化
//     walk(obj) {
//         Object.keys(obj).forEach(key => {
//             defineReactive(obj, key, obj[key])
//         })
//     }

//     // 数组诗句响应化
// }
// let obj = 1;