const fs = require("fs");
const handlebars = require("handlebars");
const chalk = require("chalk");
module.exports = async () => {

    const list = fs.readdirSync("../test/src/views")
        .filter(v => v != "Home.vue")
        .map(v => {
            return {
                name: v.replace(".vue", "")
                    .toLowerCase(),
                file: v
            }
        })
    console.log('list', list);
    compile({ list }, "../test/src/router.js", "../test/template/router.js.hbs")
    compile({ list }, "../test/src/App.vue", "../test/template/App.vue.hbs")

    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(filePath, result);
            console.log(chalk.green(`火箭${filePath} 创建成功 !`));
        }
    }
}