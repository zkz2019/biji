# 自写 npm 模块

1.  新建文件

    `mkdir xxx`

2.  初始化

    `npm init -y`

3.  安装依赖

    <!-- 需要什么功能安装什么依赖,不懂就安装下面这些先用着 -->

    `npm i commander download-git-repo ora handlebars figlet clear chalk open -s`

4.  编写执行脚本

    1. 在根目录下创建 bin 文件
    2. 在 bin 文件里新建脚本 zh.js

    - 定制命令行界面

    ```
    #!/usr/bin/env node   //指定脚本解析器为node
    ==========================
            const program = require('commander');
            program.version(require('../package').version);
            program
            .command('init <name>')
            .description('init project')
            .action(name => { console.log('init ' + name) }
            program.pars(process.argv)  //这一行为必须
    ```

    3. 在根目录下创建 lib 文件,lib 下新建脚本 init.js

    - 定制欢迎界面

      将 zh.js 的 action 参数设置为: require("./../lib/init.js")

    ```
         const { promisify } = require("util");
         const figlet = promisify(require("figlet"));
         const clear = require("clear")
         const chalk = require("chalk");
         let log = content => console.log(chalk.green(content));
         module.exports = async name => {
         clear();
         const data = await figlet("ZH WELCOME");
         log(data);
         }
    ```

    4. 在 lib 下创建 download.js

    - 克隆脚手架
      ```
      const { promisify } = require("util");
      module.exports = async (repo, desc) => {
      const download = promisify(require("download-git-repo"));
      const ora = require("ora");
      const process = ora("...下载中 " + repo);
      process.start();
      await download(repo,desc);
      process.succeed();
      }
      ```
    - 修改 init.js

      ```
      const { promisify } = require("util");
      const figlet = promisify(require("figlet"));
      const clear = require("clear")
      const chalk = require("chalk");
      const clone = require("./download.js");
      let log = content => console.log(chalk.green(content));
      module.exports = async name => {
          clear();
          log("创建项目" + name);
          await clone("github:su37josephxia/vue-template", name)
      }
      ```

    5.  安装依赖&启动项目

    - 修改 init.js

      ```
          module.exports = async name => {
              clear();
              // const data = await figlet("ZH WELCOME");
              // log(data);
              log("创建项目" + name);
              await clone("github:su37josephxia/vue-template", name)
              log("安装依赖");
              await spawn(process.platform == "win32" ? "cnpm.cmd" : "cnpm",["install"], { cwd: `./${name}` });
              log(`
          =================
          安装完成

          =================
          `);
              log("启动项目");
              open("http://localhost:8080/");
              await spawn(process.platform == "win32" ? "cnpm.cmd" : "cnpm", ["run",          "serve"], { cwd: `./${name}` });
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
      ```

5.  配置

    - 在 package.json 中加入

      ```
        "bin": {  "xxx": "./bin/xxx.js" },
      ```

6.  将 npm 模块链接到对应的运⾏行行项⽬目中去

    ```
    链接- npm link
    删除- ls /usr/local/bin/
          rm /usr/local/bin/xxx
    ```
