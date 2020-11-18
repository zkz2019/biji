const fs = require("fs");

fs.readFile("input.txt", function (err, data) {
    if (err) { return console.log('err', err); };
    console.log('data', data.toString());
})