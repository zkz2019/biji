class Compiler {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;
        if (this.$el) {
            this.compile(this.$el);
        }
    }
    compile(el) {
        const childNode = el.childNodes;
        // console.log("el", el, childNode)
        Array.from(childNode).forEach(node => {
            // console.log('node.nodeType', node.nodeType)
            if (this.isElement(node)) {
                // console.log('这是属性节点' + node.nodeName);
                this.compileElement(node);
            } else if (this.isInter(node)) {
                this.compileText(node)
                // console.log("这是文本节点" + node.textContent);
            }
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }
    isElement(node) {
        return node.nodeType === 1;
    }
    isInter(node) {
        // console.log("kkkkk", node.textContent)
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
    compileText(node){
        // node.textContent=this.$vm[RegExp.$1];
        this.update(node,RegExp.$1,"text");
    }

    update(node,exp,dir){
        // console.log("111111111",exp,this.$vm[exp],dir)
        const fn = this[dir+"Updater"];
        fn&&fn(node,this.$vm[exp])
        new Watcher(this.$vm,exp,function(val){
            fn&&fn(node,val)
            // console.log(fn)
        })
    }

    textUpdater(node,value){
        // console.log('text',value)
        node.textContent=value;
    }
    compileElement(node){
        let nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr=>{
            const attrName = attr.name;
            const exp = attr.value;
            if(this.isDreactive(attrName)){
                const dir = attrName.substring(2);
                // console.log("kkkkk",dir,this[dir])
                this[dir] &&this[dir](node,exp);
            }
        })
    }
    isDreactive(attr){
        return attr.indexOf("z-") === 0;
    }
    text(node,exp){
        // console.log("text",exp)
        this.update(node,exp,"text");
        // node.textContent = exp;
    }
    html(node,exp){
        // console.log("html",exp)
        this.update(node,exp,"html");
        // node.innerHTML=exp;
    }
    htmlUpdater(node,value){
        // console.log('html',value)
        node.innerHTML=value;
    }
}

// class Compile {
//     constructor(vm, el) {
//         this.$vm = vm;
//         this.$el = document.querySelector(el);
//         if (this.$el) {
//             this.compile(this.$el);
//         }
//     }
//     compile(el) {
//         const childNode = el.childNodes;
//         Array.from(childNode).forEach(node => {
//             if (this.isElement(node)) {
//                 console.log("这是属性节点", node.nodeName);
//                 this.compileElement(node);
//             } else if (this.isinter(node)) {
//                 console.log("这是插值节点")
//                 this.compileText(node);
//             }
//             if (node.childNodes && node.childNodes) {
//                 this.compile(node);
//             }
//         })
//     }
//     isElement(node) {
//         return node.nodeType === 1;
//     }

//     isinter(node) {
//         return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
//     }

//     compileText(node) {
//         node.textContent = this.$vm[RegExp.$1];
//     }

//     compileElement(node) {
//         const nodeAttrs = node.attributes;
//         Array.from(nodeAttrs).forEach(item => {
//             const attrname = item.name;
//             const exp = item.value;
//             if (this.isDireactive(attrname)) {
//                 const dir = attrname.substring(2);
//                 this[dir] && this[dir](item, exp);
//             }
//         })
//     }

//     isDireactive(attr) {
//         return attr.indexOf("k-") === 0
//     }

//     text(node, exp) {
//         node.textContent = this.$vm[exp];
//     }
// }