const events = require("events");
const eventEmitter = new events.EventEmitter();

function listener1() {
    console.log('listenner1 执行');
}

function listener2() {
    console.log('listenner2 执行');
}
eventEmitter.on("connection", listener2)

eventEmitter.addListener("connection", listener1);

eventEmitter.emit("connection")

const listeners = eventEmitter.listenerCount("connection");
console.log('listeners 监听数量:',listeners);

eventEmitter.removeListener("connection",listener1);
console.log('listener1 监听移除',);

const listeners2 = eventEmitter.listenerCount("connection");
console.log('listeners2 监听数量',listeners2);

console.log('程序执行完毕');