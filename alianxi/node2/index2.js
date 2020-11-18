const http = require("http");
const fs = require("fs")
http.createServer((request, response) => {
    // console.log('request', request);
    // response.end("Hello Node !");
    const { url, method, headers } = request;
    console.log('url,method', url, method);
    if (url === "/" && method === "GET") {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" })
                response.end("服务器错误 !");
                return;
            }
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html");
            response.end(data)
        })
    } else if (url === "/user" && method === "GET") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify([{ a: 111 }]))
    } else if (method === "GET" && headers.accept.indexOf("image/*") !== -1) {
        fs.createReadStream("." + url).pipe(response);
    }
}).listen(8888);