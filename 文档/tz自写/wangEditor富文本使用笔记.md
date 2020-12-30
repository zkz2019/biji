# [wangEditor 使用笔记](http://www.wangeditor.com/doc/pages/01-开始使用/01-基本使用.html)

### wangEditor 之前初学前端时有接触过,不过后来由于未碰到应用场景,所以一直没使用过,这次做审核意见由于需要同时传入图片和文字意见文本框内的字体需要改变颜色,所以选择了它

- 安装

  ```
      npm i wangeditor --save
  ```

- 引入

  ```
  import E from "wangeditor";
  ```

- 调用

  - 创建编辑器

    ```
    const editor = new E(El);
    ...
    // 配置属性,配置回调
    // 配置属性和回调需要在create前
    editor.config.xxx = xxx;
    ...
    this.editor = editor.create();
    ...
    操作编辑器
    this.editor.txt.html(content);
    ...
    ```

- 踩坑

  - 没找到切换全屏的回调,无法判断当前是否全屏
    - 解决方法
      - 监听全屏按钮的点击,然后用 vuex 储存当前是否全屏状态
  - 全屏时编辑界面高度是 100%,但是因为有个操作栏,所以编辑界面会超出窗口,导致最底下的内容无法显示
    - 解决方法
      - 判断当前是否全屏,如果是就设置编辑区高度为 100%-40px(操作栏高度);

- 使用总结
  - 这个编辑器整体使用简单方便,文档也很详细
  - 它的禁用状态是在操作界面上加一个遮罩
  - 全屏状态下和非全屏状态下有些元素看似是同一个其实并不是,所以修改样式或者操作 dom 的时候要注意
  - 上传图片
    - 可以在 customUploadImg 回调中
    ```
    editor.config.customUploadImg =(files,insert)=>{
        上传操作
        files.forEach(async file => {
          const imgUrl = await uploader(file);
          await insert(imgUrl);
        });
    }
    ```
    - 也可以不配置直接在编辑区粘贴或点击操作栏的图片上传按钮
      - 这样将图片转换成 base64 的 img 标签
    - 其他方法可以在官方文档查看
