<!-- 添加卡片 修改卡片 -->
<template>
  <el-dialog
    title="入住统计"
    width="50%"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    :visible.sync="dialogVisible"
  >
    <div v-loading="loading" id="rztjchart"></div>
  </el-dialog>
</template>

<script>
import echarts from "echarts";
export default {
  components: {},
  props: {
    data: Object,
    dialogVisible: Boolean
  },
  data() {
    return {
      number: {},
      loading:true,
    };
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        // this.onRefresh();
        let num = this.data.rz;
        let ss = num.split("/");
        this.number.yrz = ss[0] * 1;
        this.number.wrz = ss[1] * 1;
        this.initchart();
      }
    }
  },
  created() {},
  methods: {
    initchart() {
      if (document.getElementById("rztjchart")) {
        let dom = document.getElementById("rztjchart");
        this.setrztj(dom);
      } else {
        setTimeout(() => {
          this.initchart();
        }, 1000);
      }
    },
    setrztj(dom, wid) {
      this.loading=false;
      // 基于准备好的dom，初始化echarts实例
      this.myRztj = echarts.init(dom, "light");
      // 绘制图表
      var colorList = [
        // "#ff2600",  //红
        "#ffc000",   //黄
        // "#00ad4e",   //绿
        // "#0073c2",      //深蓝
        // "#165868",    //应该是紫色
        // "#e76f00",      //橙
        // "#316194",      //特别深的蓝
        // "#723761",          //特别紫
        "#00b2f1",      //蓝
        // "#4d6022",          //老绿色
        // "#4b83bf",          //不好看的蓝色
        // "#f9c813",          //淡淡的黄
        // "#0176c0"           //也是蓝色
      ];

      this.myRztj.setOption({
        color: colorList,
        title: {
          text: this.data.agname,
          //   subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["已入住", "未入住"]
        },
        series: [
          {
            name: "入住统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.number.yrz, name: "已入住" },
              { value: this.number.wrz, name: "未入住" }
            ]
            // itemStyle: {
            //   emphasis: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: "rgba(0, 0, 0, 0.5)"
            //   }
            // }
          }
        ]
      });
    },

    beforeClose() {
      this.$emit("beforeClose");
    }
  }
};
</script>

<style lang="scss">
#rztjchart {
  height: 350px;
}
</style>

