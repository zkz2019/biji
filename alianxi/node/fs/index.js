const fs = require("fs");

let buf = new Buffer.alloc(1024);
fs.open("./index.txt", "r", (err, data) => {
    if (err) {
        console.log('err', err);
    }
    fs.read(data,buf,0,buf.length,0,(err,bytes)=>{
        if(err){
            console.log('err',err);
        }else{
            console.log('bytes,buf',bytes,buf);
        }
    })
    console.log('data', data);
})

fs.stat("./index.txt",(err,data)=>{
    if(err){
        console.log('err',err);
    }
    console.log('data',data);
})

fs.writeFile("./input.txt","bbbbb",(err,data)=>{
    if(err){
        console.log('err',err);
    }else{
        console.log('data',data);
    }
})