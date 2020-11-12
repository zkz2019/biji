<!-- 刷卡开门统计 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <retrieval class="query_head">
        <inpbox :inpb="true">
          <el-date-picker
            v-model="param.date"
            popper-class="dateQueryList"
            class="qh_date_p"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            :picker-options="{disabledDate(time) {return time.getTime() > Date.now();}}"
            placeholder="选择日期"
          ></el-date-picker>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="search">查询</fel-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="padt0 query_main">
      <el-container v-loading="loading" class="chart pad16-0"></el-container>
    </el-main>
  </el-container>
</template>

<script>
import echarts from "echarts";
export default {
  name: "skkmtj100",
  data() {
    return {
      param: { date: "" },
      loading: false,
      myChart: null
    };
  },
  created() {
    this.loading = true;
    this.inQuery();
  },
  mounted() {
    this.setEcharts(this.$el.querySelector(".chart"));
    window.addEventListener("resize", this.listener);
  },
  destroyed() {
    window.removeEventListener("resize", this.listener);
  },
  activated() {
    window.addEventListener("resize", this.listener);
  },
  deactivated() {
    window.removeEventListener("resize", this.listener);
  },
  methods: {
    //重置事件
    listener() {
      this.myChart.resize();
    },
    onReset() {
      this.dates = [];
      Object.keys(this.param).forEach(key => {
        this.param[key] = "";
      });
      this.search();
    },
    search() {
      this.loading = true;
      this.inQuery();
    },
    inQuery() {
      this.$ajax("/analysis/lockanalysis/1/getlockanalysis", this.param, "1")
        .then(res => {
          let series = [],
            legend = [];
          res.result.forEach(obj => {
            series.push({
              name: obj.cardtype,
              type: "line",
              data: obj.lockdata,
              smooth: true,
              symbol: "circle",
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
            });
            legend.push(obj.cardtype);
          });
          if (this.myChart) {
            this.myChart.setOption({
              legend: {
                data: legend
              },
              series: series
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
      let xdata = [];
      for (let i = 0; i < 24; i++) {
        let s = i + "时";
        s = s.padStart(3, "0");
        xdata.push(s);
      }
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(dom);
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: "刷卡开门统计",
          left: "center"
        },
        color: [
          "#24A6F9",
          "#52C896",
          "#FFE71D",
          "#B4975D",
          "#EC6C6C",
          "#616E77",
          "#9068F7",
          "#A8D180"
        ],
        tooltip: {
          trigger: "axis"
        },
        grid: {
          top: "15%",
          left: "8%",
          bottom: "10%",
          height: "75%",
          width: "80%"
        },
        legend: {
          right: 50,
          icon: "rect",
          itemWidth: 12,
          itemHeight: 12,
          top: "center",
          orient: "vertical"
        },
        xAxis: {
          name: "时间",
          nameTextStyle: {
            fontSize: "16"
          },
          data: xdata,
          axisLine: { lineStyle: { color: "#979797", width: 2 } },
          axisLabel: { color: "#333" },
          nameTextStyle: {
            color: "#333"
          },
          type: "category",
          boundaryGap: false
        },
        yAxis: [
          {
            name: "开关门次数（次）",
            nameLocation: "center",
            nameGap: 40,
            nameTextStyle: {
              fontSize: "16"
            },
            nameTextStyle: {
              color: "#333"
            },
            axisLine: { lineStyle: { color: "#979797", width: 2 } },
            axisLabel: { color: "#333" },
            type: "value"
          }
        ],
        series: []
      });
    }
  }
};
</script>