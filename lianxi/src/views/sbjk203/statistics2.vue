<template>
  <div class="statistics">
    <div v-loading="loading" class="chart1"></div>
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
  created() {
    this.loading = true;
    this.inQuery();
  },
  mounted() {
    this.setEcharts(this.$el.querySelector(".chart1"));
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
      this.$ajax("/system/control/serverlog/6/getdiscloganalysis", data, "1")
        .then(res => {
          let xAxis = [],
            series = [],
            legend = [],
            is = true;
          res.result.forEach(ele => {
            legend.push(ele.discname);
            let objData = {
              name: ele.discname,
              type: "line",
              data: []
            };
            ele.disclogday.forEach(obj => {
              if (is) {
                xAxis.push(obj.disclogdate);
              }
              objData.data.push(obj.disclogcount.replace("G", ""));
            });
            series.push(objData);
            is = false;
          });
          if (this.myChart) {
            this.myChart.setOption(
              {
                title: {
                  text: "磁盘增长曲线图",
                  left: "center",
                  bottom: "0",
                  textStyle: {
                    color: "#ccc",
                    fontWeight: "normal"
                  }
                },
                color: [
                  "#8ec0fd",
                  "#000000",
                  "#90ed7d",
                  "#f7a35c",
                  "#8085e9",
                  "#f15c80"
                ],
                tooltip: {
                  trigger: "axis",
                  borderWidth: 1,
                  padding: [5, 10],
                  formatter: function(params) {
                    var result = params[0].axisValue + "<br/>";
                    params.forEach(function(item) {
                      result +=
                        item.marker +
                        " " +
                        item.seriesName +
                        " : " +
                        item.value +
                        "G" +
                        "</br>";
                    });
                    return result;
                  },
                  textStyle: {
                    ccolor: "#ffffff",
                    fontSize: "14"
                  }
                },
                xAxis: {
                  name: "日期",
                  nameTextStyle: {
                    fontSize: "16"
                  },
                  type: "category",
                  boundaryGap: false,
                  data: xAxis,
                  axisLabel: {
                    formatter: function(value, idx) {
                      return value.substr(5, 5);
                    }
                  }
                },
                yAxis: [
                  {
                    name: "磁盘容量(G)",
                    nameTextStyle: {
                      fontSize: "16"
                    },
                    type: "value"
                  }
                ],
                legend: {
                  data: legend
                },
                series: series
              },
              true
            );
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message({
            showClose: true,
            message: `[${err.resultCode}] `+err.resultMsg ,
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
          text: "磁盘增长曲线图",
          left: "center",
          bottom: "0",
          textStyle: {
            color: "#ccc",
            fontWeight: "normal"
          }
        },
        color: [
          "#8ec0fd",
          "#000000",
          "#90ed7d",
          "#f7a35c",
          "#8085e9",
          "#f15c80"
        ],
        tooltip: {
          trigger: "axis",
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
            ccolor: "#ffffff",
            fontSize: "14"
          }
        },
        xAxis: {
          name: "日期",
          nameTextStyle: {
            fontSize: "16"
          },
          type: "category",
          boundaryGap: false,
          axisLabel: {
            formatter: function(value, idx) {
              return value.substr(5, 5);
            }
          }
        },
        yAxis: [
          {
            name: "磁盘容量(G)",
            nameTextStyle: {
              fontSize: "16"
            },
            type: "value"
          }
        ],
        series: []
      });
    }
  }
};
</script>