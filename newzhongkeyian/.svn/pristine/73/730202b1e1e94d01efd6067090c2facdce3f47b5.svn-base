<!-- 楼栋住宿统计 -->
<template>
  <el-container>
    <el-header class="query_headbox">
      <retrieval class="query_head">
        <inpbox :inptext="'楼栋'">
          <queryPosition
            ref="queryPosition"
            class="con-popover qh_inp"
            @onChoice="onChoice"
            interface="/analysis/buildanalysis/1/getbuildtree"
          ></queryPosition>
        </inpbox>
        <inpbox>
          <fel-button class="qh_btn" type="primary" @click="search">查询</fel-button>
          <fel-button class="qh_btn" @click="onReset">重置</fel-button>
        </inpbox>
      </retrieval>
    </el-header>
    <el-main class="query_main">
      <el-container v-loading="loading" class="chart pad16-0"></el-container>
    </el-main>
  </el-container>
</template>

<script>
import queryPosition from "./queryPosition";
import echarts from 'echarts'
export default {
  name: "ldzstj163",
  components: {
    queryPosition
  },
  data() {
    return {
      param: [],
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
  },
  methods: {
    //重置事件
    onReset() {
      this.dates = [];
      Object.keys(this.param).forEach(key => {
        this.param[key] = "";
      });
      this.$refs.queryPosition.onClear();
      this.search();
    },
    onChoice(data) {
      this.param = data;
    },
    search() {
      this.loading = true;
      this.inQuery();
    },
    inQuery() {
      this.$ajax(
        "/analysis/buildanalysis/2/getbuildanalysis",
        {},
        "1",
        this.param
      )
        .then(res => {
          let yz = [],
            wz = [],
            xdata = [];
          res.result.forEach(obj => {
            let y = Number(obj.buildrzcount);
            let w = Number(obj.buildwzcount);
            let z = Math.round((y / (y + w)) * 100);
            yz.push({
              value: z,
              num: y
            });
            wz.push({
              value: 100 - z,
              num: w
            });
            xdata.push(obj.buildname);
          });
          if (this.myChart) {
            this.myChart.setOption({
              xAxis: [
                {
                  data: xdata
                }
              ],
              series: [
                {
                  name: "已住",
                  type: "bar",
                  stack: "数据",
                  data: yz
                },
                {
                  name: "未住",
                  stack: "数据",
                  type: "bar",
                  data: wz
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
          text: "楼栋住宿图",
          left: "center"
        },
        color: ["#434348", "#7cb5ec"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(data) {
            if (data) {
              if (data.length == 2) {
                let y = data[0];
                let w = data[1];
                let z = `${y.name}<br/>${y.seriesName}：${y.data.num}（${
                  y.data.value
                }%）<br/>${w.seriesName}：${w.data.num}（${w.data.value}%）`;
                if (isNaN(y.data.value)) {
                  z = `${y.name}<br/>${y.seriesName}：${y.data.num}<br/>${
                    w.seriesName
                  }：${w.data.num}`;
                }
                return z;
              } else if (data.length == 1) {
                let y = data[0];
                let z = `${y.name}<br/>${y.seriesName}：${y.data.num}（${
                  y.data.value
                }%`;
                if (isNaN(y.data.value)) {
                  z = `${y.name}<br/>${y.seriesName}：${y.data.num}`;
                }
                return z;
              }
            }
          }
        },
        legend: {
          bottom: 0,
          data: ["已住", "未住"]
        },
        grid: {
          top: 30,
          bottom: 100
        },
        xAxis: [
          {
            axisLabel: {
              fontSize: 10,
              interval: 0,
              rotate: 35
            },
            type: "category"
          }
        ],
        yAxis: [
          {
            name: "所占百分比（%）",
            nameLocation: "center",
            nameGap: 40,
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