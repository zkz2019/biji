const fs = require("fs");

const data = fs.readFileSync("index.txt");
const data1 = fs.readFileSync("input.txt");

console.log('data,data1', data.toString(), data1+"");;
console.log('程序执行结束');