# Linux 常用命令

- 切换用户
  `su user`

- 创建用户，并指定分组和主目录
  `useradd -d /opt/reconciliation -s /sbin/nologin -g ftpGroup -G root ftpUser`

  - 解析：

    - useradd 添加用户 ftpUser
    - -d 指定用户根目录为/opt/reconciliation
    - -s 指定 shell 脚本为/sbin/nologin，表示不允许 shell 登录
    - -g 创建分组 ftpGroup
    - -G 指定 root 分组
    - PS：创建有问题可以删除重新创建 userdel -r ftpUser

- 设置用户密码
  `sudo passwd user`

- 性能监控

  1. top
     - PID：进程的 id
     - IDUSER：进程所有者
     - PR：进程的优先级别，越小越优先被执行
     - NInice：值
     - VIRT：进程占用的虚拟内存
     - RES：进程占用的物理内存
     - SHR：进程使用的共享内存
     - S：进程的状态。S 表示休眠，R 表示正在运行，Z 表示僵死状态，N 表示该进程优先值为负数
     - %CPU：进程占用 CPU 的使用率
     - %MEM：进程使用的物理内存和总内存的百分比
     - TIME+：该进程启动后占用的总的 CPU 时间，即占用 CPU 使用时间的累加值。
     - COMMAND：进程启动命令名称
     - 常用的命令：
       - P：按%CPU 使用率排行
       - T：按 MITE+排行
       - M：按%MEM 排行
  2. pmap
     - 可以根据进程查看进程相关信息占用的内存情况，(进程号可以通过 ps 查看)如下所示：\$ pmap
     - -d 145963、
  3. ps
     - 如下例所示：
       - \$ ps -e -o 'pid,comm,args,pcpu,rsz,vsz,stime,user,uid' 其中 rsz 是是实际内存
       - \$ ps -e -o 'pid,comm,args,pcpu,rsz,vsz,stime,user,uid' | grep oracle | sort -nrk5 其中 rsz 为实际内存，上例实现按内存排序，由大到小

- 程序前后台运行

  1. &
     - 加在一个命令的最后，可以把这个命令放到后台执行 ,如 gftp &,
  2. ctrl + z
     - 可以将一个正在前台执行的命令放到后台，并且处于暂停状态，不可执行
  3. jobs
     - 查看当前有多少在后台运行的命令
     - -l 选项可显示所有任务的 PID
     - jobs 的状态可以是 running, stopped, Terminated
     - 但是如果任务被终止了（kill）
     - shell 从当前的 shell 环境已知的列表中删除任务的进程标识；也就是说，jobs 命令显示的是当前 shell 环境中所起的后台正在运行或者被挂起的任务信息；
  4. fg
     - 将后台中的命令调至前台继续运行
     - 如果后台中有多个命令，可以用 fg %jobnumber 将选中的命令调出，%jobnumber 是通过 jobs 命令查到的后台正在执行的命令的序号(不是 pid)
  5. bg

     - 将一个在后台暂停的命令，变成继续执行 （在后台执行）
     - 如果后台中有多个命令，可以用 bg %jobnumber 将选中的命令调出，%jobnumber 是通过 jobs 命令查到的后台正在执行的命令的序号(不是 pid)
     - 如果后台的任务号有 2 个，[1],[2]；如果当第一个后台任务顺利执行完毕，第二个后台任务还在执行中时，当前任务便会自动变成后台任务号码“[2]”的后台任务。所以可以得出一点，即当前任务是会变动的。当用户输入“fg”、“bg”和“stop”等命令时，如果不加任何引号，则所变动的均是当前任务

  6. 进程的终止

     - 后台进程的终止：

       - 通过 jobs 命令查看 job 号（假设为 num），然后执行 kill %num
       - 通过 ps 命令查看 job 的进程号（PID，假设为 pid），然后执行 kill pid

     - 前台进程的终止：
       - ctrl+c

  7. 进程的挂起
     - 后台进程的挂起：
       - 在 solaris 中通过 stop 命令执行，通过 jobs 命令查看 job 号(假设为 num)，然后执行 stop %num；
       - 在 redhat 中，不存在 stop 命令，可通过执行命令 kill -stop PID，将进程挂起；
       - 当要重新执行当前被挂起的任务时，通过 bg %num 即可将挂起的 job 的状态由 stopped 改为 running，仍在后台执行；当需要改为在前台执行时，执行命令 fg %num 即可；
     - 前台进程的挂起：
       - ctrl+Z;

- 文件属主修改
  `chown -R liuhai opt`
