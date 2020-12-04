# [canvas](https://www.runoob.com/w3cnote/html5-canvas-intro.html)

##### 这里只记录了一些基本操作,详细的需要点击标题跳转过去看

## 一个可以使用脚本(通常为 JavaScript) 在其中绘制图像的 HTML 元素。它可以用来制作照片集或者制作简单(也不是那么简单)的动画，甚至可以进行实时视频处理和渲染。

### 基本使用

```
    <canvas id="tutorial" width="300" height="300"></canvas>
```

- `<canvas>` 只有两个可选的属性 `width、heigth` 属性

  - 默认 width 为 300、height 为 150，单位都是 px。
  - 永远不要在 css 中设置这两个属性,会失真
  - 如果要动态设置值,那么要确定`canvas`已经赋值并完成渲染以后再开始绘制操作;

- 替换内容

  - 不支持 `<canvas>` 的浏览器会直接渲染替代内容
  - `canvas`标签必须合闭,不然后面的内容都会被当成替换内容不会显示;

  ```
      <canvas>
          你的浏览器不支持 canvas，请升级你的浏览器。
      </canvas>
      <canvas>
        <img src="./美女.jpg" alt="">
      </canvas>
  ```

- 渲染上下文
  - `<canvas>` 会创建一个固定大小的画布，会公开一个或多个渲染上下文(画笔)，使用渲染上下文来绘制和处理要展示的内容。

```
    var canvas = document.getElementById('tutorial');
    //获得 2d 上下文对象
    var ctx = canvas.getContext('2d');
```

- 检测支持性

  ```
      var canvas = document.getElementById('tutorial');
      if (canvas.getContext){
        var ctx = canvas.getContext('2d');
      }
  ```

- 绘制矩形

  - `​<canvas>` 只支持一种原生的图形绘制：矩形。所有其他图形都至少需要生成一种路径 (path)。
    - `fillRect(x, y, width, height)`：绘制一个填充的矩形。
    - `strokeRect(x, y, width, height)`：绘制一个矩形的边框。
    - `clearRect(x, y, widh, height)`：清除指定的矩形区域，然后这块区域会变的完全透明。(类似于橡皮擦,会将填充色在内的所有内容清除)

- 添加样式和颜色

  - `fillStyle = color` 设置图形的填充颜色

    ```
      this.canvas.fillStyle = "rgba(0,0,0,0.5)";
    ```

  - `strokeStyle = color` 设置图形轮廓的颜色
    - `color` 可以是表示 `css` 颜色值的字符串、渐变对象或者图案对象。
    - 默认情况下，线条和填充颜色都是黑色。
    - 一旦设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，需要重新设置

- Transparency(透明度)

  - `globalAlpha = transparencyValue` 这个属性影响到 `canvas` 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。
  - ​ `globalAlpha` 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过使用 rgba()设置透明度更加好一些。

- `line style`

  - 线宽。只能是正值。默认是 1.0。
  - 起始点和终点的连线为中心，上下各占线宽的一半

- 绘制文本
  - `fillText(text, x, y [, maxWidth])` 在指定的 (x,y) 位置填充指定的文本，绘制的最大宽度是可选的。
  - `strokeText(text, x, y [, maxWidth])` 在指定的 (x,y) 位置绘制文本边框，绘制的最大宽度是可选的。
    ```
        var ctx;
        function draw(){
            var canvas = document.getElementById('tutorial');
            if (!canvas.getContext) return;
            ctx = canvas.getContext("2d");
            ctx.font = "100px sans-serif"
            ctx.fillText("天若有情", 10, 100);
            ctx.strokeText("天若有情", 10, 200)
        }
        draw();
    ```
  - 文本样式
    - font = value 当前我们用来绘制文本的样式。这个字符串使用和 CSS font 属性相同的语法。 默认的字体是 10px sans-serif。
    - textAlign = value 文本对齐选项。 可选的值包括：start, end, left, right or center。 默认值是 start。
    - textBaseline = value 基线对齐选项，可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。。
    - direction = value 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
