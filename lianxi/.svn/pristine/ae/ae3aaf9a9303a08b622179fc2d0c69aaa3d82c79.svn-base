<template>
  <div class="statistics">
    <div v-loading="loading" class="chart"></div>
  </div>
</template>

<script>
import { format } from "@/utils/utils.js";
import echarts from "echarts";
export default {
  props: {
    param: Object,
    refresh: Number
  },
  data() {
    return {
      loading: false,
      myChart: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.setEcharts(this.$el.querySelector(".chart"));
      this.loading = true;
      this.inQuery();
    }, 200);
  },
  watch: {
    refresh() {
      this.onSearch();
    }
  },
  methods: {
    beforeClose() {
      this.$emit("beforeClose");
    },
    onSearch() {
      this.loading = true;
      this.inQuery();
    },
    inQuery() {
      let data = Object.assign({}, this.param);

      if (data.logtype == "全部事件") {
        data.logtype = "";
      }
      this.$ajax("/system/control/serverlog/3/getserverloganalysis", data, "1")
        .then(res => {
          let xAxis = [],
            series = [];
          res.result.forEach(obj => {
            xAxis.push(obj.serverlogdate);
            series.push(obj.serverlogcount);
          });
          if (this.myChart) {
            this.myChart.setOption({
              xAxis: {
                data: xAxis
              },
              series: [
                {
                  data: series
                }
              ]
            });
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] ` + err.resultMsg,
            type: "error"
          });
        });
    },
    setEcharts(dom) {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(dom);
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: "分析图标",
          top: 20,
          left: "center"
        },
        color: ["#8ec0fd"],
        tooltip: {
          trigger: "item",
          borderWidth: 1,
          padding: [5, 10],
          formatter: "日期：{b}<br />次数：{c}",
          position: function(point, params, dom, rect, size) {
            return [rect.x - 18, rect.y - 44];
          },
          textStyle: {
            ccolor: "#ffffff",
            fontSize: "14"
          }
        },
        grid: {
          top: "20%",
          left: "10%",
          height: "75%",
          width: "80%"
        },
        xAxis: {
          name: "日期",
          axisLine: { lineStyle: { color: "#979797", width: 2 } },
          // axisLabel: { color: "#333" },
          nameTextStyle: {
            fontSize: "16",
            color: "#333"
          },
          type: "category",
          boundaryGap: false,
          axisLabel: {
            formatter: function(value, idx) {
              return value.substr(5);
            },
            color: "#333"
          }
        },
        yAxis: [
          {
            name: "次数",
            axisLine: { lineStyle: { color: "#979797", width: 2 } },
            axisLabel: { color: "#333" },
            nameTextStyle: {
              fontSize: "16",
              color: "#333"
            },
            type: "value"
          }
        ],
        series: [
          {
            symbolSize: 10,
            symbol: "circle",
            type: "line",
            smooth: true,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,178,241, 0.3)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0,178,241, 0)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            }
          }
        ]
      });
    }
  }
};
</script>