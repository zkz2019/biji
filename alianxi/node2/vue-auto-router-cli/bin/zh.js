#!/usr/bin/env node

const program = require("commander");
console.log('require(../package).version', require("../package").version);

program
    .command("init <name>")
    .description("init project")
    .action(require("./../lib/init.js"))


program
    .command("refresh")
    .description("refresh")
    .action(require("./../lib/refresh.js"))
program.parse(process.argv);