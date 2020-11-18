const events = require("events");

const eventEmitter = new events.EventEmitter();

const connectHandler = function connected() {
    console.log('连接成功');

    eventEmitter.emit("data_received");
}

eventEmitter.on("connection", connectHandler);

eventEmitter.on("data_received", () => {
    console.log('成功');
})

eventEmitter.emit("connection");

console.log('执行完毕!');