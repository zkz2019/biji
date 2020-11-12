# jsDoc 随笔

## JSDoc 命令行使用方法

    通过命令行来生成 JSDoc 有两种适合前端的方式：一种是通过 npm 来安装 jsdoc 来生成文档，需要学习相关的命令行参数与配置文件的编写；另一种是使用 grunt 来生成 jsdoc，这种方法配置起来比较简单，等于将各种配置参数写在了 Gruntfile.js 的配置项里，然后可以自定义各种操作命令，十分灵活。

1. npm 生成

   `npm install jsdoc -g`

   - 指定文件

     `jsdoc xxx.js`

2. grunt 生成

   `npm install grunt-jsdoc --save-dev`

   - 然后在 Gruntfile.js 文件中进行配置，就可以在命令行中使用了

   ```
   grunt.initConfig({
    jsdoc: {
        dist: {
            // 必填项，需要生成文档的路径数组，也可以将 README.md 文件加入其中
            src: ['src/*.js', 'test/*.js'],
            // 可选项，jsdoc bin 文件路径，一般不写，会自己在 node_modules 中寻找
            jsdoc: '',
            options: {
                // 必填项，生成文件的路径
                destination: './docs/',
                // 可选项，conf 文件的路径
                configure: 'conf.json',
                // 可选项，模板路径
                template: ''
            }
        }
    }
   });
   grunt.task.loadNpmTasks('grunt-jsdoc');
   grunt.task.registerTask('doc', ['jsdoc']);
   ```
