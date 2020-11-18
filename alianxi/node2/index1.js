const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

// (async () => {
//     const data = await readFile("./a.txt");
//     console.log('data', data.toString());
// })()


const buf1 = Buffer.alloc(10);
console.log('buf1', buf1);

const buf2 = Buffer.from("a");
console.log('buf2', buf2);

const buf3 = Buffer.from("中文");
console.log("buf3", buf3);

const buf4 = Buffer.concat([buf3,buf2]);
console.log('buf4',buf4.toString());