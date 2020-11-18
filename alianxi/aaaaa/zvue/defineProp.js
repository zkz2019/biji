function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            return val;
            console.log(`get: ${key} ${val}`);
        },
        set(newVal) {
            if (newVal !== val) {
                val=newVal;
                observe(newVal)
                console.log(`set: ${key} ${newVal}`)
            }
        }
    })
}

function set(obj, key, val) {
    defineReactive(obj, key, val);
}

function observe(obj) {
    if (typeof obj !== "object") {
        return;
    }
    console.log("jinru", obj)
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    })
}

obj = {
    a: 1,
    b: "2",
    c: {
        cc: 12
    }
};
obj1 = {
    a: 1,
    b: "2",
    c: {
        cc: 12
    }
};
observe(obj);
obj.c;
console.log("kjkj", obj1.c.cc)
obj.c.cc
obj.c.cc = 1212;















// function defineReactive(obj, key, val) {
//     observe(val);

//     Object.defineProperty(obj, key, {
//         get() {
//             console.log("get: " + key + " " + val)
//             return val;
//         },
//         set(newVal) {
//             console.log("set: " + key + " " + newVal)
//             if (newVal != val) {
//                 observe(newVal);
//                 val = newVal;
//             }
//         }
//     })
// }

// function set(obj, key, val) {
//     defineReactive(obj, key, val);
// }

// function observe(obj) {
//     if (typeof obj !== "object" || obj === null) {
//         return;
//     }
//     Object.keys(obj).forEach(key => {
//         defineReactive(obj, key, obj[key])
//     })
// }


// let obj = {
//     name: "zhou",
//     sex: "man",
//     age: "22",
//     a: {
//         b: 1
//     }
// };
// observe(obj);
// obj.name = "li";
// obj.sex = "feman";
// console.log(obj)
// obj.a.b = "2";
// obj.a={c:2};
// obj.a.c;
// obj.a.c=4;
// obj.a.c
// set(obj, "dong", "");
// obj.dong = "donnnn";
// obj.dong;






// let obj ={};
// defineReactive(obj,"name","")
// obj.name
// obj.name="zhou"