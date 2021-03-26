## [git 基本操作及常用指令](https://www.bookstack.cn/read/git-tutorial/README.md)

1. 分支

   - 列出本地分支
     ```
      git branch
     ```
   - 创建新分支
     ```
     git branch xxx
     ```
   - 在远程仓库创建分支,并与本地同名分支建立追踪关系
     ```
     git push -u 仓库名 xxx
     ```
     - 如果本地分支改名了,追踪关系将脱离
   - 将当前分支改名
     ```
     git branch -m xxx
     ```
   - 删除没有未合并变动的分支
     ```
     git branch -d xxx
     ```
   - 强制删除分支
     ```
     git branch -D xxx
     ```
   - 切换分支
     ```
     git checkout xxx
     ```
   - 基于 a 分支创建新的 b 分支,新的 b 分支将成为当前工作区
     ```
     git checkout -b b a
     ```
   - 将本地分支推到远程 `git push origin 本地分支名:远程分支名`(远程没有会自动创建)

2. git add

   ### git add 命令用于将变化的文件，从工作区提交到暂存区。它的作用就是告诉 Git，下一次哪些变化需要保存到仓库区。用户可以使用 git status 命令查看目前的暂存区放置了哪些文件。

   - 参数
     - `-u`--只添加暂存区已有的文件
     - `-A/-all`--追踪所有操作
     - `-f`--强制添加某个文件(及时`.gitignore`包含了这个文件)
     - `-p`--进入交互模式,可以逐个指定需要暂存的文件
   - `git2.0` 一切没有追踪删除操作
   - `git add`会将工作区改动的文件加入到`.git/object/`目录中,文件名是文件内容的 SHA1 哈希值,同时还将这些文件的文件名和对应的哈希值，写入`.git/index`文件，每一行对应一个文件;可以根据这个哈希值到`.git/objects/`目录下找到添加后的文件。

3. git fetch

   ### git fetch 用于将远程更新拉取到本地

   #### 跟 git pull 对比它不会将自动将更新 merge;所以它对本地的开发代码没有影响

4. git stash

   ### 它可以将所有未提交的更新都储存起来

   #### 它是本地的,不会通过 git push 提交到远程

   ```
     # 给 stash 添加标识
     git stash save "test-cmd-stash"

     # 恢复某个暂时保存的工作
     git stash apply stash@{1}

     # 恢复最近一次stash的文件
     git stash pop

     # 丢弃最近一次stash的文件
     git stash drop

     # 删除所有的stash
     git stash clear
   ```
