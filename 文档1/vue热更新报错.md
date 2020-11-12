###导入js库时
####热更新报错 Errors while compiling. Reload prevented.

#####WDS其实是webpack-dev-serverwebpack的意思，用来实现自动刷新的。
#####你在Vue组件进行频繁刷新时，如果没有安装Webpack，虽然页面可以正常显示，但是控制台会在你每次刷新时就报错。
#####解决方法是：在开发目录下安装Webpack，命令为npm install webpack-dev-server --save-dev即可，
#####安装完成之后会在node_modules/bin下找到。此时重新打开工程，命令为：npm run dev，即可解决热更新报错问题。
```
npm install webpack-dev-server --save-dev
```