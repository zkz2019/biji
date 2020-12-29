## 新建 git 项目大体可以按以下步骤

1. 提交用户名和电子邮件(提交过以后会全局保存,不需要每次提交)

   ```
   git config --global user.name "xxx"
   git config --global user.email "xxx@gmail.com"
   ```

   - 查看是否配置成功

     ```
     git config --list
     ```

2. `git init` 将当前文件夹初始化为 `git` 版本控制系统
3. 创建`.gitignore` 文本,过滤 `idea` 等无需存储的目录(可能需要在编辑器中才能创建)
   - 可以创建全局的`.gitignore`
     ```
     git config --global core.excludesfile=/Users/flores/.gitignore
     ```
4. 创建远程仓库
5. 获取/配置秘钥
   - cd 到 C/Users(用户目录)/qiqi(管理员目录)/.ssh 目录;
   - 生产秘钥: `ssh-keygen -t rsa -b 4096 -C "Git邮箱@qq.com"`
     - 一路回车完成
     - 查看秘钥
       - git 面板输入:
         ```
             cat id_rsa.pub
         ```
       - 打开 C/Users(用户目录)/qiqi(管理员目录)/.ssh 目录的.pub 文件,里面的文本就是秘钥
   - 远程仓库新建秘钥,将生产的秘钥粘贴过去
6. 修改,提交文档内容
   ```
    git add . 添加到暂存库
    git commit -m '做了什么事' 提交
    git status 查看状态
    git log 查看commit信息
   ```
   - 注意:先做好 `.gitignore` 文件,如果没有做好 过早使用了 `git add .`就需要执行下面的命令
     ```
     git rm -r --cached .idea/
     ```
7. 添加远程指针
   ```
   git remote add 自命名 远程仓库地址
   ```
8. 将本地分支推送到远程
   ```
   git push -u 自命名 master
   ```
   - `-u`参数表示记住对应关系，下次可以直接`git push`推送。
   - 第一次加`--force`
9. 拉取远程代码
   ```
   git pull 自命名
   ```
10. 查看与上一层`commit`的区别
    ```
    git diff HEAD
    ```
