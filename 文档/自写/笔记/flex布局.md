# flex 布局

## flex 布局即为弹性布局;设为 flex 布局后 float,clear,vertical-align 将失效;

## inline-flex 将对象作为内联块级弹性伸缩盒显示

### 概念

- 采用 flex 布局的元素称为 flex 容器或容器;他的所有子元素自动成为容器成员,称为 flex 项目或项目;
- 容器默认存在两根轴,水平的主轴(main axis)和垂直的交叉轴(cross axis);主轴的开始位置叫做`main start`,结束位置叫做`main end`;交叉轴的开始位置叫做`cross start`,结束位置叫做`cross end`;项目默认沿主轴排列,单个项目占据的主轴空间叫做`main size`,占据的交叉轴空间叫做`cross size`;

### 容器的属性

- flex-derection 决定主轴的方向(项目的排列方向)
  - row :(默认值) 主轴为水平方向,左端为起点
  - row-reverse: 主轴为水平方向,右端为起点
  - column:主轴为垂直方向,上端为起点
  - column-reverse:主轴为垂直方向,下端为起点
- flex-wrap 定义项目在一条轴线上放不下是的换行方法;
  - nowrap : (默认值),不换行
  - wrap:换行,第一行在上方
  - wrap-reverse:换行,第一行在下方
- flex-flow 是`flex-direction`和`flex-wrap`属性的简写形势,默认为`row nowrap`
- justify-content 定义了项目在主轴上的对齐方式
  - flex-start: 左对齐
  - flex-end: 右对齐
  - center: 居中
  - space-between: 两端对齐,项目之间间隔相等
  - space-around: 每个项目两侧的间隔相等
- align-items 定义项目如何在交叉轴上对齐
  - stretch:(默认值) 如果项目未设置高度或者设为 auto,将占满整个容器
  - flex-start:交叉轴起点对齐
  - flex-end:交叉轴终点对齐
  - center:交叉轴中点对齐
  - baseline: 项目的第一行文字的基线对齐
- align-content 定义多根轴线的对齐方式,如果项目只有一根轴线则不起作用
  - flex-start: 与交叉轴的起点对齐
  - flex-end: 与交叉轴的终点对齐
  - center: 与交叉轴的中点对齐
  - space-between: 与交叉轴的两端对齐,轴线直接地间隔平分
  - space-around: 每根轴线两侧的间隔相等
  - stretch: 轴线占满整个交叉轴

### 项目的属性

- order 定义项目的排列顺序,数值越小越靠前
- flex-grow 定义项目的放大比例;默认为 0,即如果存在剩余空间,也不放大
  - 当所有项目的属性都为 1,则他们将等分剩余空间(如果有的话);如果一个项目的`flex-grow`属性为 2,其他项目都为 1,则前者占据的剩余空间将比其他项多一倍
- flex-shrirk 定义了项目的缩小比例,默认为 1,即如果空间不足,该项目将缩小
  - 当所有项目的属性都为 1,则空间不足时都将等比例缩小,如果一个项目`flex-shrirk`属性为 0,其他项目都为 1,则空间不足时,前者不缩小;该属性负值无效
- flex-basis 定义了在分配多余空间之前,项目占据的主轴空间,浏览器根据这个属性,计算主轴是否有多余空间,默认值为 auto,即项目本来大小
  - 它可以设为如`350px`这样的值,则项目占据固定空间
- flex 是`flex-grow` `flex-shrink` `flex-basis`的简写,默认值为`0 1 auto`;后两个属性可选
  - 改属性有两个快捷值:`auto (1 1 auto)` 和 `none (0 0 auto)`
  - 建议优先使用这个属性,而不是单独写三个分离的属性,应为浏览器会推算相关值
- align-self 允许单个项目有与其他项目不一样的对齐方式,可覆盖`align-items`,默认为`auto`,表示继承父元素的`align-items`,如果没有父元素则等同于`stretch`
  - 该属性可能取 6 个值,除了`auto`,其他都与`algin-items`属性完全一致
