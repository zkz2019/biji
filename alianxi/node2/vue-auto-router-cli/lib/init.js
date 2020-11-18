const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear")
const chalk = require("chalk");
const clone = require("./download.js");
const open = require("open");
let log = content => console.log(chalk.green(content));
module.exports = async name => {
    clear();
    // const data = await figlet("ZH WELCOME");
    // log(data);
    log("创建项目" + name);
    await clone("github:su37josephxia/vue-template", name)
    log("安装依赖");
    await spawn(process.platform == "win32" ? "cnpm.cmd" : "cnpm", ["install"], { cwd: `./${name}` });
    log(`
=================
安装完成

=================
`)
    open("http://localhost:8080/");
    await spawn(process.platform == "win32" ? "cnpm.cmd" : "cnpm", ["run", "serve"], { cwd: `./${name}` });
}

function spawn(...args) {
    const { spawn } = require("child_process");
    return new Promise(resolve => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on("close", () => {
            resolve();
        })
    })
}