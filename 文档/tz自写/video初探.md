## [video 初探](https://docs.videojs.com/)

#### Video.js 是一个通用的在网页上嵌入视频播放器的 JS 库，Video.js 自动检测浏览器对 HTML5 的支持情况，如果不支持 HTML5 则自动使用 Flash 播放器。

- 安装

  ```
  npm install video.js
  ```

- 引入
  ```
  import videojs from 'video.js'
  import 'video.js/dist/video-js.css'
  ```
  - 可以直接在页面内引入
  - vue 中可以在 main.js 中引入
  - nuxt 中也可在 plugins 进行全局引入
  - 同时需要引入 css 文件
- 使用

  - 创建 video 标签
    - 将 video.js 的类加到标签上
      ```
      <video
        ref="videoPlayer"
        class="videoPlayer video-js vjs-default-skin vjs-big-play-centered"
        @error="handleVideoError"
       />
      ```
  - 调用 videojs 方法
    ```
        videojs(El,options)
    ```
    - El:传入原生 video 元素
    - options: 配置项
      - playbackRates:可调倍速
      - sources:
        ```
        [
          {
            src: url,
            type: 'video/mp4',
          },
        ]
        ```
      - 原生有的参数基本都有

- 踩坑
  - 插件会在 video 标签的上一层盒子加类名,会导致样式混乱
    - 解决方案
      - 在 video 标签上层加一个空 div
  - 标签尺寸如果与视频尺寸不同时会出现操作栏超出视频的情况
    - 解决方案
      - 从后端拿到视频尺寸,再按比例缩小或放大到适合尺寸并写入 style
