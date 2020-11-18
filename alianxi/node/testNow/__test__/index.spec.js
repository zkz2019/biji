// const fs = require("fs");

// test("集成测试  测试测试生成代码文件",()=>{

//     fs.rmdirSync(__dirname+'data/__test__',{recursive:true});
//     const src = new(require("../index"))();
//     src.genJsetSource(__dirname+"/data");
// })


// test("测试测试代码生成", () => {
//     const src = new (require("../index"))();
//     const ret = src.getTestSource("fun", "class");
//     console.log('ret', ret);
//     expect(ret)
//         .toBe(`test("TEST fun",()=>{
// const fun=require("../class")
// const ret = fun();
// // expect()
// //      toBe("test return");
// })
// `)
// })


test("测试文件名生成", () => {
    const src = new (require("../index"))()
    const ret = src.getTestFileName("abc/class.js");
    // console.log('ret',ret);
    expect(ret)
        .toBe("abc/__test__/class.spec.js");
})