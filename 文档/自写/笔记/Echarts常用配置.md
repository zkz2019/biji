## Echarts 常用配置整理

- [yAxis](https://www.echartsjs.com/zh/option.html#yAxis)

  - 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠
  - 可以设置 y 轴颜色,偏移等

- [xAxis](https://www.echartsjs.com/zh/option.html#xAxis)

  - 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠
  - 可以设置 x 轴颜色,偏移等

- [color](https://www.echartsjs.com/zh/option.html#color)

  - 调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色

- [tooltip](https://www.echartsjs.com/zh/option.html#%2Fsearch%2Ftooltip)

  - 提示框组件
  - 提示框组件可以设置在多种地方：

    - 可以设置在全局，即 tooltip
    - 可以设置在坐标系中，即 grid.tooltip、polar.tooltip、single.tooltip
    - 可以设置在系列中，即 series.tooltip
    - 可以设置在系列的每个数据项中，即 series.data.tooltip

  - 配置项:
    1. tooltip.confine: 将 tooltip 限制在图表的区域内,当图表外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用;

- [legend](https://www.echartsjs.com/zh/option.html#legend)

  - 图例组件(对应图表数据的颜色与名称的小图)
  - 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
    ECharts 3 中单个 echarts 实例中可以存在多个图例组件，会方便多个图例的布局
  - 可以设置图例尺寸,位置,边距等

- [grid](https://www.echartsjs.com/zh/option.html#grid)

  - 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。可以在网格上绘制折线图，柱状图，散点图（气泡图）
  - 在 ECharts 2.x 里单个 echarts 实例中最多只能存在一个 grid 组件，在 ECharts 3 中可以存在任意个 grid 组件
  - 可以设置绘图网格的宽高,与容器上下左右的距离,背景色,边框等

- [series](https://www.echartsjs.com/zh/option.html#%2Fsearch%2Fseries)

  - 系列列表。每个系列通过 type 决定自己的图表类型
  - 可以设置图表类型(线形图,柱状图...)
  - 可以设置图表每项数据的参数(name,data,itemStyle...)
  - 数据展示的参数一般都在这里面

- [title](https://www.echartsjs.com/zh/option.html#title)

  - 标题组件，包含主标题和副标题
  - 在 ECharts 2.x 中单个 ECharts 实例最多只能拥有一个标题组件。但是在 ECharts 3 中可以存在任意多个标题组件，这在需要标题进行排版，或者单个实例中的多个图表都需要标题时会比较有用
  - 设置标题文本,超链接,样式等
