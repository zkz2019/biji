# java
##### 下载地址:&lt;https://www.oracle.com/java/technologies/javase-downloads.html&gt;
## Java环境变量配置
### 在"系统变量"下进行如下配置：
1. 新建->变量名：JAVA_HOME变量值：D:\Java\jdk1.6.0_12(这只是我的JDK安装路径)
2. 编辑->变量名：Path在变量值的最前面加上：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
3. 新建->变量名：classpath变量值：.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar

##### 说明：安装jdk一般不需要设置环境变量classpath的值。如果计算机是首次安装jdk，之前也没设置过classpath,就不需要设置classpath了。但是，计算机之前安装过一些商业化的java开发产品或者带有java技术的一些产品，并且设置过classpath的值，那么运行java时,加载这些老产品所带的老版本的类库可能会导致要加载的类无法找到，使程序出现运行错误。


4. 编辑->变量名：JAVA_HOME,变量值：D:\Java\jdk1.6.0_10
##### 注意：当设置的变量在末尾时，不要加上“；”。要注意单词是否正确;win10环境变量每条都单独写,不用";"分隔.

### 使用 java, javac, java -version 查看是否配置正确;


# android
##### 下载地址:&lt;http://tools.android-studio.org/index.php/sdk/&gt;
## 环境变量配置
### 在"系统变量"下进行如下配置：
1. 新建->变量名：JAVA_HOME变量值：xx\xx\xx(这只是我的SDK安装路径)
2. 编辑->变量名：Path在变量值的最前面加上：%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools