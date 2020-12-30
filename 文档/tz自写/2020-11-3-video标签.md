---
layout: post
title: Video标签注意事项
---

`
在最近的一次落地页需求开发中，需要实现表单覆盖视频，视频自动播放等。其中遇到了一些奇怪的问题，特在此记录。
`

<h4>视频自动播放</h4>
`
自从媒体标签需要用户手动触发后，被视频广告吓到的日子已经不复存在了。虽然视频不能自动有声播放，但是静音还是可以播放的。
`

理论上video标签实现自动播放，只需要加上静音属性，muted 和 autoplay。
实际上在某些渠道是无法播放的，如，iOS的UC浏览器，抖音和微博；Android 的微信。

iOS 系统的微信自动播放需要监听文档的 WeixinJSBridgeReady 事件，执行 video 的 play 方法。
```js
const videoElement = document.createElement('video');
videoElement.volume = 0; // 安卓设备必须 muted 的同时，设置音量为 0 才可以自动播放
videoElement.controls = false; // 不显示视频控制条
videoElement.setAttribute('playsinline', ''); // 内联显示（非全屏显示）
videoElement.setAttribute('mtt-playsinline', ''); // ？？兼容语法
videoElement.setAttribute('webkit-playsinline', ''); // webkit 兼容语法
videoElement.setAttribute('x5-video-player-type', isQQBrowser ? 'h5-page' : 'h5'); // 腾讯系X5内核：设置为普通的 H5 video 标签，不设置则为原生视频播放器，永远在webview最上方，不会被其他dom元素遮挡。
videoElement.setAttribute('muted', 'muted'); // 静音

if (IS_iOS && IS_IN_WECHAT) {
  /**
   * iOS 的微信自动播放需要 WeixinJSBridgeReady 触发
   */
  document.addEventListener('WeixinJSBridgeReady', () => {
    videoElement.play(); // 触发后，就可以使用 js 控制播放暂停了
    videoElement.pause(); // 先暂停，有需要或者加载 src 后再播放。
  });
}
```
由于在公司项目中iOS微信的WeixinJSBridgeReady事件总是在vue的mounted之前触发，所以只能先创建个video标签，然后等mounted后再放置在dom节点上并加载src资源。

`
以上就是自动播放的内容，项目除了视频播放外，还做了一点视频播放的统计，其中还发现了video事件在微信中的奇特现象。
`

```js
// play 视频开始播放
videoElement.addEventListener('play', () => {
  //  Android 微信虽然不能自动播放，但是会触发该事件，此时获取 videoElement 的当前时间为0.001秒
});

// playing 在媒体开始播放时触发（不论是初次播放、在暂停后恢复、或是在结束后重新开始
videoElement.addEventListener('playing', () => {
  // Android 微信虽然不能自动播放，但是会触发该事件，此时获取 videoElement 的当前时间为0.001秒
});

// loadedmetadata 视频的元数据信息加载完成时
videoElement.addEventListener('loadedmetadata', () => {
  // 在不允许自动播放的 Android 微信里获取不到该事件的元数据，只有视频真正播放时才可以。
  // 猜想可能 Android 微信在极短的时间内截胡了正在播放的视频，所以表现为不能自动播放。
})

// waiting 等待数据
videoElement.addEventListener('waiting', () => {
  // iOS会在循环结束后，触发该事件， Android 不会。
  // 所以在视频循环时，该事件是否会触发还要看相应的宿主环境。
});

// ended 事件
videoElement.addEventListener('ended', () => {
  // 该事件不会在loop（视频循环）时触发
});
```