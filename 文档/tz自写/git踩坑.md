- 项目开发了一段时间,才想起传到 git;`git init`后`git add .`报错:

  ```
  error: 'myapp/' does not have a commit checked out
  fatal: adding files failed

  ```

  - 原因:之前子文件'myapp'中也`git init`了(网上有人说是出现了一个隐藏的'myapp/'文件,删除那个文件就好了)
    - 解决方法
      - 删除`myapp`中的`.gitignore`文件
      - 在`myapp`中运行`rm -rf .git`
